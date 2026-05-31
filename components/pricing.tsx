"use client";

import { DitherHoverBackground } from "@/components/dither-hover-background";
import { SectionCorners } from "@/components/section-corners";
import { useReducedMotion } from "@/lib/motion";
import { Check } from "lucide-react";
import { useId, useState, type ReactNode } from "react";

type Tier = {
  id: string;
  name: string;
  tagline: string;
  priceAmount: string;
  pricePeriod?: string;
  priceNote: string;
  cta: { label: string; href: string };
  features: ReadonlyArray<string>;
  featured: boolean;
};

const TIERS: ReadonlyArray<Tier> = [
  {
    id: "pilot",
    name: "Pilot",
    tagline:
      "Test one product or a limited cross-product setup before committing to production.",
    priceAmount: "From $2,500",
    pricePeriod: "/mo",
    priceNote: "Limited deployment",
    cta: { label: "Start pilot", href: "#contact" },
    features: [
      "Daemon Protocol or ARES access",
      "Single-chain sandbox environment",
      "Grond analyst console (read-only)",
      "Cross-product signal visibility",
    ],
    featured: false,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline:
      "Full platform access across production infrastructure. Backed by SLA and dedicated support.",
    priceAmount: "Custom",
    priceNote: "Production SLA · annual contract",
    cta: {
      label: "Request quote",
      href: "mailto:admin@daemonprotocol.com?subject=Enterprise%20quote",
    },
    features: [
      "Full platform: Protocol, ARES, Grond, Obscura",
      "Multi-chain monitoring and correlation",
      "Compliance reporting and audit exports",
      "Dedicated onboarding and integration support",
    ],
    featured: true,
  },
  {
    id: "research",
    name: "Research",
    tagline:
      "For academics and independent researchers. Free access in exchange for published findings.",
    priceAmount: "Free",
    priceNote: "Application required",
    cta: { label: "Apply for research", href: "/research" },
    features: [
      "Architecture and API documentation",
      "Early access to new products",
      "Rewards for published research contributions",
      "Direct collaboration with the core team",
    ],
    featured: false,
  },
];

export function Pricing(): ReactNode {
  const headingId = useId();

  return (
    <section
      aria-labelledby={headingId}
      className="relative border-b border-border p-6 sm:p-10 lg:p-14"
    >
      <div className="max-w-xl">
        <h2
          id={headingId}
          className="text-2xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-3xl lg:text-[2.5rem]"
        >
          Three ways to work with Daemon.
        </h2>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
          Start focused, scale to full operations, or contribute as a research
          partner.
        </p>
      </div>

      <div className="relative mt-12 grid grid-cols-1 gap-4 lg:mt-16 lg:grid-cols-3 lg:gap-6">
        {TIERS.map((tier) => (
          <PricingCard key={tier.id} tier={tier} />
        ))}
      </div>
      <SectionCorners />
    </section>
  );
}

function PricingCard({ tier }: { tier: Tier }): ReactNode {
  const { featured } = tier;
  const [hovered, setHovered] = useState(false);
  const reduceMotion = useReducedMotion();
  const showDither = hovered && !reduceMotion;
  const featuredShadow = featured
    ? "shadow-[0_12px_32px_-18px_rgba(0,173,181,0.25)]"
    : "";

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative flex min-h-[480px] flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 text-foreground sm:p-8 lg:min-h-[520px] ${featuredShadow}`}
    >
      <DitherHoverBackground
        active={showDither}
        variant="hero"
        intensityOpacity={0.35}
      />

      <div className="relative z-10 flex h-full flex-col">
        <header className="flex items-center justify-between gap-4">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            {tier.name}
          </h3>
          {featured ? (
            <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 font-mono text-[0.625rem] font-medium uppercase tracking-[0.16em] text-primary-foreground">
              Recommended
            </span>
          ) : null}
        </header>

        <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
          {tier.tagline}
        </p>

        <div className="mt-10 flex items-baseline gap-1.5">
          <span className="text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
            {tier.priceAmount}
          </span>
          {tier.pricePeriod ? (
            <span className="text-lg font-medium text-muted-foreground">
              {tier.pricePeriod}
            </span>
          ) : null}
        </div>
        <p className="mt-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground">
          {tier.priceNote}
        </p>

        <ul className="mt-10 space-y-3">
          {tier.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-3 text-sm leading-relaxed text-foreground"
            >
              <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-primary">
                <Check className="h-3 w-3" strokeWidth={2} />
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-10">
          <a
            href={tier.cta.href}
            className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 font-mono text-xs font-medium uppercase tracking-[0.12em] text-primary-foreground transition-opacity hover:opacity-90"
          >
            {tier.cta.label}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </article>
  );
}
