import { Faq } from "@/components/faq";
import { FinalCTA } from "@/components/final-cta";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { HeroCTAs } from "@/components/hero-ctas";
import { HeroHeadline } from "@/components/hero-headline";
import { HowItWorks } from "@/components/how-it-works";
import { ProblemStatement } from "@/components/problem-statement";
import { Reveal } from "@/components/reveal";
import { SectionCorners } from "@/components/section-corners";
import { Showcase } from "@/components/showcase";
import { SocialProof } from "@/components/social-proof";
import { HeroRadialLiquid } from "@/components/hero-radial-liquid";
import type { ReactNode } from "react";

export default function HomePage(): ReactNode {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        <section
          id="platform"
          className="relative border-b border-border scroll-mt-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="flex min-h-130 flex-col justify-center px-6 py-16 sm:px-10 sm:py-20 lg:min-h-160 lg:border-r lg:border-border lg:px-14 lg:py-24">
              <div
                style={{ ["--enter-delay" as string]: "380ms" }}
                className="enter"
              >
                <HeroHeadline />
              </div>
              <div
                style={{ ["--enter-delay" as string]: "520ms" }}
                className="enter mt-10"
              >
                <HeroCTAs />
              </div>
            </div>

            <div
              style={{ ["--enter-delay" as string]: "200ms" }}
              className="enter-fade relative isolate min-h-80 w-full overflow-hidden bg-background lg:min-h-160"
            >
              <HeroRadialLiquid />
            </div>
          </div>

          <SectionCorners />
        </section>

        <ProblemStatement />

        <Reveal>
          <Showcase />
        </Reveal>

        <HowItWorks />

        <Reveal>
          <SocialProof />
        </Reveal>

        <Reveal>
          <Faq />
        </Reveal>
      </main>
      <Reveal>
        <FinalCTA />
      </Reveal>
      <Footer />
    </>
  );
}
