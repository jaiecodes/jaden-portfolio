// src/features/projects/components/BackToGallery.tsx
import { useLocation, useNavigate } from "react-router-dom";

/** Floating "Exit to Gallery" button on a project page. Returns to the
 *  gallery with the same filters the visitor arrived with. Icon-only in the
 *  bottom corner on small screens, where the top is taken by the hero title. */
export const BackToGallery = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate({ pathname: "/", search: location.search })}
      aria-label="Exit to gallery"
      className="group fixed right-[17px] bottom-6 z-[110] flex items-center gap-4 rounded-full border border-white/5 bg-zinc-900/50 p-2 backdrop-blur-xl transition-all duration-700 hover:bg-white hover:text-black lg:top-32 lg:right-10 lg:bottom-auto lg:pr-8"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-colors group-hover:bg-black/10">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          aria-hidden
        >
          <path d="M19 12H5m7 7l-7-7 7-7" />
        </svg>
      </span>
      <span className="type-overline hidden lg:inline">Exit to Gallery</span>
    </button>
  );
};
