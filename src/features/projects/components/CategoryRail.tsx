// src/features/projects/components/CategoryRail.tsx
import { Button } from "../../../components/ui/Button";

interface CategoryRailProps {
  categories: string[];
  active: string | null;
  /** Called with the category, or null when the active one is clicked again. */
  onSelect: (category: string | null) => void;
}

/**
 * Category toggles on a horizontal scroll rail — always scrollable, so it
 * degrades from the 4-across desktop row to a mobile swipe strip. On mobile
 * it bleeds into the page gutters and fades at the edges.
 */
export const CategoryRail = ({ categories, active, onSelect }: CategoryRailProps) => (
  <div className="no-scrollbar fade-edges-x -mx-[17px] flex min-w-0 items-center gap-3 overflow-x-auto px-[17px] lg:mx-0 lg:flex-1 lg:gap-[40px] lg:px-0">
    {categories.map((cat) => {
      const isActive = active === cat;
      return (
        <Button
          key={cat}
          variant="chip"
          active={isActive}
          onClick={() => onSelect(isActive ? null : cat)}
        >
          {cat}
        </Button>
      );
    })}
  </div>
);
