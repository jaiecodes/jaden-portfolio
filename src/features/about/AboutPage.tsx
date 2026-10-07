// src/features/about/AboutPage.tsx
import { AboutService } from "../../domain/services/AboutService";
import { PageFrame } from "../../components/ui/PageFrame";
import { AboutHero } from "./components/AboutHero";
import { FocusAreas } from "./components/FocusAreas";

export const AboutPage = () => (
  <PageFrame theme="about" className="gap-14 lg:gap-[180px]">
    <AboutHero
      intro={AboutService.getIntro()}
      socials={AboutService.getSocialLinks()}
    />
    <FocusAreas focus={AboutService.getFocusAreas()} />
  </PageFrame>
);
