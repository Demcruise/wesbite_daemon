import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type DaemonLogoProps = {
  href?: string;
  className?: string;
  size?: "sm" | "md";
};

const sizeClass = {
  sm: "h-6",
  md: "h-8",
} as const;

export function DaemonLogo({
  href = "#main-content",
  className,
  size = "md",
}: DaemonLogoProps): ReactNode {
  const imgClass = cn("w-auto shrink-0", sizeClass[size]);

  const images = (
    <>
      <img
        src="/Logo Daemon Protocol_Black.png"
        alt="Daemon Protocol"
        className={cn(imgClass, "block dark:hidden")}
      />
      <img
        src="/Logo Daemon Protocol_White.png"
        alt=""
        className={cn(imgClass, "hidden dark:block")}
      />
    </>
  );

  return (
    <Link
      href={href}
      className={cn(
        "focus-ring inline-flex items-center rounded-sm",
        className,
      )}
      aria-label="Daemon Protocol home"
    >
      {images}
    </Link>
  );
}
