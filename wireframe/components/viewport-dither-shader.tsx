"use client";

import { DitherShader } from "@/components/dither-shader";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState, type ReactNode } from "react";

type ViewportDitherShaderProps = {
  variant?: "hero" | "cta";
  tone?: { r: number; g: number; b: number };
  deferInit?: number;
  className?: string;
  rootMargin?: string;
};

export function ViewportDitherShader({
  className,
  rootMargin = "200px 0px",
  ...shaderProps
}: ViewportDitherShaderProps): ReactNode {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 h-full w-full min-h-[inherit]", className)}
      aria-hidden="true"
    >
      {visible ? <DitherShader {...shaderProps} /> : null}
    </div>
  );
}
