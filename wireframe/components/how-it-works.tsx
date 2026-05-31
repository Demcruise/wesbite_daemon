"use client";

import HowItWorks6 from "@/components/how-it-works-6";
import { SectionCorners } from "@/components/section-corners";
import type { ReactNode } from "react";

export function HowItWorks(): ReactNode {
  return (
    <div id="how-it-works" className="relative scroll-mt-24 border-b border-border">
      <HowItWorks6 />
      <SectionCorners />
    </div>
  );
}
