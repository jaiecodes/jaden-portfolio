// src/features/projects/components/SearchBar.tsx
import { useId } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  /** Display + width utilities from the caller (it sits in two places). */
  className?: string;
}

/**
 * Accent-15% -> Secondary-15% wash search field with a gradient magnifier.
 * Rendered twice on the page — beside the title on desktop, full-width below
 * the categories on mobile — so the gradient id is unique per instance.
 */
export const SearchBar = ({ value, onChange, className = "" }: SearchBarProps) => {
  const gradientId = useId();

  return (
    <label
      className={`relative items-center gap-2.5 rounded-[10px] px-3 ${className}`}
      style={{
        backgroundImage: "var(--paint-search)",
        outline: "1px solid var(--paint-accent-soft)",
        outlineOffset: "-1px",
      }}
    >
      <span className="sr-only">Search projects</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search projects..."
        className="body-secondary min-w-0 flex-1 bg-transparent text-white placeholder-white/40 outline-none"
      />
      <svg
        width="28"
        height="28"
        viewBox="0 0 37 37"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.6 16.1C4.6 13.05 5.81161 10.1249 7.96827 7.96827C10.1249 5.8116 13.05 4.6 16.1 4.6C19.15 4.6 22.0751 5.8116 24.2317 7.96827C26.3884 10.1249 27.6 13.05 27.6 16.1C27.6 19.15 26.3884 22.0751 24.2317 24.2317C22.0751 26.3884 19.15 27.6 16.1 27.6C13.05 27.6 10.1249 26.3884 7.96827 24.2317C5.81161 22.0751 4.6 19.15 4.6 16.1ZM16.1 0C13.5489 0 11.0344 0.606217 8.76354 1.76869C6.49272 2.93117 4.53064 4.61662 3.039 6.68616C1.54736 8.7557 0.568862 11.1501 0.184138 13.672C-0.200586 16.1939 0.0194802 18.7711 0.826201 21.1913C1.63292 23.6114 3.0032 25.8052 4.82412 27.5919C6.64504 29.3786 8.86447 30.707 11.2995 31.4677C13.7345 32.2283 16.3155 32.3994 18.8296 31.9669C21.3438 31.5344 23.7191 30.5106 25.76 28.98C25.8254 29.067 25.8969 29.1492 25.9739 29.2261L32.8739 36.1261C33.3077 36.5451 33.8887 36.7769 34.4917 36.7717C35.0948 36.7664 35.6716 36.5245 36.0981 36.0981C36.5245 35.6716 36.7664 35.0948 36.7717 34.4917C36.7769 33.8887 36.5451 33.3077 36.1261 32.8739L29.2261 25.9739C29.1492 25.8969 29.067 25.8254 28.98 25.76C30.774 23.368 31.8664 20.5238 32.1349 17.5459C32.4035 14.568 31.8374 11.5742 30.5003 8.89986C29.1631 6.22556 27.1077 3.97644 24.5643 2.40452C22.0209 0.832606 19.09 0 16.1 0Z"
          fill={`url(#${gradientId})`}
        />
        <defs>
          <linearGradient
            id={gradientId}
            x1="0"
            y1="18.3859"
            x2="36.7717"
            y2="18.3859"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#EFC139" />
            <stop offset="0.9999" stopColor="#DD8B2D" />
          </linearGradient>
        </defs>
      </svg>
    </label>
  );
};
