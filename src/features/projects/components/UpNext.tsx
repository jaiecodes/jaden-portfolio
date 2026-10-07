// src/features/projects/components/UpNext.tsx
import { Link } from "react-router-dom";
import type { Project } from "../../../domain/models/Project";
import { Text } from "../../../components/ui/Text";

/** The next project in the (filtered) sequence, as a banner over its art. */
export const UpNext = ({ project, search }: { project: Project; search: string }) => (
  <Link
    to={{ pathname: `/project/${project.id}`, search }}
    className="group relative block h-[260px] overflow-hidden rounded-3xl bg-raised lg:h-[360px]"
  >
    <img
      src={project.bannerArt}
      alt=""
      loading="lazy"
      className="absolute top-[-55%] left-[8%] h-[238%] w-full max-w-none object-cover transition-transform duration-700 group-hover:scale-[1.04]"
    />
    <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--night-raised)_30%,transparent_75%)]" />
    <div className="relative flex h-full flex-col justify-center gap-3.5 px-6 lg:px-14">
      <Text variant="label" tone="primary" as="p">
        Up next
      </Text>
      <Text variant="h1" as="p" className="text-fg">
        {project.name} <span className="inline-block transition-transform group-hover:translate-x-2">→</span>
      </Text>
      <Text variant="body" tone="muted">
        {project.teaserLine}
      </Text>
    </div>
  </Link>
);
