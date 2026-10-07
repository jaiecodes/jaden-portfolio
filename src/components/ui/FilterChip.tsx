// src/components/ui/FilterChip.tsx
import { filterChipClass } from "./buttonStyles";

interface FilterChipProps {
  label: string;
  count?: number;
  selected: boolean;
  onClick: () => void;
}

/** A toggle in a row of filters; the count dims beside the label. */
export const FilterChip = ({ label, count, selected, onClick }: FilterChipProps) => (
  <button type="button" aria-pressed={selected} onClick={onClick} className={filterChipClass(selected)}>
    {label}
    {count !== undefined && (
      <span className={`type-chip ${selected ? "opacity-80" : "text-faint"}`}>{count}</span>
    )}
  </button>
);
