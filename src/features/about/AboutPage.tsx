// src/features/about/AboutPage.tsx
import { PageFrame } from "../../components/ui/PageFrame";
import { AboutIntro } from "./components/AboutIntro";
import { FocusAreas } from "./components/FocusAreas";
import { ModelStage } from "./components/ModelStage";

/** About (Figma: About — Desktop 2.0 / Mobile 2.0), in the green theme. */
export const AboutPage = () => (
  <PageFrame theme="about" className="gap-16 lg:gap-[110px]">
    <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
      <div className="lg:pt-[106px]">
        <AboutIntro />
      </div>
      <div className="w-full max-w-[440px] self-center lg:-mt-5 lg:max-w-[760px] lg:flex-1">
        <ModelStage />
      </div>
    </div>
    <FocusAreas />
  </PageFrame>
);
