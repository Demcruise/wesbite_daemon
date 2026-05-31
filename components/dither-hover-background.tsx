"use client";

import {
  DitherShader,
  type DitherTone,
  type DitherVariant,
} from "@/components/dither-shader";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import type { ReactNode } from "react";

const LIGHT_TONE: DitherTone = { r: 0.83, g: 0.83, b: 0.83 };
const DARK_TONE: DitherTone = { r: 0, g: 0.678, b: 0.71 };

type DitherHoverBackgroundProps = {
  active: boolean;
  className?: string;
  intensityOpacity?: number;
  variant?: DitherVariant;
};

export function DitherHoverBackground({
  active,
  className,
  intensityOpacity = 0.45,
  variant = "hero",
}: DitherHoverBackgroundProps): ReactNode {
  const { resolvedTheme } = useTheme();
  const tone = resolvedTheme === "dark" ? DARK_TONE : LIGHT_TONE;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 ease-out",
        className,
      )}
      style={{ opacity: active ? intensityOpacity : 0 }}
    >
      {active ? (
        <DitherShader variant={variant} tone={tone} deferInit={0} />
      ) : null}
    </div>
  );
}
