// src/components/ui/Dropdown.tsx
interface DropdownProps {
  label: string;
  options: string[];
  selected: string | null;
  onSelect: (value: string | null) => void;
}

export const Dropdown = ({
  label,
  options,
  selected,
  onSelect,
}: DropdownProps) => {
  return (
    <div className="flex flex-col gap-1.5 min-w-[160px]">
      <label className="caption-btn-sm text-zinc-500 ml-1">{label}</label>

      <select
        value={selected || ""}
        onChange={(e) => onSelect(e.target.value || null)}
        className="caption-btn bg-zinc-900/50 border border-zinc-800 text-zinc-300 px-3 py-2.5 
                   rounded-lg outline-none cursor-pointer hover:border-zinc-700
                   focus:border-zinc-600 transition-all appearance-none"
      >
        <option value="">All {label}s</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};
