"use client";

import { Mesh, Program, Renderer, Triangle } from "ogl";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { withWebGLSlot } from "@/lib/webgl-slot";

const vertexShader = /* glsl */ `#version 300 es
  in vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `#version 300 es
  precision highp float;

  uniform vec2  iResolution;
  uniform float iTime;
  uniform vec2  iMouse;
  uniform float iMouseActive;
  uniform float uTheme;
  uniform float uVariant;
  uniform float uTransparent;
  uniform vec3  uGlyphColor;

  out vec4 fragColor;

  const float kBayer[16] = float[16](
     0.0,  8.0,  2.0, 10.0,
    12.0,  4.0, 14.0,  6.0,
     3.0, 11.0,  1.0,  9.0,
    15.0,  7.0, 13.0,  5.0
  );

  float box(vec2 p, vec2 c, vec2 h) {
    vec2 q = abs(p - c) - h;
    return (1.0 - step(0.0, q.x)) * (1.0 - step(0.0, q.y));
  }

  float synthesizeCharacter(vec2 uv, float lum) {
    vec2 p = uv * 2.0 - 1.0;
    int tier = int(clamp(lum * 5.0, 0.0, 4.0));

    if (tier == 0) return 0.0;
    if (tier == 1) return 1.0 - step(0.2, length(p));
    if (tier == 2) return box(p, vec2(0.0), vec2(0.6, 0.2));
    if (tier == 3) {
      return max(box(p, vec2(0.0), vec2(0.6, 0.2)),
                 box(p, vec2(0.0), vec2(0.2, 0.6)));
    }
    float bounds = box(p, vec2(0.0), vec2(0.8));
    float bars = max(
      max(box(p, vec2(0.0,  0.3), vec2(1.0, 0.15)),
          box(p, vec2(0.0, -0.3), vec2(1.0, 0.15))),
      max(box(p, vec2( 0.3, 0.0), vec2(0.15, 1.0)),
          box(p, vec2(-0.3, 0.0), vec2(0.15, 1.0)))
    );
    return bars * bounds;
  }

  float computeBayer(vec2 cell) {
    ivec2 q = ivec2(mod(cell, 4.0));
    return kBayer[q.x + q.y * 4] / 16.0;
  }

  void main() {
    vec2 fragCoord = gl_FragCoord.xy;

    float gridResolution = mix(10.0, 14.0, uVariant);
    vec2 cellIndex = floor(fragCoord / gridResolution);
    vec2 localUV   = fract(fragCoord / gridResolution);

    float aspect = iResolution.x / iResolution.y;
    vec2 uv = (cellIndex * gridResolution) / iResolution.xy * 2.0 - 1.0;
    uv.x *= aspect;

    vec2 m = iMouse / iResolution.xy * 2.0 - 1.0;
    m.x *= aspect;

    vec2  d = uv - m;
    float r = length(d);
    vec2  perp = vec2(-d.y, d.x);
    float shear = exp(-r * 2.2) * (1.0 - exp(-r * 6.0)) * iMouseActive;
    vec2  warped = uv + normalize(perp + 1e-5) * shear * 0.35;

    float timeScale  = mix(0.5, 0.22, uVariant);
    float waveFreq   = mix(5.0, 3.4,  uVariant);
    float radialFreq = mix(10.0, 6.0, uVariant);
    float time = iTime * timeScale;
    float baseLuminance = (
      sin(warped.x * waveFreq + time) +
      sin(warped.y * waveFreq + time) +
      sin(warped.x * warped.y * radialFreq - time) +
      sin(length(warped) * radialFreq - time * 2.0)
    ) * 0.25 + 0.5;

    baseLuminance = pow(smoothstep(0.15, 0.95, baseLuminance), 0.75);
    baseLuminance *= 1.0 - smoothstep(0.45, 0.0, r) * iMouseActive * 0.85;

    float adjustedLuminance = clamp(
      baseLuminance + (computeBayer(cellIndex) - 0.5) * 0.5,
      0.0, 1.0
    );

    float mask = synthesizeCharacter(localUV, adjustedLuminance);

    vec3 bg = mix(vec3(1.0), vec3(0.039), uTheme);
    vec3 fg = mix(vec3(0.0), vec3(0.98),  uTheme);
    vec3 themedColor = mix(bg, fg, mask);

    fragColor = vec4(
      mix(themedColor, uGlyphColor, uTransparent),
      mix(1.0, mask, uTransparent)
    );
  }
