import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { createMetadata } from "@/lib/metadata";
import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "Research & Architecture",
  description:
    "Technical overview and research program for Daemon Protocol multi-agent blockchain security intelligence.",
  path: "/research",
});

export default function ResearchPage(): ReactNode {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1 px-6 py-16 sm:px-10 sm:py-24 lg:px-14">
      <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-cyan-400/90">
        Daemon Protocol
      </p>
      <h1 className="mt-4 max-w-3xl text-4xl font-medium leading-[1.05] tracking-tighter text-foreground sm:text-5xl">
        Research & architecture
      </h1>
      <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
        Deep technical documentation for multi-agent threat detection,
        explainable analysis via Cyclops, smart contract auditing via Caraxes,
        and real-time streaming correlation — coming soon.
      </p>

      <section className="mt-14 max-w-2xl space-y-6 border-t border-border pt-14">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          What this page will cover
        </h2>
        <ul className="list-inside list-disc space-y-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <li>Multi-agent system design and agent responsibilities</li>
          <li>Data ingestion, graph correlation, and compliance automation</li>
          <li>API reference and deployment models (Pilot, Enterprise, Research)</li>
          <li>Whitepaper and benchmark methodology (metrics subject to verification)</li>
        </ul>
      </section>

      <div className="mt-14 flex flex-wrap gap-4">
        <Link
          href="/"
          className="focus-ring inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3.5 font-mono text-xs font-medium uppercase tracking-[0.12em] text-background transition-opacity hover:opacity-90"
        >
          Back to home
        </Link>
        <Link
          href="/#contact"
          className="focus-ring inline-flex items-center gap-2 rounded-full border border-border px-5 py-3.5 font-mono text-xs font-medium uppercase tracking-[0.12em] text-foreground transition-colors hover:bg-muted"
        >
          Request a demo
        </Link>
      </div>
    </main>
      <Footer />
    </>
  );
}
