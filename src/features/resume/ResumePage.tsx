// src/features/resume/ResumePage.tsx
import { PageFrame } from "../../components/ui/PageFrame";
import { ResumeHeader } from "./components/ResumeHeader";
import { ResumeSkills } from "./components/ResumeSkills";
import { ResumeTimeline } from "./components/ResumeTimeline";

/** Resume (Figma: Resume — Desktop 2.0 / Mobile 2.0), in the orange → green theme. */
export const ResumePage = () => (
  <PageFrame theme="resume" className="gap-6 lg:gap-6">
    <ResumeHeader />
    <ResumeTimeline />
    <div className="mt-10 lg:mt-[70px]">
      <ResumeSkills />
    </div>
  </PageFrame>
);
