// src/features/projects/components/SearchField.tsx
import { Icon } from "../../../components/ui/Icon";

interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  className?: string;
}

/** Search by name, category or tech. */
export const SearchField = ({ value, onChange, placeholder, className = "" }: SearchFieldProps) => (
  <label
    className={`flex h-[50px] items-center gap-2.5 rounded-[10px] border border-line bg-raised px-5 text-faint focus-within:border-t-primary/60 ${className}`}
  >
    <Icon name="search" size={18} />
    <span className="sr-only">Search projects</span>
    <input
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="type-body-sm w-full min-w-0 bg-transparent text-fg outline-none placeholder:text-faint"
    />
  </label>
);
