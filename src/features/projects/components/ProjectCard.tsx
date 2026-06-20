// src/features/projects/components/ProjectCard.tsx
import { motion } from "motion/react";
import { Link, useLocation } from "react-router-dom"; // Add useLocation
import { Project } from "../../../domain/models/Project";
import { Badge } from "../../../components/ui/Badge";

export const ProjectCard = ({ project }: { project: Project }) => {
  const location = useLocation(); // Captures the current filter state from the URL

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8 }}
      className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden flex flex-col h-full group"
    >
      {/* Updated Link to include 'search' */}
      <Link
        to={{
          pathname: `/project/${project.id}`,
          search: location.search, // Persists your active filters to the detail page
        }}
        className="flex flex-col h-full"
      >
        <div className="aspect-video overflow-hidden bg-zinc-800 relative">
          <img
            src={project.media[0]}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            alt={project.name}
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <h6 className="tracking-widest bg-black/60 px-4 py-2 rounded-full backdrop-blur-md">
              View Project
            </h6>
          </div>
        </div>

        <div className="p-5 flex flex-col flex-1">
          <div className="flex justify-between items-start mb-2">
            <h5 className="text-white">{project.name}</h5>
            <h6 className="text-zinc-600 ">{project.year.toString()}</h6>
          </div>

          <p className="body-secondary text-zinc-500 mb-4 line-clamp-2 leading-relaxed">
            {project.description}
          </p>

          <div className="mt-auto flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
