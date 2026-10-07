// src/features/about/components/ModelStage.tsx
import { useRef, useState } from "react";
import { motion, useSpring } from "motion/react";
import { AboutService } from "../../../domain/services/AboutService";

/**
 * The self-model on its mossy rock, rim-lit by a lantern (Figma: 3D model
 * stage, no box). Drawn to a 760×860 stage and scaled to fit. The figure is
 * a placeholder until the real model is ready: it idles, and dragging turns
 * it, springing back when let go.
 */
export const ModelStage = () => {
  const rotate = useSpring(0, { stiffness: 120, damping: 14 });
  const drag = useRef<{ x: number; start: number } | null>(null);
  const [grabbing, setGrabbing] = useState(false);

  return (
    <div className="relative mx-auto aspect-[760/860] w-full max-w-[760px] select-none">
      <div className="absolute inset-0 origin-top-left" style={{ containerType: "inline-size" }}>
        {/* Positions are percentages of the 760×860 stage */}
        <img src="/v2/about/moonlight-halo.svg" alt="" aria-hidden className="absolute top-[7%] left-[3.9%] w-[92%]" />
        <div
          aria-hidden
          className="absolute top-[-7%] left-[73.7%] w-[7.9%] origin-top"
          style={{ animation: "lantern-swing 5s ease-in-out infinite" }}
        >
          <img src="/v2/about/lantern-key.svg" alt="" className="w-full" />
        </div>
        <img
          src="/v2/about/lantern-glow.svg"
          alt=""
          aria-hidden
          className="absolute top-[4.7%] left-[57.9%] w-[39.5%] mix-blend-screen"
          style={{ animation: "lantern-flicker 3.2s ease-in-out infinite" }}
        />
        <img src="/v2/about/mossy-rock.svg" alt="" aria-hidden className="absolute top-[74.4%] left-[13.2%] w-[73.7%]" />

        <motion.div
          role="img"
          aria-label="Jaden, standing on a mossy rock (3D model coming soon)"
          className={`absolute top-[17.5%] left-[34.2%] w-[33.6%] touch-none ${grabbing ? "cursor-grabbing" : "cursor-grab"}`}
          style={{ rotateY: rotate, transformPerspective: 900 }}
          onPointerDown={(e) => {
            drag.current = { x: e.clientX, start: rotate.get() };
            setGrabbing(true);
            e.currentTarget.setPointerCapture(e.pointerId);
          }}
          onPointerMove={(e) => {
            if (drag.current) rotate.set(Math.max(-70, Math.min(70, drag.current.start + (e.clientX - drag.current.x) * 0.6)));
          }}
          onPointerUp={() => {
            drag.current = null;
            setGrabbing(false);
            rotate.set(0);
          }}
        >
          <img
            src="/v2/about/model-placeholder.svg"
            alt=""
            draggable={false}
            className="w-full"
            style={{ animation: "idle-bob 4.5s ease-in-out infinite" }}
          />
        </motion.div>

        <p className="type-body-sm absolute top-[98.8%] left-1/2 -translate-x-1/2 rounded-full border border-line bg-night px-3.5 py-[7px] whitespace-nowrap text-muted">
          {AboutService.getModelHint()}
        </p>
      </div>
    </div>
  );
};
