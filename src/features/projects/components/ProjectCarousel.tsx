// src/features/projects/components/ProjectCarousel.tsx
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import type { ProjectImage } from "../../../domain/models/Project"; // Import new type

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

  // Lock Scroll and Sync Index
  useEffect(() => {
    if (isOpen) {
      setIndex(initialIndex);
      document.body.style.overflow = "hidden"; // LOCK
    } else {
      document.body.style.overflow = "unset"; // UNLOCK
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, initialIndex]);

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
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>

          {/* Navigation Controls */}
          <div className="absolute inset-x-10 flex justify-between z-10 pointer-events-none text-white/50">
            <button
              className="pointer-events-auto hover:text-white"
              onClick={() =>
                setIndex((i) => (i > 0 ? i - 1 : images.length - 1))
              }
            >
              ←
            </button>
            <button
              className="pointer-events-auto hover:text-white"
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
              <h6 className="caption-btn-sm text-zinc-600 tracking-widest">
                ITEM {index + 1} OF {images.length}
              </h6>
              <p className="caption-btn-sm mt-3 text-white text-base leading-relaxed">
                {images[index].caption}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
