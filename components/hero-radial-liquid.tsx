"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const RadialLiquid = dynamic(() => import("@/components/radial-liquid"), {
  ssr: false,
});

export function HeroRadialLiquid(): ReactNode {
  const reduceMotion = useReducedMotion();

  return (
    <div className="size-full">
      <RadialLiquid
        className="size-full"
        width="100%"
        height="100%"
        backgroundColor="#060606"
        color1="#00adb5"
        color2="#008a91"
        color3="#222831"
        position="center"
        scale={1.4}
        waveSize={5}
        edgeSoftness={0.18}
        speed={reduceMotion ? 0 : 0.7}
        iterations={5}
        distortionType="plasma"
        enableCursorInteraction={!reduceMotion}
        quality="high"
      />
    </div>
  );
}
