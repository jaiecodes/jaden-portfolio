// src/features/about/components/AboutHero.tsx
import { motion } from "motion/react";
import AboutTitle from "@/assets/svg/titles/ABOUT.svg?react";
import type { SocialLink } from "../../../domain/models/About";
import { useStackOnWrap } from "../../../hooks/useStackOnWrap";
import { Text } from "../../../components/ui/Text";
import { SocialLinks } from "./SocialLinks";
import { HeroModel } from "./HeroModel";

interface AboutHeroProps {
  intro: string;
  socials: SocialLink[];
}

/**
 * Title, intro and socials beside the 3D model. Once the intro would wrap
 * to 5+ lines in two columns, the hero stacks (text on top, model below —
 * like mobile).
 */
export const AboutHero = ({ intro, socials }: AboutHeroProps) => {
  const { probeRef, stacked } = useStackOnWrap({
    contentMax: 1585,
    pad: 90,
    columnGap: 250,
    maxLines: 5,
  });

  return (
    /* Fills the first screen: viewport minus the page frame's top + bottom
       padding (117+16 mobile, 190+90 desktop). */
    <section
      className={`flex min-h-[calc(100svh-133px)] w-full items-stretch lg:min-h-[calc(100svh-280px)] ${
        stacked ? "flex-col gap-12" : "flex-col gap-12 lg:flex-row lg:gap-[250px]"
      }`}
    >
      {/* Text column — title / intro / links, bottom-aligned */}
      <div
        className={`flex w-full flex-col justify-end gap-8 lg:gap-[54px] ${
          stacked ? "lg:mx-auto lg:max-w-[820px]" : "lg:min-w-0 lg:flex-1"
        }`}
      >
        <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <AboutTitle
            aria-label="hi, i'm jaden"
            role="img"
            className="h-auto w-[220px] sm:w-[280px] lg:w-[360px] 2xl:w-[480px]"
          />
        </motion.h1>

        <Text variant="lead" trim className="text-white/75">
          {intro}
        </Text>

        <SocialLinks links={socials} />
      </div>

      {/* 3D model — fills its half at full height (or full width when stacked) */}
      <div
        className={`relative overflow-hidden rounded-[10px] bg-gradient-to-b from-white/[0.06] to-white/[0.01] ring-1 ring-white/10 ${
          stacked
            ? "h-[440px] w-full sm:h-[520px] lg:mx-auto lg:h-[560px] lg:max-w-[820px]"
            : "h-[440px] w-full sm:h-[520px] lg:h-auto lg:w-auto lg:min-h-[520px] lg:min-w-0 lg:flex-1 lg:self-stretch"
        }`}
      >
        <HeroModel />
      </div>

      {/* Hidden probe: same text and type step as the intro, measured at the
          two-column width. */}
      <p
        ref={probeRef}
        aria-hidden
        className="type-lead pointer-events-none invisible fixed left-[-9999px] top-0"
      >
        {intro}
      </p>
    </section>
  );
};
