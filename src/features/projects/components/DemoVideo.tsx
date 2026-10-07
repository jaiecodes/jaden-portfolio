// src/features/projects/components/DemoVideo.tsx
import { useRef, useState, type ReactNode } from "react";
import type { Visual } from "../../../domain/models/Project";
import { Icon } from "../../../components/ui/Icon";

interface DemoVideoProps {
  video: Visual;
  /** Shown until the video exists: the hero's end frame. */
  poster: ReactNode;
}

/**
 * The demo (Figma: Demo video). With a source it autoplays muted on a loop
 * and a click turns the sound on; without one it shows the hero's end frame
 * under the play button and its caption, so the slot reads as intended.
 */
export const DemoVideo = ({ video, poster }: DemoVideoProps) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  return (
    <figure
      id="demo"
      className="relative aspect-video w-full scroll-mt-32 overflow-hidden rounded-[20px] border border-line bg-sunken"
    >
      {video.src ? (
        <video
          ref={ref}
          src={video.src}
          autoPlay
          muted={muted}
          loop
          playsInline
          onClick={() => setMuted((m) => !m)}
          className="size-full cursor-pointer object-cover"
        />
      ) : (
        <>
          <div className="absolute inset-0">{poster}</div>
          <span
            className="absolute top-1/2 left-1/2 flex size-14 -translate-1/2 items-center justify-center rounded-full bg-t-primary text-t-on-primary shadow-[0_0_44px_color-mix(in_srgb,var(--theme-primary)_45%,transparent)] lg:size-24"
            title="Video coming soon"
          >
            <Icon name="play" size={34} className="ml-1 size-6 lg:size-[34px]" />
          </span>
        </>
      )}
      {video.src && muted && (
        <span className="type-label pointer-events-none absolute top-4 right-4 rounded-full bg-night/70 px-3 py-1.5 text-fg">
          Click for sound
        </span>
      )}
      <figcaption className="absolute bottom-0 left-0 hidden items-baseline gap-4 px-8 pb-7 lg:flex">
        <span className="type-label text-fg">Video</span>
        <span className="type-body-sm text-muted">{video.caption}</span>
      </figcaption>
    </figure>
  );
};
