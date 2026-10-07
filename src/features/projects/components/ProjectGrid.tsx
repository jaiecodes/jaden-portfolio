// src/features/projects/components/ProjectGrid.tsx
import { motion, AnimatePresence } from "motion/react";
import type { Project } from "../../../domain/models/Project";
import { ProjectCard } from "./ProjectCard";

/** 1 column on mobile up to 4 across on desktop; gaps of 61px across and
 *  75px down match the design at lg. Cards animate in and out on filter. */
export const ProjectGrid = ({ projects }: { projects: Project[] }) => (
  <motion.div
    layout
    className="grid grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-[61px] lg:gap-y-[75px]"
  >
    <AnimatePresence mode="popLayout">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </AnimatePresence>
  </motion.div>
);
