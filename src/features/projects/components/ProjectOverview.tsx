import { motion } from "motion/react";
import { Project } from "../../../domain/models/Project";

export const ProjectOverview = ({ project }: { project: Project }) => {
  const githubLink = project.externalLinks.find((l) => l.type === "github");
  const figmaLink = project.externalLinks.find((l) => l.type === "figma");

  return (
    <section className="bg-white text-black py-24 px-6 md:py-32">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
          <motion.div className="lg:col-span-2">
            <h6 className="tracking-[0.2em] text-zinc-400 mb-6">
              Project Overview
            </h6>
            <p className="text-3xl md:text-4xl leading-[1.1] tracking-tight text-zinc-900">
              {project.description}
            </p>
          </motion.div>

          <div className="space-y-10 border-l border-zinc-100 pl-8 md:pl-12">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h6 className=" uppercase text-zinc-400 mb-1">Category</h6>
                <p className="text-sm font-bold text-zinc-800">
                  {project.category}
                </p>
              </div>
              <div>
                <h6 className="uppercase text-zinc-400 mb-1">Role</h6>
                <p className="text-sm font-bold text-zinc-800">
                  {project.role}
                </p>
              </div>
            </div>

            <div>
              <h6 className="uppercase text-zinc-400 mb-3">Tools & Tech</h6>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-zinc-100 text-zinc-600 rounded-full caption-btn-sm border border-zinc-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 flex gap-6">
              {githubLink && (
                <a
                  href={githubLink.url}
                  target="_blank"
                  className="caption-btn border-b-2 border-black pb-1 hover:text-zinc-500 transition-all"
                >
                  GitHub ↗
                </a>
              )}
              {figmaLink && (
                <a
                  href={figmaLink.url}
                  target="_blank"
                  className="caption-btn border-b-2 border-black pb-1 hover:text-zinc-500 transition-all"
                >
                  Figma ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
