// src/features/resume/components/ResumeHeader.tsx
import { ResumeService } from "../../../domain/services/ResumeService";
import { ActionLink } from "../../../components/ui/ActionLink";

/** "RESUME" in the orange → green gradient, with the PDF download. */
export const ResumeHeader = () => (
  <div className="flex flex-col items-start gap-4 lg:flex-row lg:items-center lg:gap-6">
    <h1 className="type-h1 text-gradient bg-[image:var(--paint-secondary-moss)] pb-1 uppercase">Resume</h1>
    <ActionLink href={ResumeService.getPdfUrl()}>Download PDF ↓</ActionLink>
  </div>
);
