import ResumeTitle from "@/assets/svg/titles/RESUME.svg?react";
import { motion } from "motion/react";
import { ExperienceItem } from "./ExperienceItem";

export const ResumeHero = () => {
  return (
    <section className="min-h-screen">
      <div className="flex flex-col w-full max-w-full items-stretch gap-y-25 px-[17px] pt-[117px] pb-[17px] lg:px-[90px] lg:pt-[190px] lg:pb-[90px]">
        {/* Title + External Link Header */}
        <div className="flex w-full justify-left gap-25">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <ResumeTitle
              aria-label="Resume"
              role="img"
              className="h-auto w-[240px] sm:w-[280px] lg:w-[300px] 2xl:w-[351px]"
            />
          </motion.h1>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex flex-col items-start pt-5"
          >
            <div className="flex items-center gap-2">
              <span className="text-[#DD8B2D] text-2xl font-satoshi font-bold">
                PDF
              </span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 23 23"
                fill="none"
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              >
                <path
                  d="M23 14.029C23 14.6325 22.5107 15.1217 21.9072 15.1217C21.3037 15.1217 20.8145 14.6325 20.8145 14.029V3.73093L1.86542 22.68C1.43867 23.1067 0.746807 23.1067 0.320063 22.68C-0.106688 22.2532 -0.106688 21.5613 0.320063 21.1345L19.2691 2.18552H8.81495C8.21143 2.18552 7.72218 1.69627 7.72218 1.09276C7.72218 0.489245 8.21143 0 8.81495 0H21.9072C22.5108 0 23 0.489245 23 1.09276V14.029Z"
                  fill="#DD8B2D"
                />
              </svg>
            </div>
            <div className="w-full h-0.5 bg-[#DD8B2D] mt-1" />
          </a>
        </div>

        {/* Work Experience Category */}
        <div className="">
          <h3 className="text-[#78B34D] font-bold text-5xl tracking-normal capsize">
            Work Experience
          </h3>
          <div className="pl-11">
            <ExperienceItem
              role="Software Engineer"
              institution="BRUNSWICK"
              institutionColor="#4DB36F"
              date="JAN 2026"
              accentBorderColor="#4DB36F"
              cardBgColor="rgba(77, 179, 111, 0.05)"
              contextText="Engineered Slate UI and real-time telemetry pipelines."
              outcomeText="Scaled multi-exhibit marine simulators for CES 2026."
              tags={["C++", "Unreal", "CANBUS"]}
              linkUrl="/project/ces-2026"
            />
          </div>
          {/* Education & Selected Academic Projects */}

          <h3 className="text-[#D1C85A] font-bold text-5xl tracking-normal">
            Education & <br></br> Selected Projects
          </h3>
          <div className=" pl-11">
            <ExperienceItem
              role="B.S. Computer Science"
              institution="UNIVERSITY OF ILLINOIS"
              institutionColor="#EFC139"
              date="DEC 2025"
              accentBorderColor="#EFC139"
              cardBgColor="rgba(239, 193, 57, 0.05)"
              contextText="Specialization in Computer Graphics & Embedded Systems."
              outcomeText="Leadership in Design for America & SHPE UIUC."
              tags={["SHPE", "DFA", "SIGHCI"]}
            />

            <ExperienceItem
              role="Wireless Sensing"
              institution="CS 245 - INTERNET OF THINGS"
              institutionColor="#EFC139"
              date="JAN 2026"
              accentBorderColor="#EFC139"
              cardBgColor="rgba(239, 193, 57, 0.05)"
              contextText="Engineered continuous IMU tracking and telemetry pipeline."
              outcomeText="Reduced sensor transport packet loss by 18%."
              tags={["SURFSHARK", "PYTHON", "RASPPI"]}
              linkUrl="/project/wireless-sensing"
            />

            <ExperienceItem
              role="Mix Space"
              institution="RESEARCH PARK HACKATHON"
              institutionColor="#EFC139"
              date="JAN 2026"
              accentBorderColor="#EFC139"
              cardBgColor="rgba(239, 193, 57, 0.05)"
              contextText="Collaborative spatial AR tooling prototype."
              outcomeText="Won Best Technical Architecture Award."
              tags={["SURFSHARK", "PYTHON", "RASPPI"]}
              linkUrl="/project/mix-space"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
