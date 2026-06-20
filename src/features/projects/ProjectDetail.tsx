import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ProjectService } from "../../domain/services/ProjectService";
import { ProjectHero } from "./components/ProjectHero";
import { ProjectOverview } from "./components/ProjectOverview";
import { ProjectContributions } from "./components/ProjectContributions";
import { ShatteredGallery } from "./components/ShatteredGallery";
import { ExternalLinksBar } from "../../components/ui/ExternalLinksBar";
import { ProjectImpact } from "./components/ProjectImpact";
import { NextProject } from "./components/NextProject";

export const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();

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

  if (!project) return <div className="h-screen bg-black" />;

  return (
    <div className="bg-[#0a0a0a] text-white relative">
      <button
        onClick={() => navigate({ pathname: "/", search: location.search })}
        className="fixed top-32 right-10 z-[110] group flex items-center gap-4 bg-zinc-900/50 backdrop-blur-xl p-2 pr-8 rounded-full border border-white/5 hover:bg-white hover:text-black transition-all duration-700"
      >
        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-black/10 transition-colors">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M19 12H5m7 7l-7-7 7-7" />
          </svg>
        </div>
        <span className="caption-btn tracking-[0.2em]"> Exit to Gallery</span>
      </button>

      <ExternalLinksBar links={project.externalLinks} />
      <ProjectHero title={project.name} />
      <ProjectOverview project={project} />
      <ProjectContributions
        content={project.contributions}
        videoThumbnail={project.media[0]}
      />
      <ShatteredGallery images={project.images} />
      <ProjectImpact challenges={project.challenges} impact={project.impact} />

      {filteredList.length > 1 && (
        <NextProject project={nextProject} currentSearch={location.search} />
      )}
    </div>
  );
};