`;

export type DitherVariant = "hero" | "cta";
export type DitherTone = { r: number; g: number; b: number };

function isWebGL2Supported(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!canvas.getContext("webgl2");
  } catch {
    return false;
  }
}

function readIsDark(resolvedTheme: string | undefined): boolean {
  if (resolvedTheme === "dark") return true;
  if (resolvedTheme === "light") return false;
  if (typeof document === "undefined") return true;
  return document.documentElement.classList.contains("dark");
}

function scheduleStatus(
  setStatus: (next: { active: boolean; failed: boolean }) => void,
  next: { active: boolean; failed: boolean }
): void {
  queueMicrotask(() => {
    setStatus(next);
  });
}

export function DitherShader({
  variant = "hero",
  tone,
  className,
  deferInit = 0,
}: {
  variant?: DitherVariant;
  tone?: DitherTone;
  className?: string;
  deferInit?: number;
} = {}): ReactNode {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { resolvedTheme } = useTheme();
  const [status, setStatus] = useState({ active: false, failed: false });

  const themeTargetRef = useRef(1);
  const variantRef = useRef(variant === "cta" ? 1 : 0);
  const transparentRef = useRef(tone ? 1 : 0);
  const glyphColorRef = useRef<[number, number, number]>(
    tone ? [tone.r, tone.g, tone.b] : [0.85, 0.85, 0.85]
  );

  useEffect(() => {
    variantRef.current = variant === "cta" ? 1 : 0;
  }, [variant]);

  useEffect(() => {
    transparentRef.current = tone ? 1 : 0;
    if (tone) {
      glyphColorRef.current = [tone.r, tone.g, tone.b];
    }
  }, [tone]);

  useEffect(() => {
    themeTargetRef.current = readIsDark(resolvedTheme) ? 1 : 0;
  }, [resolvedTheme]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let releaseSlot: (() => void) | undefined;
    let cancelled = false;

    const deferTimer = window.setTimeout(() => {
      if (cancelled) return;

      releaseSlot = withWebGLSlot(() => {
        const fail = (): void => {
          scheduleStatus(setStatus, { active: false, failed: true });
        };

        if (!isWebGL2Supported()) {
          fail();
          return () => {};
        }

        const transparent = transparentRef.current === 1;
        let renderer: Renderer;
        try {
          renderer = new Renderer({
            webgl: 2,
            alpha: transparent,
            dpr: Math.min(window.devicePixelRatio, 2),
          });
        } catch {
          fail();
          return () => {};
        }

        const gl = renderer.gl;
        const canvas = gl.canvas as HTMLCanvasElement;
        canvas.style.cssText =
          "position:absolute;inset:0;width:100%;height:100%;display:block;z-index:1;pointer-events:auto;";

        const applyClearColor = (): void => {
          if (transparent) {
            gl.clearColor(0, 0, 0, 0);
            return;
          }
          if (themeTargetRef.current === 1) {
            gl.clearColor(0.024, 0.024, 0.024, 1);
          } else {
            gl.clearColor(1, 1, 1, 1);
          }
        };

        applyClearColor();
        container.appendChild(canvas);

        const program = new Program(gl, {
          vertex: vertexShader,
          fragment: fragmentShader,
          uniforms: {
            iResolution: { value: [1, 1] },
            iTime: { value: 0 },
            iMouse: { value: [0, 0] },
            iMouseActive: { value: 0 },
            uTheme: { value: themeTargetRef.current },
            uVariant: { value: variantRef.current },
            uTransparent: { value: transparentRef.current },
            uGlyphColor: { value: glyphColorRef.current.slice() },
          },
        });

        const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

        const target = { x: 0, y: 0, active: 0 };
        const current = { x: 0, y: 0, active: 0 };
        let mouseInitialized = false;

        const resize = (): boolean => {
          const { clientWidth, clientHeight } = container;
          if (clientWidth < 2 || clientHeight < 2) return false;
          renderer.setSize(clientWidth, clientHeight);
          program.uniforms.iResolution.value = [
            gl.drawingBufferWidth,
            gl.drawingBufferHeight,
          ];
          if (!mouseInitialized) {
            current.x = gl.drawingBufferWidth / 2;
            current.y = gl.drawingBufferHeight / 2;
            target.x = current.x;
            target.y = current.y;
            mouseInitialized = true;
          }
          return true;
        };

        const handlePointerMove = (event: PointerEvent): void => {
          const rect = container.getBoundingClientRect();
          if (rect.width < 1 || rect.height < 1) return;
          const dpr = gl.drawingBufferWidth / rect.width;
          target.x = (event.clientX - rect.left) * dpr;
          target.y = (rect.height - (event.clientY - rect.top)) * dpr;
          target.active = 1;
        };

        const handlePointerLeave = (): void => {
          target.active = 0;
        };

        const handleContextLost = (event: Event): void => {
          event.preventDefault();
          scheduleStatus(setStatus, { active: false, failed: false });
        };

        const handleContextRestored = (): void => {
          resize();
          scheduleStatus(setStatus, { active: true, failed: false });
        };

        const handleVisibility = (): void => {
          if (document.visibilityState === "visible") {
            resize();
          }
        };

        canvas.addEventListener("webglcontextlost", handleContextLost);
        canvas.addEventListener("webglcontextrestored", handleContextRestored);
        document.addEventListener("visibilitychange", handleVisibility);

        const ro = new ResizeObserver(() => {
          resize();
        });
        ro.observe(container);

        let frameId = 0;
        let retryId = 0;
        let retryCount = 0;
        const start = performance.now();
        let hasError = false;
        let reportedActive = false;

        const retryUntilSized = (): void => {
          if (resize()) {
            retryCount = 0;
            return;
          }
          retryCount += 1;
          if (retryCount < 120) {
            retryId = requestAnimationFrame(retryUntilSized);
          }
        };
        retryUntilSized();

        container.addEventListener("pointermove", handlePointerMove, {
          passive: true,
        });
        container.addEventListener("pointerleave", handlePointerLeave);

        const render = (): void => {
          if (hasError) return;
          try {
            if (gl.drawingBufferWidth < 2) {
              frameId = requestAnimationFrame(render);
              return;
            }

            applyClearColor();

            current.x += (target.x - current.x) * 0.12;
            current.y += (target.y - current.y) * 0.12;
            current.active += (target.active - current.active) * 0.06;

            const themeNow = program.uniforms.uTheme.value as number;
            program.uniforms.uTheme.value =
              themeNow + (themeTargetRef.current - themeNow) * 0.12;

            program.uniforms.uVariant.value = variantRef.current;
            program.uniforms.uTransparent.value = transparentRef.current;
            const gc = program.uniforms.uGlyphColor.value as number[];
            gc[0] = glyphColorRef.current[0];
            gc[1] = glyphColorRef.current[1];
            gc[2] = glyphColorRef.current[2];

            program.uniforms.iTime.value = (performance.now() - start) / 1000;
            program.uniforms.iMouse.value = [current.x, current.y];
            program.uniforms.iMouseActive.value = current.active;

            gl.clear(gl.COLOR_BUFFER_BIT);
            renderer.render({ scene: mesh });
            if (!reportedActive) {
              reportedActive = true;
              scheduleStatus(setStatus, { active: true, failed: false });
            }
            frameId = requestAnimationFrame(render);
          } catch {
            hasError = true;
            scheduleStatus(setStatus, { active: false, failed: true });
          }
        };
        render();

        return () => {
          cancelAnimationFrame(retryId);
          cancelAnimationFrame(frameId);
          ro.disconnect();
          document.removeEventListener("visibilitychange", handleVisibility);
          canvas.removeEventListener("webglcontextlost", handleContextLost);
          canvas.removeEventListener(
            "webglcontextrestored",
            handleContextRestored
          );
          container.removeEventListener("pointermove", handlePointerMove);
          container.removeEventListener("pointerleave", handlePointerLeave);
          if (canvas.parentElement === container) {
            container.removeChild(canvas);
          }
          gl.getExtension("WEBGL_lose_context")?.loseContext();
        };
      });
    }, deferInit);

    return () => {
      cancelled = true;
      window.clearTimeout(deferTimer);
      releaseSlot?.();
    };
  }, [deferInit]);

  const { active: webglActive, failed: webglFailed } = status;

  return (
    <div
      ref={containerRef}
      data-webgl-active={webglActive ? "true" : "false"}
      className={cn(
        "absolute inset-0 h-full w-full min-h-[inherit]",
        "bg-background",
        webglFailed &&
          !webglActive &&
          "bg-[radial-gradient(circle_at_50%_50%,var(--muted)_0%,var(--background)_70%)]",
        className
      )}
      aria-hidden="true"
    />
  );
}
