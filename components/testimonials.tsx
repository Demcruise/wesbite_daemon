"use client";

import { DitherCardBackground } from "@/components/dither-card-background";
import { NumberTicker } from "@/components/ui/number-ticker";
import { useReducedMotion } from "@/lib/motion";
import type { ReactNode } from "react";
import { SectionCorners } from "@/components/section-corners";

type ProofCard = {
  id: string;
  label: string;
  comparison: string;
  kind: "ticker" | "text";
  value?: number;
  decimalPlaces?: number;
  suffix?: string;
  text?: string;
  delay?: number;
};

const PROOF_CARDS: ReadonlyArray<ProofCard> = [
  {
    id: "accuracy",
    label: "Detection Accuracy",
    comparison: "9.5pts above the 85.2% baseline",
    kind: "ticker",
    value: 94.7,
    decimalPlaces: 1,
    suffix: "%",
    delay: 0,
  },
  {
    id: "false-positive",
    label: "False Positive Rate",
    comparison: "67% reduction from 12.3% baseline",
    kind: "ticker",
    value: 4.1,
    decimalPlaces: 1,
    suffix: "%",
    delay: 0.05,
  },
  {
    id: "rug-pull",
    label: "Rug Pull Prediction",
    comparison: "17.3pts above the 72.1% baseline",
    kind: "ticker",
    value: 89.4,
    decimalPlaces: 1,
    suffix: "%",
    delay: 0.1,
  },
  {
    id: "latency",
    label: "Analysis Time",
    comparison: "33% faster than the 6 - 12s baseline",
    kind: "text",
    text: "4 - 8s",
  },
  {
    id: "coverage",
    label: "Detection Coverage",
    comparison: "35pts above the 60% baseline",
    kind: "ticker",
    value: 95,
    decimalPlaces: 0,
    suffix: "%",
    delay: 0.15,
  },
];

const valueClassName =
  "text-3xl font-semibold tracking-tight text-foreground tabular-nums sm:text-4xl";

export function Testimonials(): ReactNode {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="proof"
      aria-labelledby="proof-heading"
      className="relative overflow-hidden border-b border-border p-6 sm:p-10 lg:p-14 scroll-mt-24"
    >
      <div className="relative z-10 max-w-3xl">
        <h2
          id="proof-heading"
          className="text-3xl font-medium leading-[1.05] tracking-tighter text-foreground sm:text-4xl lg:text-[3.5rem]"
        >
          Measured. Not estimated.
        </h2>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Five metrics benchmarked against traditional chain analysis systems.
          The Daemon ecosystem outperforms the baseline on all of them.
        </p>
      </div>

      <div className="relative z-10 mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-6 xl:grid-cols-5">
        {PROOF_CARDS.map((card, index) => (
          <ProofCardView
            key={card.id}
            card={card}
            index={index}
            reduceMotion={reduceMotion}
          />
        ))}
      </div>
      <SectionCorners />
    </section>
  );
}

function ProofCardView({
  card,
  index,
  reduceMotion,
}: {
  card: ProofCard;
  index: number;
  reduceMotion: boolean;
}): ReactNode {
  return (
    <article className="relative flex min-h-50 flex-col overflow-hidden rounded-2xl bg-card p-6 ring-1 ring-border sm:p-7">
      <DitherCardBackground index={index} intensityOpacity={0.4} />

      <div className="relative z-10 flex flex-1 flex-col">
        <p className={valueClassName}>
          {card.kind === "text" ? (
            card.text
          ) : reduceMotion ? (
            <>
              {card.value?.toFixed(card.decimalPlaces ?? 0)}
              {card.suffix}
            </>
          ) : (
            <>
              <NumberTicker
                value={card.value ?? 0}
                decimalPlaces={card.decimalPlaces ?? 0}
                delay={card.delay ?? 0}
                className={valueClassName}
              />
              {card.suffix}
            </>
          )}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {card.comparison}
        </p>
        <p className="mt-auto pt-8 text-base font-semibold tracking-tight text-foreground sm:text-lg">
          {card.label}
        </p>
      </div>
    </article>
  );
}
