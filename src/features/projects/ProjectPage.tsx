// src/features/projects/ProjectPage.tsx
import { useState } from "react";
import { motion } from "motion/react";
import ProjectsTitle from "@/assets/svg/titles/PROJECTS.svg?react";
import { useProjectFilters } from "../../hooks/useProjectFilters";
import { PageFrame } from "../../components/ui/PageFrame";
import { Text } from "../../components/ui/Text";
import { SearchBar } from "./components/SearchBar";
import { CategoryRail } from "./components/CategoryRail";
import { FiltersToggle } from "./components/FiltersToggle";
import { TagFilterPanel } from "./components/TagFilterPanel";
import { ProjectGrid } from "./components/ProjectGrid";

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
  const toggleFilters = () => setShowFilters((v) => !v);

  const hasActiveFilters =
    selectedTags.length > 0 || Boolean(category) || Boolean(query);

  return (
    <PageFrame theme="projects" className="gap-[26px] lg:gap-[33px]">
      {/* Title (+ search on desktop) */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <ProjectsTitle
            aria-label="Projects"
            role="img"
            className="h-auto w-[240px] sm:w-[280px] lg:w-[300px] 2xl:w-[414px]"
          />
        </motion.h1>

        {/* Desktop-only search, beside the title */}
        <SearchBar
          value={query}
          onChange={setQuery}
          className="hidden h-[60px] w-full max-w-[660px] lg:flex"
        />
      </div>

      {/* Mobile-only search — thinner, above the categories */}
      <SearchBar value={query} onChange={setQuery} className="flex h-11 w-full lg:hidden" />

      {/* CATEGORIES label — FILTERS shares this line on mobile (avoids a
          standalone row); on desktop it moves to the sort row instead. */}
      <div className="flex items-center justify-between gap-4">
        <Text variant="h2" as="p" className="text-secondary/75">
          Categories
        </Text>
        <FiltersToggle open={showFilters} onToggle={toggleFilters} className="lg:hidden" />
      </div>

      {/* Sort row: categories scroll horizontally; FILTERS trails them. */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
        <CategoryRail
          categories={availableCategories}
          active={category}
          onSelect={setCategory}
        />
        <FiltersToggle
          open={showFilters}
          onToggle={toggleFilters}
          className="hidden lg:block"
        />
      </div>

      <TagFilterPanel
        open={showFilters}
        tags={availableTags}
        selected={selectedTags}
        onToggle={toggleTag}
        canClear={hasActiveFilters}
        onClear={clearFilters}
      />

      <ProjectGrid projects={filteredProjects} />
    </PageFrame>
  );
};
