// src/features/projects/ProjectDetail.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { motionValue } from "motion/react";
import { ProjectService } from "../../domain/services/ProjectService";
import { HeroThemeService } from "../../domain/services/HeroThemeService";
import { paletteStyle, type HeroThemeData } from "../../domain/models/HeroTheme";
import { prefersDarkText } from "../../domain/models/Color";
import { readQuery } from "../../hooks/useProjectFilters";
import { setHeaderTone } from "../../hooks/useHeaderTone";
import { buttonClass } from "../../components/ui/buttonStyles";
import { ProjectHero } from "./components/ProjectHero";
import { HeroScene, SCENE_W } from "./components/HeroScene";
import { SnapshotStrip } from "./components/SnapshotStrip";
import { DemoVideo } from "./components/DemoVideo";
import { ProblemSection } from "./components/ProblemSection";
import { SectionHeader } from "./components/SectionHeader";
import { HighlightBlock } from "./components/HighlightBlock";
import { ResultsSection } from "./components/ResultsSection";
import { UpNext } from "./components/UpNext";
import { LinkRail } from "./components/LinkRail";
import { MobileLinkBar } from "./components/MobileLinkBar";

const END_FRAME = motionValue(1);

/** The hero's end frame, filling its box: the demo's poster until a video exists. */
const PosterScene = ({ theme }: { theme: HeroThemeData }) => {
  const box = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setWidth(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={box} className="absolute inset-0" style={{ background: theme.heroBackground }}>
      {width > 0 && <HeroScene layers={theme.layers} progress={END_FRAME} scale={width / SCENE_W} />}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--night-sunken)_30%,transparent)_0%,color-mix(in_srgb,var(--night-sunken)_40%,transparent)_55%,color-mix(in_srgb,var(--night-sunken)_85%,transparent))]" />
    </div>
  );
};

/** Header text that reads on the hero art: dark on pale heroes. */
function heroHeaderTone(theme: HeroThemeData): string {
  const { bg, text } = theme.palette;
  if (!prefersDarkText(theme.heroBackground)) return text;
  return prefersDarkText(bg) ? text : bg;
}

/**
 * A project case study (Figma: Project Detail — … — Desktop 2.0). Each page
 * takes its colours from its hero art, and the page background continues
 * from the bottom of the hero's end frame.
 */
export const ProjectDetail = () => {
  const { id = "" } = useParams();
  const { search } = useLocation();
  const project = ProjectService.getById(id);
  const theme = HeroThemeService.getByProjectId(id);
  const sequence = useMemo(() => ProjectService.find(readQuery(new URLSearchParams(search))), [search]);
  const next = project ? ProjectService.getNext(project.id, sequence) : undefined;

  const snapshot = useRef<HTMLElement>(null);
  const [railVisible, setRailVisible] = useState(false);
  useEffect(() => {
    const el = snapshot.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setRailVisible(!e.isIntersecting && e.boundingClientRect.top < 0));
    io.observe(el);
    return () => io.disconnect();
  }, [id]);

  useEffect(() => () => setHeaderTone(null), []);

  if (!project || !theme) {
    return (
      <div className="flex min-h-screen flex-col items-start justify-center gap-6 px-5 lg:px-[200px]">
        <p className="type-h2 text-fg">That project isn’t here.</p>
        <Link to="/projects" className={buttonClass("primary")}>
          Back to projects
        </Link>
      </div>
    );
  }

  const heroTone = heroHeaderTone(theme);

  return (
    <article className="relative bg-night pb-[calc(110px+env(safe-area-inset-bottom))] text-fg lg:pb-[120px]" style={paletteStyle(theme.palette)}>
      <ProjectHero
        project={project}
        theme={theme}
        onBehindHeader={(behind) => setHeaderTone(behind ? heroTone : theme.palette.text)}
      />

      <div className="relative">
        {/* Seam band: the hero's last colour fading into the page */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[620px]"
          style={{ background: `linear-gradient(180deg, ${theme.seam}, var(--night-bg))` }}
        />
        <div className="relative mx-auto flex max-w-[1440px] flex-col gap-10 px-5 pt-[30px] lg:-mt-2.5 lg:gap-[140px] lg:px-5 lg:pt-0">
          <SnapshotStrip ref={snapshot} project={project} />
          <DemoVideo video={project.video} poster={<PosterScene theme={theme} />} />
          <ProblemSection problem={project.problem} />
          <section className="flex flex-col gap-10 lg:gap-20" aria-label="Highlights">
            <SectionHeader kicker="What I built" title={project.highlights.heading} />
            <div className="flex flex-col gap-14 lg:gap-[120px]">
              {project.highlights.items.map((h, i) => (
                <HighlightBlock key={h.title} highlight={h} index={i} />
              ))}
            </div>
          </section>
          <ResultsSection project={project} />
          {next && <UpNext project={next} search={search} />}
        </div>
      </div>

      <LinkRail links={project.links} visible={railVisible} />
      <MobileLinkBar links={project.links} />
    </article>
  );
};
