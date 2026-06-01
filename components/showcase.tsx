"use client";

import { DitherHoverBackground } from "@/components/dither-hover-background";
import { DitherShader } from "@/components/dither-shader";
import {
  ProductCardExpanded,
  type ExpandedProduct,
} from "@/components/product-card-expanded";
import { useReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  EyeOff,
  Radar,
  Search,
  Shield,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { SectionCorners } from "@/components/section-corners";

type ShowcaseCard = ExpandedProduct & {
  index: string;
  excerpt: string;
};

const CARDS: ReadonlyArray<ShowcaseCard> = [
  {
    id: "daemon-protocol",
    index: "0.1",
    title: "Daemon Protocol",
    excerpt:
      "Onchain threat detection before you sign. Daemon Protocol screens wallets, contracts, and transactions for malicious behavior, reputation risk, and sanctions exposure in real time.",
    description:
      "Screens wallets, contracts, and transactions for scams, malicious behavior, and sanctions exposure before you sign.",
    href: "https://daemonprotocol.com",
    previewVideoSrc: "/Video/Daemon Os.mp4",
    Icon: Radar,
  },
  {
    id: "ares",
    index: "0.2",
    title: "ARES",
    excerpt:
      "Autonomous security protocol for on-chain infrastructure and agents. ARES runs continuously auditing in shadow mode, triaging detections, and closing incident loops without operator intervention.",
    description:
      "Runs continuously in shadow mode scanning, triaging, and closing incident loops without waiting for operator input.",
    href: "https://aressystem.dev",
    previewVideoSrc: "/Video/Operator Console.mp4",
    Icon: Shield,
  },
  {
    id: "grond",
    index: "0.3",
    title: "Grond",
    excerpt:
      "Evidence-first OSINT for analysts. Point Grond at any target person, organization, or public entity and it returns a structured, evidence-backed intelligence report drawn from web, social, and public discourse.",
    description:
      "Name a target, ask your question. Grond returns a structured, evidence-backed intelligence report",
    href: "https://daemonsystem.tech",
    previewVideoSrc: "/Video/Gront Visual.mp4",
    Icon: Search,
  },
  {
    id: "obscura",
    index: "0.4",
    title: "Obscura",
    excerpt:
      "Post-quantum private trading across Solana and EVM. Obscura keeps positions, amounts, and counterparties completely hidden without compromising execution or cross-chain reach",
    description:
      "Post-quantum private trading across Solana and EVM. Positions, amounts, and counterparties completely hidden.",
    href: "https://obscura-app.com",
    previewVideoSrc: "/Video/Obscura Visual.mp4",
    Icon: EyeOff,
  },
];

export function Showcase(): ReactNode {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [activeProductId, setActiveProductId] = useState<string | null>(null);
  const headingId = useId();

  const activeProduct =
    CARDS.find((c) => c.id === activeProductId) ?? null;

  const recompute = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const firstCard = track.querySelector<HTMLElement>("[data-card]");
    if (!firstCard) return;
    const cardWidth = firstCard.getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(track).columnGap || "0");
    const step = cardWidth + gap;
    if (step <= 0) {
      setPage(0);
      setPageCount(1);
      return;
    }
    const totalScrollable = track.scrollWidth - track.clientWidth;
    const pages = Math.max(1, Math.round(totalScrollable / step) + 1);
    const current = Math.round(track.scrollLeft / step);
    setPageCount(pages);
    setPage(Math.min(pages - 1, Math.max(0, current)));
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = (): void => recompute();
    track.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(() => recompute());
    ro.observe(track);
    return () => {
      track.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, [recompute]);

  const scrollByCards = useCallback((direction: 1 | -1): void => {
    const track = trackRef.current;
    if (!track) return;
    const firstCard = track.querySelector<HTMLElement>("[data-card]");
    if (!firstCard) return;
    const cardWidth = firstCard.getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(track).columnGap || "0");
    track.scrollBy({ left: direction * (cardWidth + gap), behavior: "smooth" });
  }, []);

  return (
    <section
      id="modules"
      aria-labelledby={headingId}
      className="relative border-b border-border scroll-mt-24"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-center px-6 py-16 sm:px-10 sm:py-20 lg:border-r lg:border-border lg:px-14 lg:py-24">
          <h2
            id={headingId}
            className="text-4xl font-medium leading-[1.05] tracking-tighter text-foreground sm:text-5xl lg:text-[3.5rem] xl:text-[4rem]"
          >
            Safe. Modular.
            <br />
            Connected.
          </h2>
          <p className="mt-10 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
            Each product was built to solve a distinct operational problem.
            Deploy one or all of them. They work independently and together.
          </p>
        </div>

        <div className="relative isolate flex min-h-full flex-col overflow-hidden bg-background">
          <DitherShader variant="hero" className="z-0" deferInit={50} />

          <div
            ref={trackRef}
            className="relative z-10 flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto scroll-smooth px-6 py-16 sm:gap-6 sm:px-10 sm:py-20 lg:px-14 lg:py-24 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {CARDS.map((card) => (
              <Card
                key={card.id}
                card={card}
                expanded={activeProductId === card.id}
                onOpen={() => setActiveProductId(card.id)}
              />
            ))}
            <div
              aria-hidden="true"
              className="shrink-0 basis-6 sm:basis-10 lg:basis-14"
            />
          </div>

          <div className="relative z-10 flex items-center justify-center gap-2 px-6 pb-10 sm:px-10 sm:pb-12 lg:px-14 lg:pb-14">
            <button
              type="button"
              onClick={() => scrollByCards(-1)}
              disabled={page === 0}
              aria-label="Previous card"
              className="focus-ring inline-flex h-8 w-8 items-center justify-center rounded-full bg-muted text-foreground transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div
              role="tablist"
              aria-label="Card progress"
              className="flex h-8 items-center gap-2 rounded-full bg-muted px-4"
            >
              {Array.from({ length: pageCount }).map((_, i) => (
                <span
                  key={i}
                  role="tab"
                  aria-selected={i === page}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === page
                      ? "w-6 bg-primary"
                      : "w-1.5 bg-muted-foreground/40"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => scrollByCards(1)}
              disabled={page >= pageCount - 1}
              aria-label="Next card"
              className="focus-ring inline-flex h-8 w-8 items-center justify-center rounded-full bg-muted text-foreground transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {activeProduct ? (
        <ProductCardExpanded
          product={activeProduct}
          onClose={() => setActiveProductId(null)}
        />
      ) : null}

      <SectionCorners />
    </section>
  );
}

