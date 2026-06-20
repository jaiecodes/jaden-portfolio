// src/features/projects/ProjectPage.tsx
import { motion, AnimatePresence } from "motion/react";
import { useProjectFilters } from "../../hooks/useProjectFilters";
import { ProjectCard } from "./components/ProjectCard";
import { Input } from "../../components/ui/Input";
import { Dropdown } from "../../components/ui/Dropdown";

export const ProjectPage = () => {
  const {
    query,
    setQuery,
    category,
    setCategory,
    selectedTags,
    toggleTag,
    clearFilters,
    availableCategories,
    availableTags,
    filteredProjects,
  } = useProjectFilters();

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-6 py-32 ">
        <header className="mb-12">
          {/* Title Section with Dynamic Counter */}
          <div className="flex flex-col mb-12">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="tracking-tighter"
            >
              PROJECTS<span className="text-zinc-800">.</span>
            </motion.h1>

            <div className="flex items-center gap-4 mt-2">
              <div className="h-[1px] w-12 bg-zinc-800" />
              <h6 className="text-zinc-400 tracking-[0.2em]">
                {filteredProjects.length}{" "}
                {filteredProjects.length === 1 ? "Project" : "Projects"}{" "}
                Displayed
              </h6>
            </div>
          </div>
          {/* Search and Category Row */}
          <div className="flex flex-col md:flex-row gap-6 items-end mb-8">
            <div className="flex-1 w-full">
              <Input
                placeholder="Type to filter..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <Dropdown
              label="Category"
              options={availableCategories}
              selected={category}
              onSelect={setCategory}
            />
          </div>

          {/* Tag Pill Filtering */}
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => {
              const isActive = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`caption-btn-sm px-4 py-1.5 rounded-full transition-all border ${
                    isActive
                      ? "bg-white text-black border-white"
                      : "bg-zinc-900 text-zinc-500 border-zinc-800 hover:border-zinc-600"
                  }`}
                >
                  {tag}
                </button>
              );
            })}

            {/* Clear Filters Button */}
            <AnimatePresence>
              {(selectedTags.length > 0 || category || query) && (
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  onClick={clearFilters}
                  className="caption-btn-sm text-zinc-600 hover:text-white ml-2 ml-4 transition-colors"
                >
                  Clear Filters
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </header>

        {/* The Project Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};
