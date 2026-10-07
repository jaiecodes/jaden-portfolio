// src/features/home/HomePage.tsx
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { HomeService } from "../../domain/services/HomeService";
import { buttonClass } from "../../components/ui/buttonStyles";
import { Fireflies } from "../../components/ui/Fireflies";
import { Icon } from "../../components/ui/Icon";
import { Text } from "../../components/ui/Text";
import { usePointerParallax } from "../../hooks/usePointerParallax";
import { GardenScene } from "./components/GardenScene";

/**
 * The garden entry. Scrolling walks through the arch and lands on Projects;
 * "Skip to projects" goes straight there. Reduced motion gets the still frame
 * and the buttons go straight to Projects.
 */
export const HomePage = () => {
  const copy = HomeService.get();
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  const section = useRef<HTMLElement>(null);
  const pointer = usePointerParallax();
  const arrived = useRef(false);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const dolly = useTransform(scrollYProgress, [0, 0.92], [0, 1], { clamp: true });
  const textOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.25], [0, -40]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (p > 0.97 && !arrived.current) {
      arrived.current = true;
      navigate("/projects");
    }
  });

  const enter = () => {
    if (reduce) return navigate("/projects");
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
  };

  return (
    <section ref={section} data-theme="home" className="relative h-[260vh] bg-night" aria-label="Garden entry">
      <div className="sticky top-0 h-screen overflow-hidden">
        <GardenScene dolly={dolly} pointer={pointer} />
        <Fireflies seed={11} />

        <motion.div
          className="relative mx-auto flex h-full max-w-[1800px] flex-col justify-end gap-8 px-5 pb-10 lg:flex-row lg:items-center lg:justify-between lg:px-[90px] lg:pb-0"
          style={{ opacity: textOpacity, y: textY }}
        >
          <div className="flex max-w-[440px] flex-col gap-[22px] max-lg:rounded-2xl max-lg:bg-night/70 max-lg:p-5 max-lg:backdrop-blur-md lg:mt-[60px]">
            <Text variant="label" tone="primary">
              {copy.name}
            </Text>
            <Text variant="h2" as="h1" className="text-fg">
              {copy.headline}
            </Text>
            <Text variant="body" tone="muted" className="lg:max-w-[420px]">
              {copy.intro}
            </Text>
          </div>

          <div className="flex flex-col gap-3.5 lg:mt-[30px] lg:items-end">
            <div className="flex gap-3 lg:flex-col lg:items-end">
              <button type="button" onClick={enter} className={buttonClass("primary", "max-lg:flex-1")}>
                {copy.enter} <Icon name="arrowDown" size={18} />
              </button>
              <Link to="/projects" className={buttonClass("ghost", "max-lg:flex-1 bg-night/40")}>
                {copy.skip}
              </Link>
            </div>
            <p className="type-body-sm hidden text-faint lg:block">{copy.scrollHint}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
