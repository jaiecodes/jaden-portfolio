import type { RefObject } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import stemUrl from "@/assets/svg/resume/stem.svg";
import greenLeafUrl from "@/assets/svg/resume/leaf-green.svg";
import autumnLeafUrl from "@/assets/svg/resume/leaf-autumn.svg";
import { ENTRY_GRID } from "./tones";

// Geometry from the Figma start / end frames (px).
const START_STEM = 122; // visible stem before scrolling
const LEAF_H = 57.5;
const START_GAP = 14; // stem tip → leaf, start frame
const END_GAP = 52; // stem tip → leaf, end frame

/**
 * The scroll animation from the design: a brush-stroke stem that grows down
 * the gutter between the dates and the cards as the timeline scrolls, its
 * gradient running green → orange, with the leaf at its tip turning from
 * green to autumn orange. At the end it reaches the bottom of the timeline.
 *
 * Rendered as an overlay on `target`, using the same column template as the
 * entry rows so it stays in the gutter. Only shown when that gutter is wide
 * enough to hold it.
 */
export const ScrollLeaf = ({ target }: { target: RefObject<HTMLElement | null> }) => {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start 0.25", "end end"],
  });

  // The stem image is drawn at its final length (track minus leaf + gap) and
  // revealed from the top; the clip's % is relative to that final length.
  const stemClip = useTransform(
    scrollYProgress,
    (p) => `inset(0 0 calc(${1 - p} * (100% - ${START_STEM}px)) 0)`,
  );
  const leafTop = useTransform(
    scrollYProgress,
    (p) =>
      `calc(${START_STEM * (1 - p) + START_GAP + (END_GAP - START_GAP) * p}px + ${p} * (100% - ${LEAF_H + END_GAP}px))`,
  );
  const autumn = useTransform(scrollYProgress, [0.2, 1], [0, 1]);

  // Reduced motion: show the finished state.
  const still = reduceMotion ?? false;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 hidden pl-[45px] min-[1750px]:block"
    >
      <div className={`h-full ${ENTRY_GRID}`}>
        <div className="relative col-start-2 mx-auto w-[63px]">
          <motion.img
            src={stemUrl}
            alt=""
            className="absolute inset-x-0 top-0 h-[calc(100%-109.5px)] w-full"
            style={still ? undefined : { clipPath: stemClip }}
          />
          <motion.div
            className="absolute inset-x-0 h-[57.5px]"
            style={{ top: still ? `calc(100% - ${LEAF_H}px)` : leafTop }}
          >
            <img src={greenLeafUrl} alt="" className="absolute inset-0 size-full" />
            <motion.img
              src={autumnLeafUrl}
              alt=""
              className="absolute inset-0 size-full"
              style={{ opacity: still ? 1 : autumn }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};
