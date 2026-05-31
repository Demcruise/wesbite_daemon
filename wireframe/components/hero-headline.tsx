"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const WORDS = ["Operate with", "Clarity."] as const;

const SUBHEADLINE =
  "Daemon BlockInt Technologies builds the intelligence and security infrastructure behind onchain operations";

export function HeroHeadline(): ReactNode {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div>
        <h1 className="text-3xl font-medium leading-[1.1] tracking-tighter text-foreground sm:text-4xl lg:text-[3.25rem] xl:text-[4.5rem]">
          Operate with Clarity
        </h1>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
          {SUBHEADLINE}
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-medium leading-[1.1] tracking-tighter text-foreground sm:text-4xl lg:text-[3.25rem] xl:text-[4.5rem]">
        {WORDS.map((word, i) => (
          <motion.span
            key={word}
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.55,
              delay: 0.38 + i * 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="block last:mr-0"
          >
            {word}
          </motion.span>
        ))}
      </h1>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base"
      >
        {SUBHEADLINE}
      </motion.p>
    </div>
  );
}
