// src/features/projects/components/ProjectCard.tsx
import { motion } from "motion/react";
import { Link, useLocation } from "react-router-dom";
import { Project } from "../../../domain/models/Project";
import { GradientIcon } from "../../../components/ui/GradientIcon";
import { strokeStyle } from "../../../components/ui/stroke";
import { ProjectTagGrid } from "./ProjectTagGrid";

export const ProjectCard = ({ project }: { project: Project }) => {
  const location = useLocation(); // Captures the current filter state from the URL

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8 }}
      /* Angular rim on all four sides, then 6px of clear padding.
         360 - 2 * (3 + 6) = 342, the content width the design is drawn to. */
      style={strokeStyle({ stroke: 3, pad: 6 })}
      className="stroke stroke-angular group flex h-[510px] w-full max-w-[360px] rounded-[10px] shadow-[0_1px_12px_rgba(239,193,57,0.5)]"
    >
      <Link
        to={{
          pathname: `/project/${project.id}`,
          search: location.search, // Persists your active filters to the detail page
        }}
        className="flex flex-1 flex-col rounded-[1px] bg-secondary/5"
      >
        {/* Dark panel */}
        <div className="flex min-h-0 flex-1 flex-col items-center overflow-hidden rounded-t-[1px] rounded-b-[5px] bg-ink">
          <span
            aria-hidden
            className="h-2.5 w-full shrink-0 rounded-t-[1px] bg-accent"
          />

          <div className="flex w-full min-h-0 flex-1 flex-col items-center justify-between overflow-hidden p-2">
            <p className="card-year w-full text-right">
              {project.year.toString()}
            </p>

            <GradientIcon
              src={project.iconUrl}
              label={`${project.name} icon`}
              size={90}
              className="transition-transform duration-500 group-hover:scale-105"
            />

            <h5 className="card-title">{project.name}</h5>

            <p
              className="w-full px-5 py-[11px] shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]"
              style={{ background: "var(--paint-warm-wash)" }}
            >
              <span className="card-description mx-auto block max-h-[90px] max-w-[290px] overflow-hidden line-clamp-4">
                {project.description}
              </span>
            </p>
          </div>

          <span
            aria-hidden
            className="h-[5px] w-full shrink-0 rounded-b-[5px] bg-accent/50"
          />
        </div>

        <ProjectTagGrid tags={project.tags} />
      </Link>
    </motion.article>
  );
};
