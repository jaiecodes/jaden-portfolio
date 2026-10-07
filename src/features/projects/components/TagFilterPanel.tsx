// src/features/projects/components/TagFilterPanel.tsx
import { motion, AnimatePresence } from "motion/react";

interface TagFilterPanelProps {
  open: boolean;
  tags: string[];
  selected: string[];
  onToggle: (tag: string) => void;
  /** Shows "Clear Filters" when any filter (tag, category, search) is set. */
  canClear: boolean;
  onClear: () => void;
}

/** Collapsible multi-select of tech tags, revealed by the FILTERS pill. */
export const TagFilterPanel = ({
  open,
  tags,
  selected,
  onToggle,
  canClear,
  onClear,
}: TagFilterPanelProps) => (
  <AnimatePresence initial={false}>
    {open && (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        className="overflow-hidden"
      >
        <div className="flex flex-wrap items-center gap-2">
          {tags.map((tag) => {
            const isActive = selected.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => onToggle(tag)}
                aria-pressed={isActive}
                className={`type-tag rounded-full border px-4 py-1.5 transition-all ${
                  isActive
                    ? "border-theme bg-theme/15 text-theme"
                    : "border-zinc-800 bg-zinc-900 text-zinc-500 hover:border-zinc-600"
                }`}
              >
                {tag}
              </button>
            );
          })}

          {canClear && (
            <button
              type="button"
              onClick={onClear}
              className="type-tag ml-2 text-zinc-600 transition-colors hover:text-white"
            >
              Clear Filters
            </button>
          )}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);
