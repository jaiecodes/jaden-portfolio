// src/features/projects/components/ProjectContributions.tsx
import { motion } from "motion/react";

export const ProjectContributions = ({
  content,
  videoThumbnail,
}: {
  content: string;
  videoThumbnail: string;
}) => {
  return (
    <section className="py-32 bg-white text-black px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-start">
        {/* Left: Sticky Video Preview */}
        <div className="lg:w-1/2 sticky top-32">
          <div className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-2xl">
            <img
              src={videoThumbnail}
              className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl">
                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-black border-b-[10px] border-b-transparent ml-1" />
              </div>
            </div>
          </div>
          <h6 className="mt-4 caption-btn-sm tracking-normal text-zinc-400">
            Click to Play Demo
          </h6>
        </div>

        {/* Right: Scrolling Text */}
        <div className="lg:w-1/2">
          <h6 className="tracking-[0.2em] text-zinc-400 mb-8">
            Key Contributions
          </h6>
          <div className="space-y-12">
            <p className="text-3xl md:text-4xl leading-[1.1] tracking-tight text-zinc-900">
              {content}
            </p>
            {/* You can map more specific contribution bullet points here later */}
          </div>
        </div>
      </div>
    </section>
  );
};
