"use client";

import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion, type Transition } from "motion/react";
import { useId, useState, type ReactNode } from "react";
import { SectionCorners } from "@/components/section-corners";

const PANEL_TRANSITION: Transition = {
  duration: 0.4,
  ease: [0.22, 1, 0.36, 1],
};

const CHEVRON_TRANSITION: Transition = {
  duration: 0.3,
  ease: [0.22, 1, 0.36, 1],
};

type FAQ = {
  q: string;
  a: ReadonlyArray<string>;
};

const FAQS: ReadonlyArray<FAQ> = [
  {
    q: "What is the Daemon ecosystem?",
    a: [
      "Daemon is the organization behind four connected products: Daemon Protocol (onchain threat intelligence), ARES (autonomous security), Grond (analyst console), and Obscura (private trading). Each product operates independently and shares a common intelligence layer.",
    ],
  },
  {
    q: "Which product should I start with?",
    a: [
      "Protocol teams typically start with Daemon Protocol or ARES. Analysts and investigators begin with Grond. Teams needing private execution evaluate Obscura. Contact us to scope a pilot around your specific use case.",
    ],
  },
  {
    q: "How do the products work together?",
    a: [
      "Intelligence from Daemon Protocol, ARES, and Grond feeds a shared correlation layer. Outputs are traceable, exportable, and consistent across products so operators work from one evidence chain, not three separate tools.",
    ],
  },
  {
    q: "Is the stack suitable for compliance workflows?",
    a: [
      "Yes. Daemon Protocol flags sanctioned addresses and generates exportable audit trails. Every output is structured for review by security desks and compliance teams.",
    ],
  },
  {
    q: "How do I get access?",
    a: [
      "Start with a Pilot plan or request a demo. Technical teams can review architecture and API documentation before committing. Enterprise deployments include dedicated onboarding from day one.",
    ],
  },
  {
    q: "Are the performance metrics on this site guaranteed?",
    a: [
      "All performance figures are drawn from internal benchmark environments. Conditions may vary across deployments. Contact us for a technical validation session specific to your infrastructure.",
    ],
  },
];

export function Faq(): ReactNode {
  const [openIndex, setOpenIndex] = useState<number>(0);
  const headingId = useId();

  return (
    <section
      id="faq"
      aria-labelledby={headingId}
      className="relative border-b border-border p-6 sm:p-10 lg:p-14 scroll-mt-24"
    >
      <h2
        id={headingId}
        className="text-3xl font-medium leading-[1.05] tracking-tighter text-foreground sm:text-4xl lg:text-[3.5rem]"
      >
        FAQs
      </h2>

      <div className="mt-6 border-t border-border sm:mt-10 lg:mt-14">
        <ul className="divide-y divide-border">
          {FAQS.map((faq, i) => (
            <FaqRow
              key={faq.q}
              faq={faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex((prev) => (prev === i ? -1 : i))}
            />
          ))}
        </ul>
      </div>
      <SectionCorners />
    </section>
  );
}

function FaqRow({
  faq,
  isOpen,
  onToggle,
}: {
  faq: FAQ;
  isOpen: boolean;
  onToggle: () => void;
}): ReactNode {
  const triggerId = useId();
  const panelId = useId();

  return (
    <li>
      <button
        id={triggerId}
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="focus-ring flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left sm:py-7"
      >
        <span className="text-base font-medium leading-snug tracking-tight text-foreground sm:text-lg">
          {faq.q}
        </span>

        <motion.span
          aria-hidden="true"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={CHEVRON_TRANSITION}
          className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center text-foreground"
        >
          <motion.span
            className="absolute inset-0 rounded-full bg-muted"
            animate={{ opacity: isOpen ? 0 : 1 }}
            transition={CHEVRON_TRANSITION}
          />
          <motion.span
            className="absolute inset-0 rounded-full border border-border"
            animate={{ opacity: isOpen ? 1 : 0 }}
            transition={CHEVRON_TRANSITION}
          />
          <ChevronDown className="relative h-4 w-4" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            id={panelId}
            role="region"
            aria-labelledby={triggerId}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={PANEL_TRANSITION}
            style={{ overflow: "hidden" }}
          >
            <motion.div
              initial={{ y: -6 }}
              animate={{ y: 0 }}
              exit={{ y: -6 }}
              transition={PANEL_TRANSITION}
              className="max-w-3xl space-y-4 pb-7 pr-12 text-sm leading-relaxed text-muted-foreground sm:text-base"
            >
              {faq.a.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>
    </li>
  );
}
