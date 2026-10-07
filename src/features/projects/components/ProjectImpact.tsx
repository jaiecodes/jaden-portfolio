// src/features/projects/components/ProjectImpact.tsx
import { motion } from "motion/react";
import { Text } from "../../../components/ui/Text";

interface ProjectImpactProps {
  challenges: string;
  impact: string;
}

/** "Technical challenge: synchronizing…" — the challenge read as one sentence. */
const asChallenge = (text: string) =>
  `Technical challenge: ${text.charAt(0).toLowerCase()}${text.slice(1)}`;

/** The outcome as a centred statement in the theme colour, challenge beneath. */
export const ProjectImpact = ({ challenges, impact }: ProjectImpactProps) => (
  <section className="border-t border-white/10 px-[17px] py-24 lg:px-[90px] lg:py-40">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="mx-auto flex max-w-[1100px] flex-col items-center gap-6 text-center lg:gap-8"
    >
      <Text variant="overline" as="h2" className="text-body/60">
        Final Impact
      </Text>
      <Text variant="h1" as="p" className="text-theme">
        {impact}
      </Text>
      <Text variant="body" className="max-w-[820px] text-body">
        {asChallenge(challenges)}
      </Text>
    </motion.div>
  </section>
);
