"use client";

import { ViewportDitherShader } from "@/components/viewport-dither-shader";
import {
  ALL_MARQUEE_TESTIMONIALS,
  type Testimonial,
} from "@/lib/social-proof-data";
import { useReducedMotion } from "@/lib/motion";
import { motion } from "motion/react";
import { useEffect, useRef, type RefObject } from "react";

function testimonialSubtitle(testimonial: Testimonial): string | null {
  if (testimonial.title === "Solana dApp Store") return null;
  return testimonial.title;
}

function ReviewMarqueeCard({ testimonial }: { testimonial: Testimonial }) {
  const subtitle = testimonialSubtitle(testimonial);

  return (
    <div className="mb-4 rounded-2xl bg-muted/40 p-1.5">
      <div className="relative overflow-hidden rounded-[10px] border border-border bg-card p-6">
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
        <div className="flex items-center gap-3">
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="h-10 w-10 rounded-lg border border-border object-cover"
          />
          <div>
            <div className="text-sm font-semibold text-foreground">
              {testimonial.name}
            </div>
            {subtitle ? (
              <div className="text-xs text-muted-foreground">{subtitle}</div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

type MarqueeLane = {
  el: HTMLDivElement;
  speedPxPerSec: number;
  offset: number;
  lastLoopHeight: number;
};

function tickMarquee(lane: MarqueeLane, deltaMs: number): void {
  const loopHeight = lane.el.scrollHeight / 2;
  if (loopHeight < 1) return;

  if (lane.lastLoopHeight !== loopHeight) {
    lane.offset = lane.offset % loopHeight;
    lane.lastLoopHeight = loopHeight;
  }

  lane.offset += lane.speedPxPerSec * (deltaMs / 1000);
  if (lane.offset >= loopHeight) {
    lane.offset %= loopHeight;
  }
  lane.el.style.transform = `translate3d(0, -${lane.offset}px, 0)`;
}

export default function SocialProof4() {
  const allTestimonials = [...ALL_MARQUEE_TESTIMONIALS];
  const reduceMotion = useReducedMotion();

  const third = Math.ceil(allTestimonials.length / 3);
  const col1 = allTestimonials.slice(0, third);
  const col2 = allTestimonials.slice(third, third * 2);
  const col3 = allTestimonials.slice(third * 2);
  const testimonials: [typeof col1, typeof col2, typeof col3] = [
    col1,
    col2,
    col3,
  ];

  const sectionRef = useRef<HTMLElement>(null);
  const marquee1Ref = useRef<HTMLDivElement>(null);
  const marquee2Ref = useRef<HTMLDivElement>(null);
  const marquee3Ref = useRef<HTMLDivElement>(null);
  const marqueeMobileRef = useRef<HTMLDivElement>(null);
  const lanesRef = useRef<MarqueeLane[]>([]);

  useEffect(() => {
    if (reduceMotion) return;

    const buildLanes = (): MarqueeLane[] => {
      const next: MarqueeLane[] = [];
      const add = (
        ref: RefObject<HTMLDivElement | null>,
        speedPxPerSec: number,
      ): void => {
        const el = ref.current;
        if (!el || el.scrollHeight < 2) return;
        el.style.willChange = "transform";
        next.push({
          el,
          speedPxPerSec,
          offset: 0,
          lastLoopHeight: 0,
        });
      };
      add(marqueeMobileRef, 22);
      add(marquee1Ref, 22);
      add(marquee2Ref, 26);
      add(marquee3Ref, 24);
      return next;
    };

    const resetOffsets = (): void => {
      for (const lane of lanesRef.current) {
        lane.offset = 0;
        lane.lastLoopHeight = 0;
        lane.el.style.transform = "translate3d(0, 0, 0)";
      }
    };

    lanesRef.current = buildLanes();

    const observers: ResizeObserver[] = [];
    for (const lane of lanesRef.current) {
      let lastHeight = lane.el.scrollHeight / 2;
      const ro = new ResizeObserver(() => {
        const h = lane.el.scrollHeight / 2;
        if (h < 1) return;
        if (Math.abs(h - lastHeight) > 8) {
          lastHeight = h;
          resetOffsets();
        }
      });
      ro.observe(lane.el);
      observers.push(ro);
    }

    let running = true;
    let animationId = 0;
    let lastTime = performance.now();

    const animate = (time: number): void => {
      const deltaMs = Math.min(time - lastTime, 50);
      lastTime = time;

      if (running && lanesRef.current.length > 0) {
        for (const lane of lanesRef.current) {
          tickMarquee(lane, deltaMs);
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    const layoutPass = (): void => {
      lanesRef.current = buildLanes();
    };
    const layoutId = requestAnimationFrame(() => {
      requestAnimationFrame(layoutPass);
    });

    const section = sectionRef.current;
    const io =
      section && typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            ([entry]) => {
              running = entry?.isIntersecting ?? true;
            },
            { rootMargin: "200px 0px", threshold: 0 },
          )
        : null;
    io?.observe(section!);

    animationId = requestAnimationFrame(animate);

    return () => {
      running = false;
      cancelAnimationFrame(animationId);
      cancelAnimationFrame(layoutId);
      io?.disconnect();
      for (const ro of observers) {
        ro.disconnect();
      }
    };
  }, [reduceMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate w-full overflow-hidden bg-background pb-16 pt-4 sm:pb-24"
    >
      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="mb-12 lg:mb-14">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
          >
            Reviews from the Solana dApp Store
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="mt-3 max-w-lg text-sm text-muted-foreground sm:text-base"
          >
            What users are saying on Seeker.
          </motion.p>
        </div>

        {/* Mobile - Single Marquee */}
        <div className="relative sm:hidden">
          <div className="relative h-[600px] overflow-hidden">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-0"
            >
              <ViewportDitherShader variant="hero" deferInit={200} />
            </div>
            <div ref={marqueeMobileRef} className="relative z-10">
              {[...allTestimonials, ...allTestimonials].map(
                (testimonial, index) => (
                  <ReviewMarqueeCard
                    key={`mobile-${index}`}
                    testimonial={testimonial}
                  />
                ),
              )}
            </div>
            <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-32 bg-linear-to-b from-background via-background/90 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-32 bg-linear-to-t from-background via-background/90 to-transparent" />
          </div>
        </div>

        {/* Desktop - Three Marquee Columns */}
        <div className="relative hidden h-[600px] gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0"
          >
            <ViewportDitherShader variant="hero" deferInit={200} />
          </div>
          <div className="relative z-10 h-[600px] overflow-hidden">
            <div ref={marquee1Ref}>
              {[...testimonials[0], ...testimonials[0]].map(
                (testimonial, index) => (
                  <ReviewMarqueeCard
                    key={`col1-${index}`}
                    testimonial={testimonial}
                  />
                ),
              )}
            </div>
            <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-24 bg-linear-to-b from-background to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-linear-to-t from-background to-transparent" />
          </div>

          <div className="relative z-10 h-[600px] overflow-hidden">
            <div ref={marquee2Ref}>
              {[...testimonials[1], ...testimonials[1]].map(
                (testimonial, index) => (
                  <ReviewMarqueeCard
                    key={`col2-${index}`}
                    testimonial={testimonial}
                  />
                ),
              )}
            </div>
            <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-24 bg-linear-to-b from-background to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-linear-to-t from-background to-transparent" />
          </div>

          <div className="relative z-10 h-[600px] overflow-hidden">
            <div ref={marquee3Ref}>
              {[...testimonials[2], ...testimonials[2]].map(
                (testimonial, index) => (
                  <ReviewMarqueeCard
                    key={`col3-${index}`}
                    testimonial={testimonial}
                  />
                ),
              )}
            </div>
            <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-24 bg-linear-to-b from-background to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-linear-to-t from-background to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
