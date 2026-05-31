import type { ReactNode } from "react";

export function DeviceMockup(): ReactNode {
  return (
    <div
      className="relative mx-auto w-full max-w-md rounded-[1.25rem] border border-border bg-muted p-3 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.45)]"
      aria-hidden="true"
    >
      <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-border" />
        <span className="h-2 w-2 rounded-full bg-border" />
        <span className="h-2 w-2 rounded-full bg-border" />
        <span className="ml-auto font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
          ops.daemon
        </span>
      </div>
      <div className="space-y-3 p-4">
        <div className="h-2 w-2/3 rounded-full bg-foreground/20" />
        <div className="grid grid-cols-3 gap-2">
          <div className="h-14 rounded-lg border border-border bg-background/80" />
          <div className="h-14 rounded-lg border border-border bg-background/80" />
          <div className="h-14 rounded-lg border border-cyan-500/40 bg-cyan-500/10" />
        </div>
        <div className="h-24 rounded-lg border border-border bg-background/60" />
        <div className="flex gap-2">
          <div className="h-2 flex-1 rounded-full bg-foreground/15" />
          <div className="h-2 flex-1 rounded-full bg-foreground/10" />
        </div>
      </div>
    </div>
  );
}
