// src/features/projects/components/ProjectContributions.tsx
import { Text } from "../../../components/ui/Text";

interface ProjectContributionsProps {
  content: string;
  /** Poster for the demo video slot; the slot shows the abyss colour without it. */
  videoThumbnail?: string;
}

/** Demo video slot beside what was built. */
export const ProjectContributions = ({ content, videoThumbnail }: ProjectContributionsProps) => (
  <section className="px-[17px] py-14 lg:p-[90px]">
    <div className="mx-auto flex w-full max-w-[1620px] flex-col gap-6 lg:gap-[54px]">
      <Text variant="overline" as="h2" className="text-theme">
        Key Contributions
      </Text>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-[90px]">
        <figure className="m-0 flex w-full flex-col gap-4 lg:w-[900px] lg:shrink-0">
          <button
            type="button"
            aria-label="Play demo"
            className="group relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-[10px] border border-theme/50 bg-abyss"
          >
            {videoThumbnail && (
              <img
                src={videoThumbnail}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
              />
            )}
            <span className="relative flex size-14 items-center justify-center rounded-full bg-white transition-transform group-hover:scale-110 lg:size-[72px]">
              <svg width="40%" height="40%" viewBox="0 0 24 24" aria-hidden>
                <path d="M8 5v14l11-7z" fill="var(--color-ink)" />
              </svg>
            </span>
          </button>
          <Text variant="overline" as="figcaption" className="text-body/60">
            Click to play demo
          </Text>
        </figure>

        <Text variant="lead" className="text-white lg:flex-1">
          {content}
        </Text>
      </div>
    </div>
  </section>
);
