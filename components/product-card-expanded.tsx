"use client";

import { cn } from "@/lib/utils";
import { X, type LucideIcon } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

export type ExpandedProduct = {
  id: string;
  title: string;
  description: string;
  href: string;
  previewVideoSrc?: string;
  Icon: LucideIcon;
};

type ProductCardExpandedProps = {
  product: ExpandedProduct;
  onClose: () => void;
};

export function ProductCardExpanded({
  product,
  onClose,
}: ProductCardExpandedProps): ReactNode {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [aspect, setAspect] = useState<number | null>(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent): void => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  const visitLabel = `Visit ${product.title}`;
  const previewVideoSrc = product.previewVideoSrc
    ? encodeURI(product.previewVideoSrc)
    : null;

  const clampedAspect =
    aspect == null ? null : Math.min(2.2, Math.max(1.2, aspect));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        aria-label="Close product details"
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-expanded-title"
        className="relative z-10 flex w-full max-w-[980px] flex-col overflow-auto rounded-2xl bg-card text-card-foreground shadow-2xl ring-1 ring-border sm:max-h-[90vh]"
      >
        <div className="p-4 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-start gap-4">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted">
                <product.Icon
                  className="h-4 w-4 text-foreground"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </div>
              <div className="min-w-0">
                <h3
                  id="product-expanded-title"
                  className="truncate text-2xl font-medium leading-[1.1] tracking-tight text-foreground sm:text-3xl"
                >
                  {product.title}
                </h3>
              </div>
            </div>

            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="focus-ring inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-foreground transition-opacity hover:opacity-80"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {previewVideoSrc ? (
            <div
              className="mt-6 w-full overflow-hidden rounded-2xl border border-border bg-background"
              style={{
                aspectRatio: clampedAspect ?? "16 / 9",
                maxHeight: "80vh",
              }}
            >
              <video
                key={previewVideoSrc}
                src={previewVideoSrc}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="h-full w-full object-contain"
                onLoadedMetadata={(e) => {
                  const el = e.currentTarget;
                  if (!el.videoWidth || !el.videoHeight) return;
                  setAspect(el.videoWidth / el.videoHeight);
                }}
              />
            </div>
          ) : (
            <div
              className={cn(
                "mt-6 flex h-[70vh] w-full items-center justify-center rounded-2xl",
                "border border-dashed border-border/60 bg-muted/30"
              )}
              aria-hidden="true"
            >
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                Dashboard preview
              </span>
            </div>
          )}

          <p className="mt-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {product.description}
          </p>

          <a
            href={product.href}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 font-mono text-xs font-medium uppercase tracking-[0.12em] text-primary-foreground transition-opacity hover:opacity-90"
          >
            {visitLabel}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
