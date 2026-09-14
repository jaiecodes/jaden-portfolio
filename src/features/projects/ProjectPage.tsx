// src/features/projects/ProjectPage.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useProjectFilters } from "../../hooks/useProjectFilters";
import { ProjectCard } from "./components/ProjectCard";
import { SearchBar } from "./components/SearchBar";

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

  // FILTERS reveals the tech-tag multi-select. Start open if tags are already
  // active (e.g. arriving on a bookmarked ?tag= URL) so they aren't hidden.
  const [showFilters, setShowFilters] = useState(selectedTags.length > 0);

  const hasActiveFilters =
    selectedTags.length > 0 || Boolean(category) || Boolean(query);

  const categoryButton = (isActive: boolean) =>
    `flex h-9 shrink-0 items-center justify-center whitespace-nowrap rounded-[10px] px-4 text-sm uppercase tracking-normal transition-colors lg:h-[60px] lg:px-[30px] lg:text-[28px] ${
      isActive
        ? "bg-accent font-bold text-ink"
        : "font-medium text-white outline outline-1 -outline-offset-1 outline-white/50 hover:text-accent hover:outline-accent/50"
    }`;

  // FILTERS pill — rendered on the CATEGORIES line on mobile and in the sort
  // row on desktop, so `visibility` toggles which copy shows at each breakpoint.
  const filtersButton = (visibility: string) => (
    <button
      type="button"
      onClick={() => setShowFilters((v) => !v)}
      aria-pressed={showFilters}
      aria-expanded={showFilters}
      className={`h-9 shrink-0 items-center justify-center whitespace-nowrap rounded-[29px] px-4 text-sm font-medium uppercase tracking-normal outline outline-2 -outline-offset-2 transition-colors lg:h-[60px] lg:px-[30px] lg:text-[28px] ${
        showFilters
          ? "bg-accent/10 text-accent outline-accent"
          : "text-white outline-white/50 hover:outline-white"
      } ${visibility}`}
    >
      Filters
    </button>
  );

  return (
    <div className="min-h-screen bg-black">
      {/* 17px padding all round on mobile, 90px on desktop; the extra top
          offset clears the fixed 100px Header. max-w lets 4 cards reach 360px. */}
      <div className="mx-auto flex w-full max-w-[1800px] flex-col gap-[26px] px-[17px] pt-[117px] pb-[17px] lg:gap-[33px] lg:px-[90px] lg:pt-[170px] lg:pb-[90px]">
        {/* Title (+ search on desktop) */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            /* inline-block so the gradient box hugs the text (0% at P, 100% at
               S). -0.085em left margin trims the "P" side bearing so the glyph
               ink — not the text box — starts flush with the container edge. */
            className="text-gradient -ml-[0.085em] inline-block self-start text-[44px] tracking-tighter bg-[image:var(--paint-title)] lg:text-[96px]"
          >
            PROJECTS
          </motion.h1>

          {/* Desktop-only search, beside the title */}
          <SearchBar
            value={query}
            onChange={setQuery}
            className="hidden h-[60px] w-full max-w-[660px] lg:flex"
          />
        </div>

        {/* Mobile-only search — thinner, above the categories */}
        <SearchBar
          value={query}
          onChange={setQuery}
          className="flex h-11 w-full lg:hidden"
        />

        {/* CATEGORIES label — FILTERS shares this line on mobile (avoids a
            standalone row); on desktop it moves to the sort row instead. */}
        <div className="flex items-center justify-between gap-4">
          <p className="text-base font-bold uppercase tracking-normal text-secondary/75 lg:text-[2rem]">
            Categories
          </p>
          {filtersButton("flex lg:hidden")}
        </div>

        {/* Sort row: categories scroll horizontally; FILTERS trails them. */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
          {/* Horizontal scroll rail — always scrollable, so it degrades
              gracefully from the 4-across desktop row to a mobile swipe strip. */}
          <div className="no-scrollbar fade-edges-x -mx-[17px] flex min-w-0 items-center gap-3 overflow-x-auto px-[17px] lg:mx-0 lg:flex-1 lg:gap-[40px] lg:px-0">
            {availableCategories.map((cat) => {
              const isActive = category === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setCategory(isActive ? null : cat)}
                  aria-pressed={isActive}
                  className={categoryButton(isActive)}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* FILTERS pill — desktop only; on mobile it lives on the label line */}
          {filtersButton("hidden lg:flex")}
        </div>

        {/* Revealed tech-tag multi-select */}
        <AnimatePresence initial={false}>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap items-center gap-2">
                {availableTags.map((tag) => {
                  const isActive = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      aria-pressed={isActive}
                      className={`caption-btn-sm rounded-full border px-4 py-1.5 transition-all ${
                        isActive
                          ? "border-accent bg-accent/15 text-accent"
                          : "border-zinc-800 bg-zinc-900 text-zinc-500 hover:border-zinc-600"
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}

                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="caption-btn-sm ml-2 text-zinc-600 transition-colors hover:text-white"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* The Project Grid — 1 col on mobile up to 4 across on desktop.
            Row gaps 61px across / 75px down match the design at lg. */}
        <motion.div
          layout
          className="grid grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-[61px] lg:gap-y-[75px]"
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
