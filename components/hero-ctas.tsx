"use client";

import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

const ctaClassName =
  "focus-ring text-xs font-semibold uppercase tracking-[0.12em]";

function scrollToModules(): void {
  document.getElementById("modules")?.scrollIntoView({ behavior: "smooth" });
}

export function HeroCTAs(): ReactNode {
  const router = useRouter();

  return (
    <div className="flex flex-wrap items-center gap-4 sm:gap-6">
      <InteractiveHoverButton
        type="button"
        onClick={scrollToModules}
        className={`${ctaClassName} border-border bg-primary text-primary-foreground px-5 py-3.5`}
      >
        Explore products
      </InteractiveHoverButton>
      <InteractiveHoverButton
        type="button"
        onClick={() => router.push("/research")}
        className={`${ctaClassName} border-border bg-muted text-foreground px-5 py-3.5`}
      >
        Read docs
      </InteractiveHoverButton>
    </div>
  );
}
