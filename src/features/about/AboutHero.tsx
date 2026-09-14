// src/features/about/AboutHero.tsx
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion } from "motion/react";

export const AboutHero = () => {
  return (
    <section className="h-screen flex flex-col items-center justify-center pt-[100px]">
      <div className="flex flex-col md:flex-row items-center gap-12 max-w-6xl w-full px-8">
        {/* Left Side: Text & Socials */}
        <div className="flex-1 space-y-6">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-borel"
          >
            hi, i'm jaden.
          </motion.h1>

          <p className="text-zinc-400 max-w-xl">
            a computer science graduate from UIUC. specializing in computer
            graphics and real-time rendering. currently building tools for the
            future of boating simulation.
          </p>

          {/* Socials Area */}
          <div className="flex gap-4 pt-4">
            {/* Replace with your actual icons/links */}
            <a
              href="#"
              className="caption-btn px-4 py-3 border border-white/10 rounded-full hover:bg-white/5 transition-all no-underline"
            >
              LinkedIn
            </a>
            <a
              href="#"
              className="caption-btn px-4 py-3 border border-white/10 rounded-full hover:bg-white/5 transition-all no-underline"
            >
              GitHub
            </a>
            <a
              href="#"
              className="caption-btn px-4 py-3 border border-white/10 rounded-full hover:bg-white/5 transition-all no-underline"
            >
              Email
            </a>
          </div>
        </div>

        {/* Right Side: 3D Interactable Model */}
        <div className="flex-1 h-[500px] w-full cursor-pointer">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <OrbitControls enableZoom={false} />
            {/* Placeholder for your model. 
                You can add an onClick event to the mesh to trigger a 'wave' animation. 
            */}
            <mesh onClick={() => console.log("Wave animation triggered!")}>
              <boxGeometry args={[2, 3, 0.5]} />
              <meshStandardMaterial color="#45A163" />
            </mesh>
          </Canvas>
          <h5 className="text-center text-zinc-500 text-sm mt-4">
            (click to say hi!)
          </h5>
        </div>
      </div>
    </section>
  );
};
