// src/features/projects/components/ShatteredGallery.tsx
import { motion } from "motion/react";
import { useState } from "react";
import { ProjectCarousel } from "./ProjectCarousel";
import type { ProjectImage } from "../../../domain/models/Project";

export const ShatteredGallery = ({ images }: { images: ProjectImage[] }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Radiating coordinates: fan out from (0,0)
  const positions = [
    [-150, -200, -10],
    [150, -180, 8],
    [-280, 0, -15],
    [280, -20, 12],
    [-180, 200, 5],
    [180, 180, -8],
    [0, -80, 2],
    [0, 100, -4],
  ];

  return (
    <section className="py-60 bg-black border-t border-zinc-900 overflow-hidden relative">
      <div className="max-w-5xl mx-auto text-center mb-40 relative z-10">
        <h6 className="tracking-[0.2em] text-zinc-300">Process Archive</h6>
      </div>

      <div className="relative h-[500px] max-w-5xl mx-auto flex items-center justify-center">
        {images.map((img, i) => {
          const [x, y, rotate] = positions[i % positions.length];

          return (
            <motion.div
              key={i}
              initial={{ x: 0, y: 0, rotate: 0, opacity: 0, scale: 0.5 }}
              whileInView={{ x, y, rotate, opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                type: "spring",
                stiffness: 90,
                damping: 20,
                delay: i * 0.07,
              }}
              whileHover={{ scale: 1.05, zIndex: 100, rotate: 0 }}
              onClick={() => setSelectedIndex(i)}
              className="absolute w-80 aspect-[4/3] cursor-zoom-in overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] group"
            >
              <img
                src={img.url}
                alt={img.caption}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />

              {/* Overlay Caption: Only shows on hover to keep the 'print' look clean */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <h6 className="caption-btn-sm text-white tracking-tightest leading-tight">
                  {img.caption}
                </h6>
              </div>
            </motion.div>
          );
        })}
      </div>

      <ProjectCarousel
        images={images}
        isOpen={selectedIndex !== null}
        initialIndex={selectedIndex ?? 0}
        onClose={() => setSelectedIndex(null)}
      />
    </section>
  );
};
