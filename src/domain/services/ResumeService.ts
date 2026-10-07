import rawData from "../../assets/data/resume.json";
import { ResumeEntry, ResumeSection, type ResumeData } from "../models/Resume";
import { ProjectService } from "./ProjectService";

const data = rawData as ResumeData;

const sections: ResumeSection[] = data.sections.map(
  (s) =>
    new ResumeSection(
      s,
      s.entries.map((e) => new ResumeEntry(e, !!e.projectId && !!ProjectService.getById(e.projectId))),
    ),
);

export const ResumeService = {
  /** Empty until the PDF is added. */
  getPdfUrl(): string {
    return data.pdfUrl;
  },
  getSections(): ResumeSection[] {
    return sections;
  },
  getSkills(): ResumeData["skills"] {
    return data.skills;
  },
};
