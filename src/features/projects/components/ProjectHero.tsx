import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState, useEffect } from "react";
import type { MotionValue } from "motion/react";
import type {
  HeroLayer,
  HeroThemeData,
} from "../../../domain/models/HeroTheme";

const DESIGN_W = 1800;
const DESIGN_H = 1044;

// Each layer is its own component so hooks are always called in consistent order
const HeroLayerRenderer = ({
  layer,
  scrollYProgress,
}: {
  layer: HeroLayer;
  scrollYProgress: MotionValue<number>;
}) => {
  const get = (prop: "x" | "y" | "rotate" | "scale" | "opacity") =>
    layer.transforms.find((t) => t.property === prop);

  const xt = get("x");
  const yt = get("y");
  const rt = get("rotate");
  const st = get("scale");
  const ot = get("opacity");

  // All 5 hooks called unconditionally; unused transforms get neutral no-op values
  const x = useTransform(
    scrollYProgress,
    xt?.input ?? [0, 1],
    xt?.output ?? ["0px", "0px"],
  );
  const y = useTransform(
    scrollYProgress,
    yt?.input ?? [0, 1],
    yt?.output ?? ["0px", "0px"],
  );
  const rotate = useTransform(
    scrollYProgress,
    rt?.input ?? [0, 1],
    rt?.output ?? [0, 0],
  );
  const scale = useTransform(
    scrollYProgress,
    st?.input ?? [0, 1],
    st?.output ?? [1, 1],
  );
  const opacity = useTransform(
    scrollYProgress,
    ot?.input ?? [0, 1],
    ot?.output ?? [1, 1],
  );

  const isRotating = !!rt;

  return (
    <motion.img
      src={layer.src}
      alt=""
      aria-hidden
      style={{
        position: "absolute",
        zIndex: layer.zIndex,
        left: isRotating ? layer.position.left : 0,
        top: isRotating ? layer.position.top : 0,
        width: layer.position.width,
        maxWidth: "none",
        ...(layer.scaleY !== undefined && { scaleY: layer.scaleY }),
        ...(isRotating ? { rotate, transformOrigin: "50% 50%" } : { x, y }),
        scale,
        opacity,
      }}
    />
  );
};

// Satoshi Variable Black, 96px/130px, -2% tracking — positioned in the 1800×1044 Figma frame
const TITLE_CLASS =
  "font-satoshi font-black absolute m-0 text-[6rem] leading-[130px] tracking-[-0.02em] uppercase text-right select-none";

const TITLE_STYLE = {
  top: "300px",
  right: "325px",
  width: "max-content",
} as const;

const FallbackHero = ({ title }: { title: string }) => (
  <section className="relative h-[250vh] bg-zinc-950">
    <div className="sticky top-0 h-screen w-full overflow-hidden">
      <h1 className={`${TITLE_CLASS} text-white`} style={TITLE_STYLE}>
        {title}
      </h1>
    </div>
  </section>
);

interface ProjectHeroProps {
  title: string;
  theme: HeroThemeData | undefined;
}

export const ProjectHero = ({ title, theme }: ProjectHeroProps) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  // Animation completes at 75% of scroll travel, then holds at the end frame
  // so the user sees the final state before the next section scrolls into view
  const animProgress = useTransform(scrollYProgress, [0, 0.75, 1], [0, 1, 1]);

  const [designScale, setDesignScale] = useState(
    () => window.innerWidth / DESIGN_W,
  );

  useEffect(() => {
    const update = () => setDesignScale(window.innerWidth / DESIGN_W);
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  if (!theme) return <FallbackHero title={title} />;

  return (
    <section
      ref={targetRef}
      className="relative h-[250vh]"
      style={{ background: theme.background }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* 1800×1044 Figma design frame, scaled proportionally to fill the viewport width */}
        <div
          style={{
            position: "absolute",
            width: DESIGN_W,
            height: DESIGN_H,
            transformOrigin: "top left",
            transform: `scale(${designScale})`,
          }}
        >
          <h1
            className={TITLE_CLASS}
            style={{
              ...TITLE_STYLE,
              color: theme.textColor,
              zIndex: theme.titleZIndex,
            }}
          >
            {theme.titleLines
              ? theme.titleLines.map((line, i) => (
                  <span
                    key={i}
                    style={{ display: "block", whiteSpace: "nowrap" }}
                  >
                    {line}
                  </span>
                ))
              : title}
          </h1>

          {theme.layers.map((layer) => (
            <HeroLayerRenderer
              key={layer.src}
              layer={layer}
              scrollYProgress={animProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
