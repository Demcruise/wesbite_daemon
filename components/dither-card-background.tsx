"use client";

import { type DitherTone, type DitherVariant } from "@/components/dither-shader";
import { ViewportDitherShader } from "@/components/viewport-dither-shader";
import { useReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import type { ReactNode } from "react";

const DARK_TONE: DitherTone = { r: 0, g: 0.678, b: 0.71 };
const LIGHT_TONE: DitherTone = { r: 0.83, g: 0.83, b: 0.83 };

type DitherCardBackgroundProps = {
  index?: number;
  className?: string;
  intensityOpacity?: number;
  tone?: DitherTone;
  variant?: DitherVariant;
};

export function DitherCardBackground({
  index = 0,
  className,
  intensityOpacity = 0.4,
  tone: toneOverride,
  variant = "cta",
}: DitherCardBackgroundProps): ReactNode {
  const reduceMotion = useReducedMotion();
  const { resolvedTheme } = useTheme();
  const defaultTone = resolvedTheme === "dark" ? DARK_TONE : LIGHT_TONE;
  const tone = toneOverride ?? defaultTone;

  if (reduceMotion) return null;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 z-0 overflow-hidden",
        className
      )}
      style={{ opacity: intensityOpacity }}
    >
      <ViewportDitherShader
        variant={variant}
        tone={tone}
        deferInit={index * 120}
        rootMargin="120px 0px"
      />
    </div>
  );
}
