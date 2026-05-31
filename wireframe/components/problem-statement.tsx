"use client";

import { SectionCorners } from "@/components/section-corners";
import { useReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { CircleCheck } from "lucide-react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef, type ReactNode } from "react";

const SENTENCES = [
  "The onchain world grew faster than the infrastructure built to protect it.",
  "Intelligence, security, reconnaissance, and execution ended up in separate tools, separate vendors, separate contexts.",
  "Daemon BlockInt Technologies was built because that gap has a cost and no one was closing it as a coherent system.",
] as const;

const CLOSING_INDEX = SENTENCES.length - 1;

const SUPPORTING =
  "We exist to give onchain operators the full picture, in one place, before it matters";

type WordToken = {
  word: string;
  sentenceIndex: number;
  isClosing: boolean;
};

function buildTokens(): WordToken[] {
  const tokens: WordToken[] = [];
  for (let si = 0; si < SENTENCES.length; si += 1) {
    const sentence = SENTENCES[si]!;
    const words = sentence.split(" ");
    for (let wi = 0; wi < words.length; wi += 1) {
      tokens.push({
        word: words[wi]!,
        sentenceIndex: si,
        isClosing: si === CLOSING_INDEX,
      });
    }
  }
  return tokens;
}

const WORD_TOKENS = buildTokens();

function RevealWord({
  token,
  progress,
  range,
}: {
  token: WordToken;
  progress: MotionValue<number>;
  range: [number, number];
}): ReactNode {
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <span className="relative mx-[0.2em] inline-block">
      <span
        className={cn(
          "absolute opacity-30",
          token.isClosing && "italic text-muted-foreground/40"
        )}
      >
        {token.word}
      </span>
      <motion.span
        style={{ opacity }}
        className={cn(
          "text-foreground",
          token.isClosing && "italic text-muted-foreground"
        )}
      >
        {token.word}
      </motion.span>
    </span>
  );
}

export function ProblemStatement(): ReactNode {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  if (reduceMotion) {
    return (
      <section
        id="pain-points"
        className="relative border-b border-border bg-background scroll-mt-24"
      >
        <div className="mx-auto max-w-4xl px-6 py-16 sm:px-10 sm:py-20 lg:px-14 lg:py-24">
          <p className="text-left text-3xl font-bold leading-snug tracking-tight text-foreground md:text-4xl lg:text-5xl xl:text-6xl">
            {SENTENCES.map((sentence, i) => (
              <span key={sentence}>
                {i === CLOSING_INDEX ? (
                  <span className="italic text-muted-foreground">
                    {sentence}
                  </span>
                ) : (
                  sentence
                )}
                {i < SENTENCES.length - 1 ? " " : null}
              </span>
            ))}
          </p>
          <SupportingFooter />
        </div>
        <SectionCorners />
      </section>
    );
  }

  const totalWords = WORD_TOKENS.length;

  return (
    <section
      ref={sectionRef}
      id="pain-points"
      className="relative border-b border-border bg-background scroll-mt-24"
    >
      <div className="relative h-[200vh]">
        <div className="sticky top-0 mx-auto flex min-h-[50vh] max-w-4xl items-center px-6 py-16 sm:px-10 sm:py-20 lg:px-14 lg:py-24">
          <p className="flex flex-wrap text-left text-3xl font-bold leading-snug tracking-tight text-foreground/15 md:text-4xl lg:text-5xl xl:text-6xl">
            {WORD_TOKENS.map((token, i) => {
              const start = i / totalWords;
              const end = start + 1 / totalWords;
              return (
                <RevealWord
                  key={`${token.sentenceIndex}-${i}`}
                  token={token}
                  progress={scrollYProgress}
                  range={[start, end]}
                />
              );
            })}
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-4xl px-6 pb-12 sm:px-10 lg:px-14 lg:pb-16">
        <SupportingFooter />
      </div>
      <SectionCorners />
    </section>
  );
}

function SupportingFooter(): ReactNode {
  return (
    <div className="mt-8 flex max-w-xl items-start gap-3">
      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <CircleCheck className="h-3.5 w-3.5" strokeWidth={2.5} />
      </span>
      <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
        {SUPPORTING}
      </p>
    </div>
  );
}