function Card({
  card,
  expanded,
  onOpen,
}: {
  card: ShowcaseCard;
  expanded: boolean;
  onOpen: () => void;
}): ReactNode {
  const { Icon, index, title, excerpt } = card;
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const showExcerpt = reduceMotion || hovered;
  const showDither = !reduceMotion && hovered;

  const handleKeyDown = (e: KeyboardEvent<HTMLElement>): void => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen();
    }
  };

  return (
    <article
      data-card
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
      aria-label={`${title}. Click to view details.`}
      onClick={onOpen}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex aspect-[3/4] w-[280px] shrink-0 cursor-pointer snap-center flex-col overflow-hidden rounded-2xl bg-card p-6 ring-1 ring-border sm:w-[320px] sm:p-7 lg:w-[360px] lg:p-8"
    >
      <DitherHoverBackground active={showDither} intensityOpacity={0.25} />

      <Icon
        className="relative z-10 h-5 w-5 shrink-0 text-foreground"
        strokeWidth={1.5}
        aria-hidden="true"
      />

      <p
        className={cn(
          "relative z-10 mt-4 max-w-[28ch] flex-1 text-sm leading-relaxed transition-[opacity,color] duration-400 ease-out",
          showExcerpt ? "opacity-100" : "opacity-0",
          hovered ? "text-[#FFFFFF]" : "text-muted-foreground"
        )}
      >
        {excerpt}
      </p>

      <div className="relative z-10 mt-auto shrink-0 space-y-1 pt-4">
        <p className="font-mono text-xs text-muted-foreground">/{index}</p>
        <h3 className="text-xl font-medium leading-tight tracking-tight text-foreground sm:text-2xl">
          {title}
        </h3>
      </div>
    </article>
  );
}
