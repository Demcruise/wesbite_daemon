"use client";

import SocialProof4 from "@/components/social-proof-4";
import { DEMO_TESTIMONIALS } from "@/lib/social-proof-data";
import { SectionCorners } from "@/components/section-corners";
import { motion } from "motion/react";
import type { ReactNode } from "react";

export function SocialProof(): ReactNode {
  return (
    <div id="reviews" className="relative scroll-mt-24 border-b border-border">
      <section className="bg-background px-6 pb-8 pt-16 sm:px-10 sm:pb-10 sm:pt-20 lg:px-14">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground"
        >
          Social proof
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-4 max-w-2xl text-3xl font-medium leading-[1.05] tracking-tighter text-foreground sm:text-4xl lg:text-[3rem]"
        >
          Trusted by the teams building onchain
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base"
        >
          Founders and operators who ran Daemon Protocol in production before
          mainnet.
        </motion.p>

        <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
          {DEMO_TESTIMONIALS.map((item) => (
            <article
              key={item.name}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 sm:p-8"
            >
              <p className="flex-1 text-sm leading-relaxed text-muted-foreground sm:text-base">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-4 border-t border-border pt-6">
                <img
                  src={item.avatar}
                  alt=""
                  width={48}
                  height={48}
                  className="h-12 w-12 shrink-0 rounded-xl border border-border object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {item.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.title}</p>
                  <p className="mt-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-primary">
                    Demo partner
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <SocialProof4 />
      <SectionCorners />
    </div>
  );
}
