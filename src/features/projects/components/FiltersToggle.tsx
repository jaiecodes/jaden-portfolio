// src/features/projects/components/FiltersToggle.tsx
import { Button } from "../../../components/ui/Button";

interface FiltersToggleProps {
  open: boolean;
  onToggle: () => void;
  /** Visibility per breakpoint (the page renders one copy for mobile, one
   *  for desktop). Applied to a wrapper so it never fights the button's own
   *  display class. */
  className?: string;
}

/** The FILTERS pill that reveals the tech-tag multi-select. */
export const FiltersToggle = ({ open, onToggle, className = "" }: FiltersToggleProps) => (
  <div className={`shrink-0 ${className}`}>
    <Button variant="pill" active={open} aria-expanded={open} onClick={onToggle}>
      Filters
    </Button>
  </div>
);
