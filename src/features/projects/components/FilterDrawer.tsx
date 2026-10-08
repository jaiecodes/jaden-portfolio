// src/features/projects/components/FilterDrawer.tsx
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ProjectService } from "../../../domain/services/ProjectService";
import { SORT_LABELS, type ProjectQuery, type ProjectSort } from "../../../domain/models/Project";
import { FilterChip } from "../../../components/ui/FilterChip";
import { Button } from "../../../components/ui/Button";
import { Icon } from "../../../components/ui/Icon";
import { useViewport } from "../../../hooks/useViewport";

interface FilterDrawerProps {
  open: boolean;
  query: ProjectQuery;
  onApply: (next: ProjectQuery) => void;
  onClose: () => void;
}

const toggle = <T,>(list: T[], v: T) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

const Group = ({ label, children }: { label: string; children: ReactNode }) => (
  <fieldset className="flex flex-col gap-3">
    <legend className="type-label mb-3 text-t-primary">{label}</legend>
    <div className="flex flex-wrap gap-2">{children}</div>
  </fieldset>
);

/** The panel's content; mounted fresh each time it opens, so the draft starts from the current query. */
const Panel = ({ query, onApply, onClose }: Omit<FilterDrawerProps, "open">) => {
  const [draft, setDraft] = useState<ProjectQuery>(query);
  const matches = ProjectService.find(draft).length;
  const total = ProjectService.count();
  const set = (patch: Partial<ProjectQuery>) => setDraft((d) => ({ ...d, ...patch }));

  return (
    <>
      <div className="flex items-start justify-between px-6 pt-8 lg:px-8 lg:pt-10">
        <div>
          <h2 className="type-h2 text-fg">Filters</h2>
          <p className="type-body mt-1 text-muted" aria-live="polite">
            {matches} of {total} projects match
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close filters"
          className="flex size-11 items-center justify-center rounded-[10px] border border-line text-fg"
        >
          <Icon name="close" size={20} />
        </button>
      </div>

      <div className="no-scrollbar flex flex-1 flex-col gap-7 overflow-y-auto px-6 py-8 lg:px-8">
        <Group label="Category">
          <FilterChip label="All" count={total} selected={!draft.category} onClick={() => set({ category: null })} />
          {ProjectService.getCategories().map((c) => (
            <FilterChip
              key={c.value}
              label={c.value}
              count={c.count}
              selected={draft.category === c.value}
              onClick={() => set({ category: draft.category === c.value ? null : c.value })}
            />
          ))}
        </Group>
        <Group label="Tech">
          {ProjectService.getTech().map((t) => (
            <FilterChip
              key={t.value}
              label={t.value}
              count={t.count}
              selected={draft.tech.includes(t.value)}
              onClick={() => set({ tech: toggle(draft.tech, t.value) })}
            />
          ))}
        </Group>
        <Group label="Year">
          {ProjectService.getYears().map((y) => (
            <FilterChip
              key={y.value}
              label={String(y.value)}
              count={y.count}
              selected={draft.years.includes(y.value)}
              onClick={() => set({ years: toggle(draft.years, y.value) })}
            />
          ))}
        </Group>
        <Group label="Sort by">
          {(Object.keys(SORT_LABELS) as ProjectSort[]).map((s) => (
            <FilterChip key={s} label={SORT_LABELS[s]} selected={draft.sort === s} onClick={() => set({ sort: s })} />
          ))}
        </Group>
      </div>

      <div className="flex gap-3 border-t border-line px-6 pt-5 pb-[calc(20px+env(safe-area-inset-bottom))] lg:px-8 lg:py-6">
        <Button onClick={() => setDraft({ ...draft, category: null, tech: [], years: [], sort: "newest" })}>
          Clear all
        </Button>
        <Button variant="primary" className="flex-1" onClick={() => onApply(draft)}>
          Show {matches} {matches === 1 ? "project" : "projects"}
        </Button>
      </div>
    </>
  );
};

/**
 * Filters (tech, year, sort) beyond the category chips. Desktop: a glass
 * drawer from the right. Phone: a bottom sheet you can drag down to dismiss.
 * Esc and the backdrop close it without applying.
 */
export const FilterDrawer = ({ open, query, onApply, onClose }: FilterDrawerProps) => {
  const { width } = useViewport();
  const desktop = width >= 1024;
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    panel.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[250]">
          <motion.button
            type="button"
            tabIndex={-1}
            aria-label="Close filters"
            onClick={onClose}
            className="absolute inset-0 bg-[rgb(4_10_10/0.62)] backdrop-blur-[6px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            ref={panel}
            tabIndex={-1}
            role="dialog"
            aria-modal
            aria-label="Filters"
            // Anchored right and full height on desktop, to the bottom on phones.
            className={
              desktop
                ? "absolute inset-y-0 right-0 w-[560px] max-w-full shadow-[-20px_0_60px_rgb(0_0_0/0.5)] outline-none"
                : "absolute inset-x-0 bottom-0 h-[700px] max-h-[88vh] rounded-t-[24px] shadow-[0_-16px_40px_rgb(0_0_0/0.35)] outline-none"
            }
            initial={desktop ? { x: "100%" } : { y: "100%" }}
            animate={desktop ? { x: 0 } : { y: 0 }}
            exit={desktop ? { x: "100%" } : { y: "100%" }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            drag={desktop ? false : "y"}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={(_, info) => info.offset.y > 120 && onClose()}
          >
            {/* The glass and its angular rim (on the edge facing the page) */}
            <div
              className={`stroke stroke-angular flex h-full flex-col bg-[color-mix(in_srgb,var(--night-raised)_60%,transparent)] backdrop-blur-[32px] ${desktop ? "" : "rounded-t-[24px]"}`}
              style={desktop ? ({ "--s-left": "1px" } as CSSProperties) : ({ "--s-top": "1px" } as CSSProperties)}
            >
              {!desktop && <div aria-hidden className="mx-auto mt-2.5 h-[5px] w-10 shrink-0 rounded-full bg-muted/60" />}
              <Panel query={query} onApply={onApply} onClose={onClose} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
