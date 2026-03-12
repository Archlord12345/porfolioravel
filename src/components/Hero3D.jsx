import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Environment,
  Float,
  MeshDistortMaterial,
  Sparkles,
  Stars,
  PerspectiveCamera,
} from '@react-three/drei';
import * as THREE from 'three';

const MainShape = () => {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    const { mouse, clock } = state;
    const t = clock.getElapsedTime();

    // Smooth mouse follow
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, mouse.y * 0.4, 0.05);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, mouse.x * 0.4, 0.05);

    // Continuous subtle pulse
    const scale = 1 + Math.sin(t * 0.5) * 0.05;
    meshRef.current.scale.set(scale, scale, scale);
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2.8, 15]} />
        <MeshDistortMaterial
          color="#d4af37"
          speed={2}
          distort={0.3}
          radius={1}
          metalness={0.9}
          roughness={0.1}
          emissive="#d4af37"
          emissiveIntensity={0.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </Float>
  );
};

const BackgroundSplines = () => {
  const count = 35;
  const curves = useMemo(() => {
    const arr = [];
    const seededRandom = (s) => {
      const x = Math.sin(s + 12.345) * 10000;
      return x - Math.floor(x);
    };
    for (let i = 0; i < count; i++) {
      const points = [];
      const radius = 12 + seededRandom(i) * 18;
      const angleStep = (Math.PI * 2) / 40;
      for (let j = 0; j < 40; j++) {
        const x = Math.cos(j * angleStep) * radius;
        const y = Math.sin(j * angleStep) * radius;
        const z = (seededRandom(i * 1.5 + j * 0.05) - 0.5) * 25;
        points.push(new THREE.Vector3(x, y, z));
      }
      arr.push(new THREE.CatmullRomCurve3(points, true));
    }
    return arr;
  }, []);

  const groupRef = useRef();
  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.z += 0.0005;
    const { mouse } = state;
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, mouse.x * 2, 0.05);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, mouse.y * 2, 0.05);
  });

  return (
    <group ref={groupRef}>
      {curves.map((curve, i) => (
        <mesh key={i}>
          <tubeGeometry args={[curve, 80, 0.012, 8, true]} />
          <meshBasicMaterial color="#d4af37" transparent opacity={0.08} />
        </mesh>
      ))}
    </group>
  );
};

const Hero3D = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-[#050505]">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 18]} fov={40} />
        <color attach="background" args={['#050505']} />

        <Stars radius={120} depth={60} count={4000} factor={5} saturation={0} fade speed={0.8} />
        <Sparkles count={120} scale={[25, 25, 25]} size={1.5} speed={0.3} color="#d4af37" />

        <ambientLight intensity={0.1} />
        <spotLight position={[15, 20, 10]} angle={0.2} penumbra={1} intensity={3} color="#f9f295" castShadow />
        <pointLight position={[-15, -10, -10]} intensity={1.5} color="#d4af37" />
        <pointLight position={[0, 0, 5]} intensity={0.5} color="#ffffff" />

        <MainShape />
        <BackgroundSplines />

        <Environment preset="night" />
      </Canvas>
    </div>
  );
};

export default Hero3D;
