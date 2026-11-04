// src/components/ui/header/NavUnderline.tsx
import { motion } from "motion/react";

/** The original nav underline, shown under the current page. */
export const NavUnderline = ({ show }: { show: boolean }) => (
  <motion.span
    aria-hidden
    className="mt-1 block h-[2px] bg-[image:var(--paint-underline)] shadow-[0_-2px_6.5px_rgb(255_255_255/0.2)]"
    initial={false}
    animate={{ opacity: show ? 1 : 0, scaleX: show ? 1 : 0 }}
    transition={{ duration: 0.4, ease: "easeInOut" }}
  />
);
