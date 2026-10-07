// src/features/resume/ResumePage.tsx
import { ResumeService } from "../../domain/services/ResumeService";
import { PageFrame } from "../../components/ui/PageFrame";
import { ResumeHeader } from "./components/ResumeHeader";
import { ResumeTimeline } from "./components/ResumeTimeline";
import { ResumeSkills } from "./components/ResumeSkills";

export const ResumePage = () => (
  <PageFrame theme="resume" className="gap-16 lg:gap-[100px]">
    <ResumeHeader pdfUrl={ResumeService.getPdfUrl()} />
    <div className="flex flex-col gap-16 xl:gap-[54px]">
      <ResumeTimeline sections={ResumeService.getSections()} />
      <ResumeSkills groups={ResumeService.getSkillGroups()} />
    </div>
  </PageFrame>
);
