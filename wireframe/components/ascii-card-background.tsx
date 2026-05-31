"use client";

import { useReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import type { ReactNode } from "react";

const AsciiWavesLazy = dynamic(() => import("@/components/ascii-waves"), {
  ssr: false,
});

export const DAEMON_ASCII_CHARS = "+ . # = ~ * @ % - :";

type AsciiCardBackgroundProps = {
  active: boolean;
  seed: number;
  /** 0.07 default cards, 0.12 modal */
  intensityOpacity?: number;
  className?: string;
};

export function AsciiCardBackground({
  active,
  seed,
  intensityOpacity = 0.07,
  className,
}: AsciiCardBackgroundProps): ReactNode {
  const reduceMotion = useReducedMotion();
  const { resolvedTheme } = useTheme();
  const color = resolvedTheme === "dark" ? "#fafafa" : "#0a0a0a";

  if (reduceMotion) return null;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden transition-opacity duration-[400ms] ease-out",
        className
      )}
      style={{ opacity: active ? intensityOpacity : 0 }}
    >
      {active ? (
        <AsciiWavesLazy
          key={seed}
          characters={DAEMON_ASCII_CHARS}
          color={color}
          invert={false}
          noiseScale={1.6}
          elementSize={18}
          speed={0.35}
          hasCursorInteraction={false}
          intensity={0.28}
          interactionIntensity={0.2}
          waveTension={0.35}
          waveTwist={0.06}
          className="h-full w-full"
        />
      ) : null}
    </div>
  );
}
