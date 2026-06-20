import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Project } from "../../../domain/models/Project";

interface NextProjectProps {
  project: Project;
  currentSearch: string;
}

export const NextProject = ({ project, currentSearch }: NextProjectProps) => {
  return (
    <footer className="border-t border-zinc-900 bg-black overflow-hidden">
      <Link
        to={{
          pathname: `/project/${project.id}`,
          search: currentSearch,
        }}
        className="group block py-48 px-6 text-center hover:bg-zinc-900 transition-colors duration-1000"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h6 className="text-zinc-500 group-hover:text-red-500 tracking-[0.2em] mb-6 transition-colors">
            Up Next
          </h6>
          <h1 className=" text-white group-hover:scale-105 transition-transform duration-700">
            {project.name} <span className="text-zinc-800">→</span>
          </h1>
        </motion.div>
      </Link>
    </footer>
  );
};
