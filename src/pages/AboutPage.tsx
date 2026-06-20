// src/pages/AboutPage.tsx
import { AboutHero } from "../features/about/AboutHero";
import { AboutInterests } from "../features/about/AboutInterests";
import { AboutLearning } from "../features/about/AboutLearning";

export const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#030A11] text-white">
      <AboutHero />

      <main className="max-w-6xl mx-auto px-8 space-y-32 pb-20">
        {/* Learning/Reading Section */}
        <AboutLearning />
        {/* Photography Section */}
        <AboutInterests />
      </main>
    </div>
  );
};
