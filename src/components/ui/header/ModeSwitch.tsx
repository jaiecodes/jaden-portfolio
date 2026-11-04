// src/components/ui/header/ModeSwitch.tsx
import { useScreenMode } from "../../../hooks/useScreenMode";

/** Night / Day segmented switch in the menu. */
export const ModeSwitch = ({ label }: { label: string }) => {
  const { mode, setMode } = useScreenMode();
  return (
    <div className="flex rounded-full border border-line p-1" role="radiogroup" aria-label={label}>
      {(["night", "day"] as const).map((m) => (
        <button
          key={m}
          type="button"
          role="radio"
          aria-checked={mode === m}
          onClick={() => setMode(m)}
          className={`type-button rounded-full px-4 py-2 capitalize transition-colors ${
            mode === m ? "bg-(--switch-on) text-night" : "text-muted hover:text-fg"
          }`}
        >
          {m}
        </button>
      ))}
    </div>
  );
};
