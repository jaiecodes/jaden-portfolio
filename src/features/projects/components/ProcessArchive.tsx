// src/features/projects/components/ProcessArchive.tsx
import { useState } from "react";
import type { ProjectImage } from "../../../domain/models/Project";
import { Text } from "../../../components/ui/Text";
import { ProjectCarousel } from "./ProjectCarousel";

/**
 * Process images in a three-column grid (stacked on mobile). Columns keep
 * their width when a project has fewer than three. Click to open the carousel.
 */
export const ProcessArchive = ({ images }: { images: ProjectImage[] }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  if (images.length === 0) return null;

  return (
    <section className="px-[17px] py-14 lg:p-[90px]">
      <div className="mx-auto flex w-full max-w-[1620px] flex-col gap-6 lg:gap-[54px]">
        <Text variant="overline" as="h2" className="text-theme">
          Process Archive
        </Text>

        <ul className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-[30px]">
          {images.map((img, i) => (
            <li key={img.url}>
              <figure className="m-0 flex flex-col gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedIndex(i)}
                  aria-label={img.caption ? `Enlarge: ${img.caption}` : "Enlarge image"}
                  className="group aspect-[16/10] w-full cursor-zoom-in overflow-hidden rounded-[10px] border border-white/20 bg-abyss"
                >
                  <img
                    src={img.url}
                    alt={img.caption}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </button>
                {img.caption && (
                  <Text variant="body-sm" as="figcaption" className="text-body">
                    {img.caption}
                  </Text>
                )}
              </figure>
            </li>
          ))}
        </ul>
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
