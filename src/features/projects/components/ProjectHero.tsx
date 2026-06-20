// src/features/projects/components/ProjectHero.tsx
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export const ProjectHero = ({ title }: { title: string }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  // Boat sways while moving up
  const boatY = useTransform(scrollYProgress, [0, 1], ["0%", "-120%"]);
  const boatRotate = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [0, 4, -4, 4, 0],
  );

  // Waves move out to the sides
  const leftWaveX = useTransform(scrollYProgress, [0, 0.8], ["0%", "-100%"]);
  const rightWaveX = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);

  return (
    <section ref={targetRef} className="relative h-[250vh] bg-[#001220]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Project Title (Stays Put) */}
        <h1 className="text-[12vw] tracking-tighter uppercase  z-0 select-none">
          {title}
        </h1>

        {/* The Boat */}
        <motion.div
          style={{ y: boatY, rotate: boatRotate }}
          className="z-20 w-[40%] max-w-[500px]"
        >
          <img src="/svg/boat.svg" alt="Boat" className="w-full h-auto" />
        </motion.div>

        {/* Foreground Waves */}
        <motion.img
          style={{ x: leftWaveX }}
          src="/svg/wave-left.svg"
          className="absolute bottom-0 left-0 w-full z-30"
        />
        <motion.img
          style={{ x: rightWaveX }}
          src="/svg/wave-right.svg"
          className="absolute bottom-0 right-0 w-full z-30"
        />
      </div>
    </section>
  );
};
