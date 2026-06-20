import { motion, useScroll, useTransform } from "motion/react";
import type { ExternalLink } from "../../domain/models/Project";

export const ExternalLinksBar = ({ links }: { links: ExternalLink[] }) => {
  const { scrollY } = useScroll();

  // Fades in after the Hero section (adjust 1200 based on your h-[250vh] Hero)
  const barOpacity = useTransform(scrollY, [2400, 3200], [0, 1]);
  const barX = useTransform(scrollY, [2400, 3200], [20, 0]);

  if (!links || links.length === 0) return null;

  return (
    <motion.div
      style={{ opacity: barOpacity, x: barX }}
      className="fixed right-8 top-1/2 -translate-y-1/2 z-[100] hidden lg:flex flex-col items-center gap-6"
    >
      <div className="w-[1px] h-12 bg-zinc-800" />

      {links.map((link, i) => (
        <a
          key={i}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-500 hover:text-white transition-colors duration-300 p-2"
          title={link.label || link.type}
        >
          {link.type === "github" && (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          )}
          {link.type === "figma" && (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"></path>
              <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"></path>
              <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"></path>
              <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"></path>
              <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"></path>
            </svg>
          )}
          {link.type === "external" && (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          )}
        </a>
      ))}

      <div className="w-[1px] h-12 bg-zinc-800" />
    </motion.div>
  );
};
