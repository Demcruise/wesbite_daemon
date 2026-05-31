"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/motion";
import { Crosshair, FileCheck, Network, Rocket, type LucideIcon } from "lucide-react";
import { HowItWorksStepImage } from "@/components/how-it-works-visuals";

type Step = {
  title: string;
  copy: string;
  icon: LucideIcon;
  imageSrc: string;
  imageAlt: string;
};

const steps: Step[] = [
  {
    title: "Define the target",
    copy: "Start with a question. Set the target, choose your parameters, and tell the system what to establish in plain language.",
    icon: Crosshair,
    imageSrc: "/How it works 1.png",
    imageAlt: "Define the target — investigation prompt",
  },
  {
    title: "Correlate across the stack",
    copy: "Intelligence from Daemon Protocol, ARES, and Grond feeds a single correlation layer. Signals link across products instead of terminating in separate tools.",
    icon: Network,
    imageSrc: "/How it works 2.png",
    imageAlt: "Correlate across the stack — signal hub diagram",
  },
  {
    title: "Decide with evidence",
    copy: "Every output is structured, scored, and traceable. Operators and compliance teams get the full evidence chain, not a summary.",
    icon: FileCheck,
    imageSrc: "/How it works 4.png",
    imageAlt: "Decide with evidence — risk assessment details",
  },
  {
    title: "Deliver verified intelligence",
    copy: "Every report is signed, timestamped, and packaged for handoff. Ready for security review, legal, or client delivery.",
    icon: Rocket,
    imageSrc: "/How it works 3.png",
    imageAlt: "Deliver verified intelligence — recent reports",
  },
];

function Node({
  progress,
  at,
  Icon,
}: {
  progress: MotionValue<number>;
  at: number;
  Icon: LucideIcon;
}) {
  const start = Math.max(0, at - 0.12);
  const mid = Math.min(1, at + 0.02);
  const scale = useTransform(progress, [start, mid], [0.6, 1]);
  const opacity = useTransform(progress, [start, mid], [0.25, 1]);
  const ringOpacity = useTransform(progress, [start, mid], [0, 1]);
  const reached = useTransform(progress, (v) => v >= mid - 0.001);
  const pulseOpacity = useTransform(reached, (active) => (active ? 0.5 : 0));
  const nodeBg = useTransform(reached, (active) =>
    active ? "rgb(0 173 181)" : "rgb(57 62 70)"
  );
  const nodeColor = useTransform(reached, (active) =>
    active ? "rgb(6 6 6)" : "rgb(238 238 238)"
  );

  return (
    <div className="relative grid place-items-center">
      <span className="absolute h-14 w-14 rounded-full bg-card" />
      <motion.span
        style={{ opacity: ringOpacity }}
        className="absolute h-14 w-14 rounded-full ring-[6px] ring-border"
      />
      <motion.span
        style={{ opacity: pulseOpacity }}
        aria-hidden
        className="absolute h-12 w-12 rounded-full bg-primary"
        initial={{ scale: 1, opacity: 0.5 }}
        animate={{ scale: 1.8, opacity: 0 }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
      />
      <motion.span
        style={{ scale, opacity, backgroundColor: nodeBg, color: nodeColor }}
        transition={{ duration: 0.35 }}
        className="relative grid h-12 w-12 place-items-center rounded-full"
      >
        <Icon className="h-5 w-5" />
      </motion.span>
    </div>
  );
}

function Card({
  step,
  side,
  stepIndex,
  reduceMotion,
}: {
  step: Step;
  side: "left" | "right";
  stepIndex: number;
  reduceMotion: boolean;
}) {
  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 1, y: 0 }}
      whileInView={
        reduceMotion ? undefined : { opacity: 1, y: 0 }
      }
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`w-full overflow-hidden rounded-2xl border border-border bg-card md:w-[44%] ${
        side === "left" ? "md:mr-auto" : "md:ml-auto"
      }`}
    >
      <div className="p-5 sm:p-6">
        <div className="mb-5 -mx-1 sm:mx-0">
          <HowItWorksStepImage
            src={step.imageSrc}
            alt={step.imageAlt}
            priority={stepIndex === 0}
          />
        </div>
        <h3 className="text-base font-semibold text-foreground sm:text-lg">
          {step.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {step.copy}
        </p>
      </div>
    </motion.article>
  );
}

export default function HowItWorks6() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const firstNodeRef = useRef<HTMLDivElement>(null);
  const lastNodeRef = useRef<HTMLDivElement>(null);
  const scrollYProgress = useMotionValue(0);
  const [lineBounds, setLineBounds] = useState({ top: 0, height: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;

    const tick = () => {
      const container = ref.current;
      const first = firstNodeRef.current;
      const last = lastNodeRef.current;
      if (container && first && last) {
        const win = container.ownerDocument.defaultView ?? window;
        const vh =
          win.innerHeight || container.ownerDocument.documentElement.clientHeight;
        const containerRect = container.getBoundingClientRect();
        const firstRect = first.getBoundingClientRect();
        const lastRect = last.getBoundingClientRect();

        const firstCenterY = firstRect.top + firstRect.height / 2;
        const lastCenterY = lastRect.top + lastRect.height / 2;

        const activate = vh * 0.55;

        const span = lastCenterY - firstCenterY;
        if (span > 0) {
          const p = (activate - firstCenterY) / span;
          scrollYProgress.set(Math.min(1, Math.max(0, p)));
        }

        const top = firstCenterY - containerRect.top;
        const height = lastCenterY - firstCenterY;
        setLineBounds((prev) =>
          prev.top === top && prev.height === height ? prev : { top, height }
        );
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [scrollYProgress]);

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="relative flex w-full items-start overflow-hidden bg-background px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="relative mx-auto flex w-full max-w-[1200px] flex-col items-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          How it works
        </p>

        <h2 className="mt-6 max-w-xl text-center text-3xl font-medium leading-[1.05] tracking-tighter text-foreground sm:text-5xl">
          One workflow. Four products. No context-switching
        </h2>

        <p className="mt-5 max-w-md text-center text-base text-muted-foreground">
          From first question to verified output, the entire pipeline runs
          inside one operator environment
        </p>

        <div ref={ref} className="relative mt-20 w-full sm:mt-28">
          <div
            aria-hidden
            style={{ top: lineBounds.top, height: lineBounds.height }}
            className="absolute left-1/2 w-px -translate-x-1/2 border-l border-dashed border-border"
          />
          <motion.div
            aria-hidden
            style={{
              top: lineBounds.top,
              height: lineBounds.height,
              scaleY: lineScale,
              transformOrigin: "top",
            }}
            className="absolute left-1/2 w-px -translate-x-1/2 bg-primary"
          />

          <div className="flex flex-col gap-16 sm:gap-24">
            {steps.map((step, i) => {
              const side: "left" | "right" = i % 2 === 0 ? "left" : "right";
              const at = i / Math.max(1, steps.length - 1);
              const isFirst = i === 0;
              const isLast = i === steps.length - 1;
              return (
                <div
                  key={step.title}
                  className="relative flex flex-col items-center"
                >
                  <div
                    ref={
                      isFirst ? firstNodeRef : isLast ? lastNodeRef : undefined
                    }
                    className="relative z-10"
                  >
                    <Node progress={scrollYProgress} at={at} Icon={step.icon} />
                  </div>
                  <div className="mt-8 flex w-full">
                    <Card
                      step={step}
                      side={side}
                      stepIndex={i}
                      reduceMotion={reduceMotion}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
