import { ResumeHero } from "../features/work/ResumeHero";
import { ResumeSkills } from "../features/work/ResumeSkills";

export const WorkPage = () => {
  return (
    <div className="min-h-screen bg-[#030A11]">
      <main className="">
        <ResumeHero />
        <ResumeSkills />
      </main>
    </div>
  );
};
