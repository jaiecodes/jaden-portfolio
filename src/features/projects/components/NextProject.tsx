// src/features/projects/components/NextProject.tsx
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Project } from "../../../domain/models/Project";
import { Text } from "../../../components/ui/Text";

interface NextProjectProps {
  project: Project;
  currentSearch: string;
}

/** The next project in the (filtered) sequence, as one big link. */
export const NextProject = ({ project, currentSearch }: NextProjectProps) => (
  <footer className="overflow-hidden border-t border-white/10">
    <Link
      to={{ pathname: `/project/${project.id}`, search: currentSearch }}
      className="group block px-[17px] py-[120px] text-center no-underline lg:px-[90px] lg:py-[200px]"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col items-center gap-5 lg:gap-7"
      >
        <Text variant="overline" className="text-theme">
          Up Next
        </Text>
        <Text
          variant="display"
          as="h2"
          className="text-white transition-transform duration-700 group-hover:scale-105"
        >
          {project.name} →
        </Text>
      </motion.div>
    </Link>
  </footer>
);
