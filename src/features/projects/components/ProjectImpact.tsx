// src/features/projects/components/ProjectImpact.tsx
import { motion } from "motion/react";

interface ProjectImpactProps {
  challenges: string;
  impact: string;
}

export const ProjectImpact = ({ challenges, impact }: ProjectImpactProps) => {
  return (
    <section className="py-40 bg-black flex items-center justify-center border-t border-zinc-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl text-center px-6"
      >
        <h6 className="tracking-[0.2em] text-zinc-300 mb-10">Final Impact</h6>
        <h3 className="text-red-500 mb-6 italic">{impact}</h3>
        <p className="body-primary text-zinc-400">
          Technical Challenge: {challenges}
        </p>
      </motion.div>
    </section>
  );
};
