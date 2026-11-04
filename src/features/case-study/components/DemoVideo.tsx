// src/features/case-study/components/DemoVideo.tsx
import { useState, type ReactNode } from "react";
import { isVideoSrc, youtubeId, type Visual } from "../../../domain/models/Project";
import { FilterChip } from "../../../components/ui/FilterChip";
import { Icon } from "../../../components/ui/Icon";
import { Media } from "./Media";

const PlayBadge = () => (
  <span className="absolute top-1/2 left-1/2 flex size-14 -translate-1/2 items-center justify-center rounded-full bg-t-primary text-t-on-primary shadow-[0_0_44px_color-mix(in_srgb,var(--theme-primary)_45%,transparent)] lg:size-24">
    <Icon name="play" size={34} className="ml-1 size-6 lg:size-[34px]" />
  </span>
);

/** One demo in its frame. Remounted when the demo changes, so it starts fresh. */
const DemoFrame = ({ demo, poster }: { demo: Visual; poster: ReactNode }) => {
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const { src } = demo;
  const youtube = src && youtubeId(src);
  const isVideo = !!src && (!!youtube || isVideoSrc(src));

  return (
    <figure className="relative aspect-video w-full overflow-hidden rounded-[20px] border border-line bg-sunken">
      {youtube && playing && (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtube}?autoplay=1&rel=0`}
          title={demo.caption}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 size-full"
        />
      )}
      {youtube && !playing && (
        // Nothing loads from YouTube until it's asked for: faster, and no cookies.
        <button type="button" onClick={() => setPlaying(true)} aria-label={`Play video: ${demo.caption}`} className="absolute inset-0 cursor-pointer">
          <img
            src={`https://i.ytimg.com/vi/${youtube}/maxresdefault.jpg`}
            alt=""
            loading="lazy"
            className="size-full object-cover"
          />
          <PlayBadge />
        </button>
      )}
      {src && !youtube && <Media visual={{ ...demo, src }} muted={muted} />}
      {!src && (
        <>
          <div className="absolute inset-0">{poster}</div>
          <span title="Video coming soon">
            <PlayBadge />
          </span>
        </>
      )}
      {isVideo && !youtube && demo.hasSound && (
        <button
          type="button"
          onClick={() => setMuted((m) => !m)}
          aria-pressed={!muted}
          className="type-label absolute top-4 right-4 rounded-full bg-night/70 px-3 py-1.5 text-fg backdrop-blur-sm"
        >
          {muted ? "Turn sound on" : "Mute"}
        </button>
      )}
      {!playing && (
        <figcaption
          className={`pointer-events-none absolute inset-x-0 bottom-0 hidden items-baseline gap-4 px-8 pt-16 pb-7 lg:flex ${
            src ? "bg-gradient-to-t from-sunken to-transparent" : ""
          }`}
        >
          <span className="type-label text-fg">{src && !isVideo ? "Image" : "Video"}</span>
          <span className="type-body-sm text-muted">{demo.caption}</span>
        </figcaption>
      )}
    </figure>
  );
};

interface DemoVideoProps {
  demos: Visual[];
  /** Shown until a demo exists: the hero's end frame. */
  poster: ReactNode;
}

/**
 * The demo (Figma: Demo video). A local video loops silently while on screen,
 * with a sound button if it has audio; a YouTube link shows its thumbnail and
 * plays on click; an image just fills the frame. Without a source it shows the
 * hero's end frame under the play button. Several demos get a switch above.
 */
export const DemoVideo = ({ demos, poster }: DemoVideoProps) => {
  const [index, setIndex] = useState(0);
  return (
    <section id="demo" aria-label="Demo" className="flex scroll-mt-32 flex-col gap-4">
      {demos.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {demos.map((d, i) => (
            <FilterChip key={d.label ?? i} label={d.label ?? `Video ${i + 1}`} selected={i === index} onClick={() => setIndex(i)} />
          ))}
        </div>
      )}
      <DemoFrame key={index} demo={demos[index]} poster={poster} />
    </section>
  );
};
