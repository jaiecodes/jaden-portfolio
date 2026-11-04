// src/features/case-study/components/DemoVideo.tsx
import { useState, type ReactNode } from "react";
import { isVideoSrc, type Visual } from "../../../domain/models/Project";
import { Icon } from "../../../components/ui/Icon";
import { Media } from "./Media";

interface DemoVideoProps {
  video: Visual;
  /** Shown until the demo exists: the hero's end frame. */
  poster: ReactNode;
}

/**
 * The demo (Figma: Demo video). A video loops silently while on screen, with
 * a sound button if it has audio; an image just fills the frame. Without a
 * source it shows the hero's end frame under the play button and its caption,
 * so the slot reads as intended.
 */
export const DemoVideo = ({ video, poster }: DemoVideoProps) => {
  const [muted, setMuted] = useState(true);
  const { src } = video;
  const isVideo = !!src && isVideoSrc(src);

  return (
    <figure
      id="demo"
      className="relative aspect-video w-full scroll-mt-32 overflow-hidden rounded-[20px] border border-line bg-sunken"
    >
      {src ? (
        <Media visual={{ ...video, src }} muted={muted} />
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
      {isVideo && video.hasSound && (
        <button
          type="button"
          onClick={() => setMuted((m) => !m)}
          aria-pressed={!muted}
          className="type-label absolute top-4 right-4 rounded-full bg-night/70 px-3 py-1.5 text-fg backdrop-blur-sm"
        >
          {muted ? "Turn sound on" : "Mute"}
        </button>
      )}
      <figcaption
        className={`pointer-events-none absolute inset-x-0 bottom-0 hidden items-baseline gap-4 px-8 pt-16 pb-7 lg:flex ${
          src ? "bg-gradient-to-t from-sunken to-transparent" : ""
        }`}
      >
        <span className="type-label text-fg">{src && !isVideo ? "Image" : "Video"}</span>
        <span className="type-body-sm text-muted">{video.caption}</span>
      </figcaption>
    </figure>
  );
};
