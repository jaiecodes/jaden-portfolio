import rawData from "../../assets/data/resume.json";
import {
  ResumeEntry,
  ResumeSection,
  type ResumeData,
  type SkillGroupData,
} from "../models/Resume";
import { ProjectService } from "./ProjectService";

const data = rawData as ResumeData;

const sections: ResumeSection[] = data.sections.map(
  (s) =>
    new ResumeSection(
      s,
      s.entries.map(
        (e) =>
          new ResumeEntry(
            e,
            !!e.projectId && !!ProjectService.getById(e.projectId),
          ),
      ),
    ),
);

export const ResumeService = {
  getPdfUrl(): string {
    return data.pdfUrl;
  },
  getSections(): ResumeSection[] {
    return sections;
  },
  getSkillGroups(): SkillGroupData[] {
    return data.skillGroups;
  },
};
