"use client";

import { useReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Eye, FileSearch, Shield, type LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import dynamic from "next/dynamic";
import { useEffect, useState, type ReactNode } from "react";

const AsciiWavesLazy = dynamic(() => import("@/components/ascii-waves"), {
  ssr: false,
});

type Module = {
  id: string;
  title: string;
  body: string;
  Icon: LucideIcon;
};

const MODULES: ReadonlyArray<Module> = [
  {
    id: "cyclops",
    title: "Cyclops",
    Icon: Eye,
    body: "On-chain observability for analysts inspect agent outputs, trace fund flows, and review risk narratives across chains in real time.",
  },
  {
    id: "caraxes",
    title: "Caraxes",
    Icon: FileSearch,
    body: "Smart contract auditing with continuous validation — catch vulnerabilities before they reach production environments.",
  },
  {
    id: "risk",
    title: "Risk Intelligence",
    Icon: Shield,
    body: "Multi-agent correlation of behavioral, network, and compliance signals synthesized into a single, explainable risk score for investigative review.",
  },
];

function useCanHover(): boolean {
  const [canHover, setCanHover] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover)");
    const onChange = (e: MediaQueryListEvent) => setCanHover(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return canHover;
}

function FeatureModuleCard({
  module,
  index,
}: {
  module: Module;
  index: number;
}): ReactNode {
  const { Icon, title, body } = module;
  const [hovered, setHovered] = useState(false);
  const reduceMotion = useReducedMotion();
  const canHover = useCanHover();
  const showWave = hovered && canHover && !reduceMotion;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: 0.05 * index }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "group relative flex min-h-[360px] flex-col overflow-hidden rounded-2xl border border-border bg-neutral-950 p-6 sm:p-8",
        reduceMotion && hovered && "ring-1 ring-cyan-400/30"
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[50%] transition-opacity duration-500",
          showWave ? "opacity-100" : "opacity-0"
        )}
        aria-hidden="true"
      >
        {showWave ? (
          <AsciiWavesLazy
            characters=" .:-+*=%@#"
            color="#22d3ee"
            invert={false}
            noiseScale={1.8}
            elementSize={19}
            speed={0.45}
            hasCursorInteraction
            intensity={0.32}
            interactionIntensity={0.4}
            waveTension={0.4}
            waveTwist={0.08}
            className="h-full w-full"
          />
        ) : null}
      </div>

      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 z-[2] h-[58%] transition-opacity duration-500",
          "bg-gradient-to-b from-neutral-950 via-neutral-950/75 to-transparent",
          showWave ? "opacity-100" : "opacity-0"
        )}
        aria-hidden="true"
      />

      <Icon
        className="relative z-10 h-5 w-5 text-neutral-400"
        strokeWidth={1.5}
        aria-hidden="true"
      />

      <p className="relative z-10 mt-3 max-w-[28ch] text-sm leading-relaxed text-neutral-400 sm:text-base">
        {body}
      </p>

      <h3 className="relative z-10 mt-auto pt-8 text-base font-semibold text-neutral-50 sm:text-lg">
        {title}
      </h3>
    </motion.article>
  );
}

export function FeatureModules(): ReactNode {
  return (
    <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3 lg:mt-16">
      {MODULES.map((module, index) => (
        <FeatureModuleCard key={module.id} module={module} index={index} />
      ))}
    </div>
  );
}

export default function Features6(): ReactNode {
  return <FeatureModules />;
}
