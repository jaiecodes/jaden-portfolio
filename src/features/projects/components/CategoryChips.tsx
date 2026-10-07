// src/features/projects/components/CategoryChips.tsx
import { FilterChip } from "../../../components/ui/FilterChip";
import type { Option } from "../../../domain/services/ProjectService";

interface CategoryChipsProps {
  categories: Option[];
  total: number;
  selected: string | null;
  onSelect: (category: string | null) => void;
  /** Phone labels shorten the category names. */
  short?: (category: string) => string;
  className?: string;
}

/** All plus one chip per category, each with its count. */
export const CategoryChips = ({ categories, total, selected, onSelect, short, className = "" }: CategoryChipsProps) => (
  <div role="group" aria-label="Category" className={`flex gap-2.5 ${className}`}>
    <FilterChip label="All" count={total} selected={!selected} onClick={() => onSelect(null)} />
    {categories.map((c) => (
      <FilterChip
        key={c.value}
        label={short ? short(c.value) : c.value}
        count={c.count}
        selected={selected === c.value}
        onClick={() => onSelect(selected === c.value ? null : c.value)}
      />
    ))}
  </div>
);
