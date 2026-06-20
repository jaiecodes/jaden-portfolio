// src/components/ui/AnimatedStroke.tsx
import { motion } from "motion/react";

interface AnimatedStrokeProps {
  type: "shooting-star" | "nav-underline";
  isActive?: boolean;
}

export const AnimatedStroke = ({
  type,
  isActive = true,
}: AnimatedStrokeProps) => {
  // Styles for the Shooting Star loop
  if (type === "shooting-star") {
    return (
      <div className="absolute bottom-0 left-0 h-[3px] w-full overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="flex h-full"
          style={{ width: "200%" }}
        >
          <div
            className="w-1/2 h-full"
            style={{
              background:
                "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.8) 75%, rgba(255,255,255,0) 100%)",
            }}
          />
          <div
            className="w-1/2 h-full"
            style={{
              background:
                "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.8) 75%, rgba(255,255,255,0) 100%)",
            }}
          />
        </motion.div>
      </div>
    );
  }

  // Styles for the Nav Underline (Work/About tabs)
  return (
    <div className="h-[2px] w-full flex justify-center mt-1">
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{
          width: isActive ? "100%" : "0%",
          opacity: isActive ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="h-full w-full"
        style={{
          background:
            "linear-gradient(90deg, rgba(69, 161, 99, 0) 0%, #45A163 25%, #EFC139 50%, #C27927 75%, rgba(194, 121, 39, 0) 100%)",
          boxShadow: "0px -2px 6.5px rgba(255, 255, 255, 0.2)",
        }}
      />
    </div>
  );
};
