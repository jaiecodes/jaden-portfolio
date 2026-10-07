// src/features/home/components/GardenScene.tsx
import { motion, useTransform, type MotionValue } from "motion/react";
import type { ReactNode } from "react";
import { useViewport } from "../../../hooks/useViewport";

const W = 1800;
const H = 1044;
/** The arch's centre in the scene, where the camera dollies to. */
const ARCH = { x: 900, y: 640 };

interface GardenSceneProps {
  /** 0 at the wall, 1 through the arch. */
  dolly: MotionValue<number>;
  /** Pointer position, -1…1 on each axis. */
  pointer: { x: MotionValue<number>; y: MotionValue<number> };
}

/** A scene layer that shifts with the pointer by `depth` (0 = fixed, 1 = nearest). */
const Depth = ({
  depth,
  pointer,
  children,
}: {
  depth: number;
  pointer: GardenSceneProps["pointer"];
  children: ReactNode;
}) => {
  const x = useTransform(pointer.x, (v) => v * depth * -24);
  const y = useTransform(pointer.y, (v) => v * depth * -14);
  return (
    <motion.div className="absolute inset-0" style={{ x, y }}>
      {children}
    </motion.div>
  );
};

/**
 * The garden entry (Figma: Home — Garden Entry): a stone wall, an archway
 * into a misty forest with mushrooms, and a lantern that swings and lights
 * the arch. Wall, arch and forest are separate depth layers with pointer
 * parallax; scrolling dollies the camera through the arch. Drawn to the
 * 1800×1044 frame and scaled to cover the screen around the arch.
 */
export const GardenScene = ({ dolly, pointer }: GardenSceneProps) => {
  const { width, height } = useViewport();
  const cover = Math.max(width / W, height / H);
  // Centre the arch horizontally; keep the frame's vertical framing.
  const left = width / 2 - ARCH.x * cover;
  const top = (height - H * cover) / 2;

  const zoom = useTransform(dolly, [0, 1], [1, 5.2]);
  const forestZoom = useTransform(dolly, [0, 1], [1, 2.4]);
  const fade = useTransform(dolly, [0.7, 1], [0, 1]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#091211]">
      <motion.div
        className="absolute"
        style={{
          width: W,
          height: H,
          left,
          top,
          scale: zoom,
          transformOrigin: `${ARCH.x * cover}px ${ARCH.y * cover}px`,
        }}
      >
        <div className="absolute top-0 left-0 origin-top-left" style={{ width: W, height: H, transform: `scale(${cover})` }}>
          <Depth depth={0.15} pointer={pointer}>
            <img src="/v2/home/stone-wall.svg" alt="" className="absolute inset-0 size-full" />
          </Depth>
          <Depth depth={0.7} pointer={pointer}>
            <motion.img
              src="/v2/home/arch-view.svg"
              alt=""
              className="absolute inset-0 size-full"
              style={{ scale: forestZoom, transformOrigin: `${ARCH.x}px ${ARCH.y}px` }}
            />
          </Depth>
          <Depth depth={0.3} pointer={pointer}>
            <img src="/v2/home/arch-stones.svg" alt="" className="absolute inset-0 size-full" />
            <div
              className="absolute left-[860px] top-[214px] h-[300px] w-[80px] origin-top"
              style={{ animation: "lantern-swing 5.5s ease-in-out infinite" }}
            >
              <div
                className="absolute top-[86px] left-[-170px] size-[420px] rounded-full mix-blend-screen"
                style={{
                  background: "radial-gradient(circle, rgb(255 191 89 / 0.35), rgb(255 191 89 / 0) 70%)",
                  animation: "lantern-flicker 3.2s ease-in-out infinite",
                }}
              />
              <img src="/v2/home/lantern.svg" alt="" className="absolute inset-0 size-full" />
            </div>
          </Depth>
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(75% 90% at 50% 50%, rgb(5 13 13 / 0) 45%, rgb(5 13 13 / 0.85) 100%)" }}
          />
        </div>
      </motion.div>
      <motion.div className="absolute inset-0 bg-night" style={{ opacity: fade }} />
    </div>
  );
};
