"use client";

import { NumberTicker } from "@/components/ui/number-ticker";
import { motion } from "motion/react";
import type { ReactNode } from "react";

const STATS: ReadonlyArray<{
  label: string;
  delay: number;
  enterDelay: string;
  kind: "ticker" | "text";
  value?: number;
  decimalPlaces?: number;
  suffix?: string;
  text?: string;
}> = [
  {
    label: "Detection accuracy",
    delay: 0,
    enterDelay: "740ms",
    kind: "ticker",
    value: 94.7,
    decimalPlaces: 1,
    suffix: "%",
  },
  {
    label: "Response time",
    delay: 0,
    enterDelay: "820ms",
    kind: "text",
    text: "4–8s",
  },
  {
    label: "Detection Coverage",
    delay: 0.16,
    enterDelay: "900ms",
    kind: "ticker",
    value: 95,
    decimalPlaces: 0,
    suffix: "%",
  },
];

const valueClassName =
  "text-2xl font-semibold tracking-tight text-foreground tabular-nums sm:text-3xl";

export function HeroStats(): ReactNode {
  return (
    <div className="grid grid-cols-3 px-6 py-10 sm:px-10 lg:px-14">
      {STATS.map((stat) => (
        <div
          key={stat.label}
          style={{ ["--enter-delay" as string]: stat.enterDelay }}
          className="enter"
        >
          <p className="text-xs font-medium tracking-wide text-muted-foreground sm:text-sm">
            {stat.label}
          </p>
          <p className={`mt-3 ${valueClassName}`}>
            {stat.kind === "text" ? (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              >
                {stat.text?.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.2,
                      delay: i * 0.08,
                      ease: "easeOut",
                    }}
                    className="inline-block mx-[0.04em]"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.span>
            ) : (
              <>
                <NumberTicker
                  value={stat.value ?? 0}
                  decimalPlaces={stat.decimalPlaces ?? 0}
                  delay={stat.delay}
                  className={valueClassName}
                />
                {stat.suffix}
              </>
            )}
          </p>
        </div>
      ))}
    </div>
  );
}
