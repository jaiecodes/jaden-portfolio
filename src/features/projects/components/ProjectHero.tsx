import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useViewport } from "../../../hooks/useViewport";
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

  // Every layer is placed at its start-frame position, then moved, rotated,
  // scaled and faded towards the end frame. Rotation and scale pivot on the
  // layer's centre, matching how Figma rotates a node inside its bounds.
  return (
    <motion.img
      src={layer.src}
      alt=""
      aria-hidden
      style={{
        position: "absolute",
        zIndex: layer.zIndex,
        left: layer.position.left ?? 0,
        top: layer.position.top ?? 0,
        width: layer.position.width,
        maxWidth: "none",
        transformOrigin: "50% 50%",
        ...(layer.scaleY !== undefined && { scaleY: layer.scaleY }),
        x,
        y,
        rotate,
        scale,
        opacity,
      }}
    />
  );
};

// The display step (Satoshi Black, -2% tracking) held at its 96px desktop size:
// the whole 1800×1044 frame is scaled to the viewport, so the title must not
// step down on its own like type-display does.
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

// Portrait canvas the mobile frames are drawn to (Figma: "Project Hero Page
// Designs - Mobile").
const PHONE_W = 375;
const PHONE_H = 812;

/** The title as set in the mobile frames: display step at its 48px mobile size,
 *  top-left under the header. Fixed size because the phone canvas is scaled. */
const MOBILE_TITLE_CLASS =
  "font-satoshi font-black absolute m-0 uppercase select-none tracking-[-0.02em]";
const MOBILE_TITLE_STYLE = {
  left: 17,
  top: 132,
  width: 341,
  fontSize: 48,
  lineHeight: 1.35,
} as const;

export const ProjectHero = ({ title, theme }: ProjectHeroProps) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    // Progress spans only the pinned stretch (section top → section bottom
    // meeting the viewport bottom), so the end frame is reached while the
    // sticky stage is still on screen.
    offset: ["start start", "end end"],
  });

  // Animation completes at 75% of scroll travel, then holds at the end frame
  // so the user sees the final state before the next section scrolls into view
  const animProgress = useTransform(scrollYProgress, [0, 0.75, 1], [0, 1, 1]);

  // Mobile framing: the scene pans from the start to the end offset.
  const frame = theme?.mobile;
  const panX = useTransform(animProgress, [0, 1], [frame?.start.x ?? 0, frame?.end.x ?? 0]);
  const panY = useTransform(animProgress, [0, 1], [frame?.start.y ?? 0, frame?.end.y ?? 0]);

  const viewport = useViewport();

  if (!theme) return <FallbackHero title={title} />;

  const titleLines = theme.titleLines ?? [title];
  const layers = theme.layers.map((layer) => (
    <HeroLayerRenderer key={layer.src} layer={layer} scrollYProgress={animProgress} />
  ));

  // Portrait screens use the phone framing when the project has one.
  const usePhone = viewport.portrait && !!frame;
  // Fit the 375×812 canvas to the screen height and centre it; on screens
  // wider than the canvas the scene simply shows more on either side.
  const phoneScale = viewport.height / PHONE_H;

  return (
    <section
      ref={targetRef}
      className="relative h-[250vh]"
      style={{ background: theme.background }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {usePhone && frame ? (
          <div
            style={{
              position: "absolute",
              width: PHONE_W,
              height: PHONE_H,
              left: (viewport.width - PHONE_W * phoneScale) / 2,
              top: 0,
              transformOrigin: "top left",
              transform: `scale(${phoneScale})`,
            }}
          >
            <motion.div
              style={{
                position: "absolute",
                width: DESIGN_W,
                height: DESIGN_H,
                transformOrigin: "top left",
                x: panX,
                y: panY,
                scale: frame.scale,
              }}
            >
              {layers}
            </motion.div>
            <h1
              className={MOBILE_TITLE_CLASS}
              style={{ ...MOBILE_TITLE_STYLE, color: theme.textColor, zIndex: 100 }}
            >
              {titleLines.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h1>
          </div>
        ) : (
          /* 1800×1044 Figma design frame, scaled proportionally to fill the viewport width */
          <div
            style={{
              position: "absolute",
              width: DESIGN_W,
              height: DESIGN_H,
              transformOrigin: "top left",
              transform: `scale(${viewport.width / DESIGN_W})`,
            }}
          >
            <h1
              className={TITLE_CLASS}
              style={{ ...TITLE_STYLE, color: theme.textColor, zIndex: theme.titleZIndex }}
            >
              {titleLines.map((line, i) => (
                <span key={i} style={{ display: "block", whiteSpace: "nowrap" }}>
                  {line}
                </span>
              ))}
            </h1>
            {layers}
          </div>
        )}
      </div>
    </section>
  );
};
