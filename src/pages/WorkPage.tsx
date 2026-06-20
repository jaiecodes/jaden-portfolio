// src/pages/WorkPage.tsx
import { ExperienceItem } from "../features/work/ExperienceItem";

export const WorkPage = () => {
  return (
    <div className="min-h-screen bg-[#030A11] pt-[120px] px-8">
      <main className="max-w-5xl mx-auto pb-32">
        <header className="mb-24">
          <h1>Experience & Education</h1>
        </header>

        <div className="space-y-32">
          {/* Section: Professional Experience */}
          <section>
            <h3 className="mb-12 text-[#45A163]">Experience</h3>
            <div className="space-y-20 border-l border-white/10 ml-4 pl-12">
              <ExperienceItem
                date="May 2024 — Present"
                institution="Brunswick Corporation"
                role="Software Engineering Intern"
                description="Developing a custom UI framework for marine simulations. Leading lead integration for CES 2026 exhibits and building real-time telemetry plugins using C++ and Unreal Engine."
                links={[
                  {
                    label: "View CES 2026 Simulator",
                    url: "/project/ces-2026",
                  },
                ]}
              />
            </div>
          </section>

          {/* Section: Education & Projects */}
          <section>
            <h3 className="mb-12 text-[#EFC139]">Education & Engineering</h3>
            <div className="space-y-20 border-l border-white/10 ml-4 pl-12">
              <ExperienceItem
                date="2022 — Dec 2025"
                institution="University of Illinois Urbana-Champaign"
                role="B.S. in Computer Science"
                description="Focused on Computer Graphics and Software Engineering. Developing technical foundations in C++, Python, and System Architecture."
              />

              <ExperienceItem
                date="Fall 2025"
                institution="CAD Simplifier"
                role="Technical Project"
                description="Engineered a cross-platform tool to automate 3D model optimization using the Blender API and CGAL, reducing poly-counts for real-time engine compatibility."
                links={[
                  {
                    label: "View Technical Case Study",
                    url: "/project/cad-simplifier",
                  },
                ]}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
