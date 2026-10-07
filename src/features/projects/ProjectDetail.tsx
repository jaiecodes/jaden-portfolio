import { useParams, useLocation } from "react-router-dom";
import { ProjectService } from "../../domain/services/ProjectService";
import { HeroThemeService } from "../../domain/services/HeroThemeService";
import { overviewSurface } from "../../domain/models/HeroTheme";
import { ProjectHero } from "./components/ProjectHero";
import { ProjectOverview } from "./components/ProjectOverview";
import { ProjectContributions } from "./components/ProjectContributions";
import { ProcessArchive } from "./components/ProcessArchive";
import { ExternalLinksBar } from "../../components/ui/ExternalLinksBar";
import { ProjectImpact } from "./components/ProjectImpact";
import { NextProject } from "./components/NextProject";
import { BackToGallery } from "./components/BackToGallery";

export const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  const project = ProjectService.getById(id || "");

  // Extract filters from URL to determine shuffle sequence
  const params = new URLSearchParams(location.search);
  const query = params.get("q") || "";
  const category = params.get("cat") || null;
  const tags = params.getAll("tag");

  const filteredList =
    query || category || tags.length > 0
      ? ProjectService.getFiltered(query, category, tags)
      : ProjectService.getAll();

  const currentIndex = filteredList.findIndex((p) => p.id === id);
  const listToUse =
    currentIndex === -1 ? ProjectService.getAll() : filteredList;
  const activeIndex =
    currentIndex === -1
      ? ProjectService.getAll().findIndex((p) => p.id === id)
      : currentIndex;

  const nextProject = listToUse[(activeIndex + 1) % listToUse.length];

  if (!project) return <div className="h-screen bg-ink" />;

  const heroTheme = HeroThemeService.getByProjectId(project.id);

  return (
    <div data-theme="projects" className="relative bg-ink text-white">
      <BackToGallery />

      <ExternalLinksBar links={project.externalLinks} />
      <ProjectHero title={project.name} theme={heroTheme} />
      <ProjectOverview
        project={project}
        foreground={heroTheme?.foreground}
        surface={overviewSurface(heroTheme)}
      />
      <ProjectContributions
        content={project.contributions}
        videoThumbnail={project.media[0]}
      />
      <ProcessArchive images={project.images} />
      <ProjectImpact challenges={project.challenges} impact={project.impact} />

      {filteredList.length > 1 && (
        <NextProject project={nextProject} currentSearch={location.search} />
      )}
    </div>
  );
};
