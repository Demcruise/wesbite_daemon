"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import type { ReactNode } from "react";

type HowItWorksStepImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
  fit?: "cover" | "contain";
  className?: string;
};

export function HowItWorksStepImage({
  src,
  alt,
  priority = false,
  fit = "cover",
  className,
}: HowItWorksStepImageProps): ReactNode {
  return (
    <div
      className={cn(
        "relative w-full aspect-[16/10] min-h-[200px] overflow-hidden rounded-xl border border-dashed border-border/60 bg-muted/20 sm:min-h-[240px] md:min-h-[280px]",
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, 44vw"
        className={cn(
          "object-center",
          fit === "cover" ? "object-cover" : "object-contain"
        )}
      />
    </div>
  );
}
