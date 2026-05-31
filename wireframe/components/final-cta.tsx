"use client";

import { DitherShader } from "@/components/dither-shader";
import { CONTACT_EMAIL, CONTACT_MAILTO } from "@/lib/contact";
import type { ReactNode } from "react";

export function FinalCTA(): ReactNode {
  return (
    <section
      id="contact"
      className="scroll-mt-24 bg-background p-6 sm:p-10 lg:p-14"
    >
      <div className="overflow-hidden rounded-3xl border border-border bg-card text-card-foreground">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,420px)]">
          <div className="flex min-h-80 flex-col justify-center px-8 py-12 sm:px-12 sm:py-16 lg:border-r lg:border-border lg:px-14 lg:py-20">
            <h2 className="text-3xl font-medium leading-[1.05] tracking-tighter text-foreground sm:text-4xl lg:text-5xl">
              Work with Daemon.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
              Pilots, enterprise deployments, or general inquiries. Reach us
              directly
            </p>

            <div
              className="mt-10 flex w-full max-w-xl items-center rounded-full border border-border bg-background/40 p-1.5"
              role="group"
              aria-label="Contact Daemon"
            >
              <span className="min-w-0 flex-1 truncate pl-4 text-sm text-muted-foreground">
                {CONTACT_EMAIL}
              </span>
              <a
                href={CONTACT_MAILTO}
                className="focus-ring shrink-0 rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90 sm:px-8 sm:py-3"
              >
                Get in Touch
              </a>
            </div>
          </div>

          <div className="relative min-h-80 p-2 lg:min-h-90">
            <div className="enter-fade relative isolate h-full min-h-80 w-full overflow-hidden rounded-2xl border border-border lg:min-h-90">
              <DitherShader variant="hero" className="z-0" deferInit={0} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
