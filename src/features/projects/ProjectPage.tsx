// src/features/projects/ProjectPage.tsx
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { PageFrame } from "../../components/ui/PageFrame";
import { Button } from "../../components/ui/Button";
import { Icon } from "../../components/ui/Icon";
import { ProjectService } from "../../domain/services/ProjectService";
import { SORT_LABELS, shortCategory, type ProjectSort } from "../../domain/models/Project";
import { useProjectFilters } from "../../hooks/useProjectFilters";
import { useViewport } from "../../hooks/useViewport";
import { CategoryChips } from "./components/CategoryChips";
import { FilterDrawer } from "./components/FilterDrawer";
import { MobileProjectCard } from "./components/MobileProjectCard";
import { PlayerCard } from "./components/PlayerCard";
import { SearchField } from "./components/SearchField";

const SORT_CYCLE: ProjectSort[] = ["newest", "oldest", "az"];

const FiltersButton = ({ active, onClick }: { active: number; onClick: () => void }) => (
  <Button onClick={onClick} aria-haspopup="dialog" className="pr-[22px] pl-5">
    <Icon name="filters" size={20} />
    Filters
    {active > 0 && (
      <span className="type-chip flex size-6 items-center justify-center rounded-full bg-t-primary text-t-on-primary">
        {active}
      </span>
    )}
  </Button>
);

/** The project gallery (Figma: Projects — Desktop 2.0 / Mobile 2.0). */
export const ProjectPage = () => {
  const f = useProjectFilters();
  const { search } = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { width } = useViewport();
  const categories = ProjectService.getCategories();
  const nextSort = SORT_CYCLE[(SORT_CYCLE.indexOf(f.sort) + 1) % SORT_CYCLE.length];

  return (
    <PageFrame theme="projects" fixedFireflies>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <h1 className="type-h1 text-gradient bg-[image:var(--theme-title)] pb-1 lg:uppercase">Projects</h1>
        <div className="flex gap-3">
          <SearchField
            value={f.query}
            onChange={f.setQuery}
            placeholder={width >= 1024 ? "Search projects or tech (e.g. Unreal)" : "Search"}
            className="flex-1 lg:w-[400px] lg:flex-none"
          />
          <div className="hidden lg:block">
            <Button onClick={() => f.setSort(nextSort)} title={`Sort: ${SORT_LABELS[nextSort]} next`}>
              {SORT_LABELS[f.sort]} <Icon name="arrowDown" size={18} className={f.sort === "oldest" ? "rotate-180" : ""} />
            </Button>
          </div>
          <FiltersButton active={f.activeCount} onClick={() => setDrawerOpen(true)} />
        </div>
      </div>

      <CategoryChips
        categories={categories}
        total={f.total}
        selected={f.category}
        onSelect={f.setCategory}
        className="mt-10 hidden flex-wrap lg:flex"
      />
      <div className="fade-right no-scrollbar -mr-5 mt-4 overflow-x-auto pr-5 lg:hidden">
        <CategoryChips
          categories={categories}
          total={f.total}
          selected={f.category}
          onSelect={f.setCategory}
          short={shortCategory}
          className="w-max pr-6"
        />
      </div>

      {f.projects.length === 0 ? (
        <div className="mt-16 flex flex-col items-start gap-4">
          <p className="type-lead text-muted">No projects match those filters.</p>
          <Button onClick={f.clear}>Clear filters</Button>
        </div>
      ) : (
        <>
          <ul className="mt-12 hidden grid-cols-[repeat(auto-fill,minmax(300px,360px))] justify-between gap-x-10 gap-y-16 md:grid">
            {f.projects.map((p) => (
              <li key={p.id} className="flex justify-center">
                <PlayerCard project={p} search={search} />
              </li>
            ))}
          </ul>
          <ul className="mt-4 flex flex-col gap-4 md:hidden">
            {f.projects.map((p) => (
              <li key={p.id}>
                <MobileProjectCard project={p} search={search} />
              </li>
            ))}
          </ul>
        </>
      )}

      <FilterDrawer
        open={drawerOpen}
        query={f}
        onApply={(q) => {
          f.apply(q);
          setDrawerOpen(false);
        }}
        onClose={() => setDrawerOpen(false)}
      />
    </PageFrame>
  );
};
