// src/features/about/components/HeroModel.tsx
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

/** The interactive 3D piece beside the About intro. */
export const HeroModel = () => (
  <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
    <ambientLight intensity={0.6} />
    <directionalLight position={[5, 5, 5]} intensity={1.2} />
    <pointLight position={[-5, -3, 2]} intensity={0.6} color="#efc139" />
    {/* Placeholder model — swap for a real .glb when available */}
    <mesh>
      <icosahedronGeometry args={[1.6, 0]} />
      <meshStandardMaterial
        color="#4db36f"
        flatShading
        metalness={0.25}
        roughness={0.4}
      />
    </mesh>
    <OrbitControls
      enableZoom={false}
      enablePan={false}
      autoRotate
      autoRotateSpeed={1.2}
    />
  </Canvas>
);
