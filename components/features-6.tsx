"use client";

import { DitherHoverBackground } from "@/components/dither-hover-background";
import { useReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Eye, FileSearch, Shield } from "lucide-react";
import { motion } from "motion/react";
import { useState, type ReactNode } from "react";

const modules = [
  {
    title: "Cyclops",
    desc: "On-chain observability for analysts inspect agent outputs, trace fund flows, and review risk narratives across chains in real time.",
  },
  {
    title: "Caraxes",
    desc: "Smart contract auditing with continuous validation — catch vulnerabilities before they reach production environments.",
  },
  {
    title: "Risk Intelligence",
    desc: "Multi-agent correlation of behavioral, network, and compliance signals synthesized into a single, explainable risk score for investigative review.",
  },
] as const;

const icons = [Eye, FileSearch, Shield] as const;

type Module = (typeof modules)[number];

function Card({
  module,
  index,
  Icon,
}: {
  module: Module;
  index: number;
  Icon: (typeof icons)[number];
}): ReactNode {
  const [hovered, setHovered] = useState(false);
  const reduceMotion = useReducedMotion();
  const words = module.desc.split(" ");
  const showDither = hovered && !reduceMotion;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: 0.05 * index }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex min-h-[360px] flex-col overflow-hidden rounded-2xl bg-neutral-100 p-6 dark:bg-neutral-900 sm:p-8"
    >
      <DitherHoverBackground active={showDither} />

      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 z-[1] h-[40%] bg-gradient-to-b from-neutral-100/90 to-transparent transition-opacity duration-300 dark:from-neutral-900/90",
          showDither ? "opacity-100" : "opacity-0"
        )}
        aria-hidden="true"
      />

      <Icon
        className="relative z-10 h-5 w-5 text-neutral-900 dark:text-neutral-200"
        strokeWidth={1.5}
      />

      <p className="relative z-10 mt-3 max-w-[220px] text-xs leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-sm">
        {words.map((w, wi) => (
          <motion.span
            key={wi}
            initial={false}
            animate={{
              opacity: hovered ? 1 : 0,
              y: hovered ? 0 : 4,
              filter: hovered ? "blur(0px)" : "blur(3px)",
            }}
            transition={{
              duration: 0.3,
              delay: hovered ? wi * 0.03 : 0,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mr-[0.25em] inline-block"
          >
            {w}
          </motion.span>
        ))}
      </p>

      <span className="relative z-10 mt-auto pt-8 text-base text-neutral-900 dark:text-white sm:text-lg">
        {module.title}
      </span>
    </motion.div>
  );
}

export function FeatureModules(): ReactNode {
  return (
    <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3 lg:mt-16">
      {modules.map((m, i) => (
        <Card key={m.title} module={m} index={i} Icon={icons[i]!} />
      ))}
    </div>
  );
}

export default function Features6(): ReactNode {
  return <FeatureModules />;
}
