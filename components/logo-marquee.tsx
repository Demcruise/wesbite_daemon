"use client";

import { ViewportDitherShader } from "@/components/viewport-dither-shader";
import { useReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import type { ReactNode } from "react";

type ChainLogo = {
  id: string;
  name: string;
  src: string;
};

const CHAIN_LOGOS: ReadonlyArray<ChainLogo> = [
  { id: "bitcoin", name: "Bitcoin", src: "/bitcoin logo.png" },
  { id: "solana", name: "Solana", src: "/Solana Logo.png" },
  { id: "arweave", name: "Arweave", src: "/Arweave Logo.png" },
];

/** Shared box inside the circle; per-logo scale fine-tunes visual weight. */
const LOGO_INNER_CLASS = "relative aspect-square size-[3.5rem] sm:size-[4.25rem]";

const LOGO_SCALE_CLASS: Record<string, string> = {
  solana: "scale-[1.06] sm:scale-[1.04]",
  tron: "scale-[0.9] sm:scale-[0.88]",
  ethereum: "scale-[0.84] sm:scale-[0.82]",
};

const DEFAULT_LOGO_SCALE = "scale-[1.14] sm:scale-[1.1]";

function LogoChip({ logo }: { logo: ChainLogo }): ReactNode {
  const scaleClass = LOGO_SCALE_CLASS[logo.id] ?? DEFAULT_LOGO_SCALE;

  return (
    <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-background shadow-sm sm:h-24 sm:w-24">
      {logo.id === "arweave" ? (
        <span
          className="font-mono text-sm font-semibold tracking-tight text-foreground sm:text-base"
          aria-label={logo.name}
        >
          AR
        </span>
      ) : (
        <div className={LOGO_INNER_CLASS}>
          <Image
            src={logo.src}
            alt={logo.name}
            fill
            className={cn("object-contain object-center", scaleClass)}
            sizes="(max-width: 768px) 56px, 68px"
          />
        </div>
      )}
    </div>
  );
}

function MarqueeColumn({
  direction,
  duration,
  paused,
  items,
}: {
  direction: "up" | "down";
  duration: string;
  paused: boolean;
  items: ReadonlyArray<ReactNode>;
}): ReactNode {
  const animation = direction === "up" ? "marquee-up" : "marquee-down";

  const renderCopy = (copyKey: string): ReactNode => (
    <div key={copyKey} className="flex shrink-0 flex-col items-center gap-4">
      {items.map((item, i) => (
        <div key={`${copyKey}-${i}`} className="flex shrink-0 flex-col items-center">
          {item}
        </div>
      ))}
    </div>
  );

  return (
    <div
      className={cn("marquee-column flex flex-col items-center gap-4")}
      style={{
        animation: paused ? undefined : `${animation} ${duration} linear infinite`,
      }}
    >
      {renderCopy("a")}
      {renderCopy("b")}
    </div>
  );
}

export function LogoMarquee(): ReactNode {
  const reduceMotion = useReducedMotion();

  const chainItems = CHAIN_LOGOS.map((logo) => (
    <LogoChip key={logo.id} logo={logo} />
  ));

  return (
    <div className="relative h-full min-h-[360px] w-full overflow-hidden rounded-2xl">
      <ViewportDitherShader variant="hero" className="z-0" deferInit={300} />

      <div
        className="relative z-10 h-full w-full"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)",
        }}
      >
        <div className="absolute inset-0 mx-auto flex w-full max-w-[200px] justify-center px-4 sm:max-w-[220px]">
          <MarqueeColumn
            direction="up"
            duration="24s"
            paused={reduceMotion}
            items={chainItems}
          />
        </div>
      </div>
    </div>
  );
}
