// src/features/resume/components/ResumeTimeline.tsx
import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ResumeService } from "../../../domain/services/ResumeService";
import greenLeaf from "../../../assets/svg/resume/leaf-green.svg";
import autumnLeaf from "../../../assets/svg/resume/leaf-autumn.svg";
import { STEPS, TRACK_PAINT } from "./steps";
import { TimelineEntry } from "./TimelineEntry";

/**
 * Work and education on an orange → green track. The original leaf rides the
 * track with scroll progress, turning from autumn to green as it descends,
 * and each entry's node lights up once the leaf reaches it.
 */
export const ResumeTimeline = () => {
  const track = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: track, offset: ["start 0.45", "end 0.6"] });
  const top = useTransform(scrollYProgress, (p) => `calc(${reduce ? 1 : p} * (100% - 58px))`);
  const green = useTransform(scrollYProgress, [0.15, 0.85], [0, 1]);

  // Which entries the leaf has reached (by their position on the track).
  const entries = useRef<(HTMLLIElement | null)[]>([]);
  const [litCount, setLitCount] = useState(reduce ? Infinity : 0);
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const box = track.current?.getBoundingClientRect();
    if (!box) return;
    const leafY = box.top + p * (box.height - 58) + 29;
    setLitCount(entries.current.filter((el) => el && el.getBoundingClientRect().top <= leafY + 4).length);
  });

  const sections = ResumeService.getSections();
  // Each entry's position across all sections, for its lit state.
  const firstIndex = sections.map((_, si) => sections.slice(0, si).reduce((sum, s) => sum + s.entries.length, 0));

  return (
    <div ref={track} className="relative pl-[48px] lg:pl-[70px]">
      <div aria-hidden className="absolute top-0 bottom-0 left-[6px] w-[2px] lg:left-[20px]" style={{ background: TRACK_PAINT }} />
      <motion.div aria-hidden className="absolute left-[-30px] z-10 h-[58px] w-[63px] lg:left-[-17px]" style={{ top }}>
        <img src={autumnLeaf} alt="" className="absolute inset-0 size-full" />
        <motion.img src={greenLeaf} alt="" className="absolute inset-0 size-full" style={{ opacity: reduce ? 1 : green }} />
      </motion.div>

      <div className="flex flex-col gap-12 py-12 lg:gap-[86px] lg:py-[67px]">
        {sections.map((section, si) => (
          <section key={section.id} className="flex flex-col gap-8 lg:gap-[32px]">
            <h2 className="type-label" style={{ color: STEPS[section.step].accent }}>
              {section.title}
            </h2>
            <ol className="flex flex-col gap-12 lg:gap-14">
              {section.entries.map((entry, ei) => {
                const i = firstIndex[si] + ei;
                return (
                  <TimelineEntry
                    key={entry.title}
                    entry={entry}
                    lit={i < litCount}
                    itemRef={(el) => {
                      entries.current[i] = el;
                    }}
                  />
                );
              })}
            </ol>
          </section>
        ))}
      </div>
    </div>
  );
};
