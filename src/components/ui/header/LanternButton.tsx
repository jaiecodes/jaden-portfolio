// src/components/ui/header/LanternButton.tsx
import { useScreenMode } from "../../../hooks/useScreenMode";
import { LanternIcon } from "../LanternIcon";

/** The screen-mode switch: lighting the lantern turns the garden to day. */
export const LanternButton = ({ className = "" }: { className?: string }) => {
  const { day, toggle } = useScreenMode();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={day}
      aria-label={day ? "Switch to night mode" : "Switch to day mode"}
      title={day ? "Night mode" : "Day mode"}
      className={`flex size-11 items-center justify-center rounded-full transition-transform hover:scale-110 ${className}`}
    >
      <LanternIcon size={26} />
    </button>
  );
};
