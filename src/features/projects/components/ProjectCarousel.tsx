// src/features/projects/components/ProjectCarousel.tsx
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import type { ProjectImage } from "../../../domain/models/Project";
import { Text } from "../../../components/ui/Text";

interface CarouselProps {
  images: ProjectImage[]; // Updated Prop Type
  isOpen: boolean;
  initialIndex: number;
  onClose: () => void;
}

export const ProjectCarousel = ({
  images,
  isOpen,
  initialIndex,
  onClose,
}: CarouselProps) => {
  const [index, setIndex] = useState(initialIndex);

  // Reset to the clicked image whenever the carousel opens (or the target
  // index changes while open). Adjusting state during render rather than in an
  // effect: React re-renders immediately without committing the stale frame,
  // so there is no cascading-render round-trip. See "You Might Not Need an
  // Effect" — storing information from previous renders.
  const [sync, setSync] = useState({ isOpen, initialIndex });
  if (sync.isOpen !== isOpen || sync.initialIndex !== initialIndex) {
    setSync({ isOpen, initialIndex });
    if (isOpen) setIndex(initialIndex);
  }

  // Lock body scroll while the overlay is open (external-system sync).
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          // --- Black Translucent & Blurred Background ---
          className="fixed inset-0 z-[999] bg-black/85 backdrop-blur-xl flex items-center justify-center"
        >
          {/* Backdrop Click (to close) */}
          <div className="absolute inset-0 cursor-zoom-out" onClick={onClose} />

          {/* --- "X" Exit Button --- */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-10 right-10 z-50 text-white hover:scale-125 transition-transform"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Navigation Controls */}
          <div className="absolute inset-x-10 flex justify-between z-10 pointer-events-none text-white/50">
            <button
              aria-label="Previous image"
              className="type-h2 pointer-events-auto hover:text-white"
              onClick={() =>
                setIndex((i) => (i > 0 ? i - 1 : images.length - 1))
              }
            >
              ←
            </button>
            <button
              aria-label="Next image"
              className="type-h2 pointer-events-auto hover:text-white"
              onClick={() =>
                setIndex((i) => (i < images.length - 1 ? i + 1 : 0))
              }
            >
              →
            </button>
          </div>

          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="relative z-20 max-w-7xl px-20 flex flex-col items-center"
          >
            {/* --- Full Resolution (Not 1:1) Image --- */}
            {/* max-h-[70vh] ensures it fits on the screen vertically */}
            <img
              src={images[index].url}
              className="max-h-[70vh] w-auto h-auto object-contain shadow-[0_30px_60px_rgba(0,0,0,0.3)] rounded-sm"
              alt={images[index].caption}
            />

            {/* --- Image Captions & Counter --- */}
            <div className="mt-10 text-center max-w-3xl">
              <Text variant="overline" className="text-zinc-600">
                Item {index + 1} of {images.length}
              </Text>
              <Text variant="body" className="mt-3 text-white">
                {images[index].caption}
              </Text>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
