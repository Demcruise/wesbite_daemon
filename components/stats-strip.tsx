import { SectionCorners } from "@/components/section-corners";
import type { ReactNode } from "react";

const STATS = [
  { value: "94.7%", label: "Detection accuracy" },
  { value: "< 8s", label: "Analysis time" },
  { value: "95%", label: "Detection coverage" },
] as const;

export function StatsStrip(): ReactNode {
  return (
    <section
      aria-label="Key metrics"
      className="relative border-b border-border bg-background"
    >
      <div className="grid grid-cols-3 px-6 py-8 sm:px-10 sm:py-10 lg:px-14">
        {STATS.map((stat) => (
          <div key={stat.label}>
            <p className="text-xs font-medium tracking-wide text-muted-foreground sm:text-sm">
              {stat.label}
            </p>
            <p className="mt-2 text-2xl font-semibold tabular-nums tracking-tight text-foreground sm:text-3xl">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
      <p className="border-t border-border px-6 py-4 text-center text-xs text-muted-foreground sm:px-10 lg:px-14">
        Validated across 3.69B transactions — Daemon Protocol Research, 2024
      </p>
      <SectionCorners />
    </section>
  );
}
