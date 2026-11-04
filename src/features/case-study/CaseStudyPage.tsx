// src/features/case-study/CaseStudyPage.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { ProjectService } from "../../domain/services/ProjectService";
import { HeroThemeService } from "../../domain/services/HeroThemeService";
import { heroHeaderTone } from "../../domain/models/HeroTheme";
import { readQuery } from "../../hooks/useProjectFilters";
import { setHeaderTone } from "../../hooks/useHeaderTone";
import { buttonClass } from "../../components/ui/buttonStyles";
import { paletteStyle } from "../../components/ui/palette";
import { ProjectHero } from "./components/ProjectHero";
import { PosterScene } from "./components/PosterScene";
import { SnapshotStrip } from "./components/SnapshotStrip";
import { DemoVideo } from "./components/DemoVideo";
import { ProblemSection } from "./components/ProblemSection";
import { SectionHeader } from "./components/SectionHeader";
import { HighlightBlock } from "./components/HighlightBlock";
import { ResultsSection } from "./components/ResultsSection";
import { UpNext } from "./components/UpNext";
import { LinkRail } from "./components/LinkRail";
import { MobileLinkBar } from "./components/MobileLinkBar";

/**
 * A project case study (Figma: Project Detail — … — Desktop 2.0). Each page
 * takes its colours from its hero art, and the page background continues
 * from the bottom of the hero's end frame.
 */
export const CaseStudyPage = () => {
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
    <article id="case-study" className="relative bg-night pb-[calc(110px+env(safe-area-inset-bottom))] text-fg lg:pb-[120px]" style={paletteStyle(theme.palette)}>
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
          <DemoVideo demos={project.demos} poster={<PosterScene theme={theme} />} />
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
