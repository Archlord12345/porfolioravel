import React, { useMemo, useRef, useState, useEffect } from 'react';
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

    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, mouse.y * 0.4, 0.05);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, mouse.x * 0.4, 0.05);

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

const HelixSpline = ({ radius, height, turns, tubeRadius, index }) => {
  const curve = useMemo(() => {
    const points = [];
    const segments = 100;
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const angle = t * Math.PI * 2 * turns;
      const x = Math.cos(angle) * radius;
      const y = (t - 0.5) * height;
      const z = Math.sin(angle) * radius;
      points.push(new THREE.Vector3(x, y, z));
    }
    return new THREE.CatmullRomCurve3(points);
  }, [radius, height, turns]);

  const meshRef = useRef();
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.1 * (index % 2 === 0 ? 1 : -1);
  });

  return (
    <mesh ref={meshRef}>
      <tubeGeometry args={[curve, 100, tubeRadius, 8, false]} />
      <meshBasicMaterial color="#d4af37" transparent opacity={0.15} />
    </mesh>
  );
};

const TorusKnotSpline = ({ params, index }) => {
  const curve = useMemo(() => {
    const { p, q, radius } = params;
    const points = [];
    const segments = 100;
    for (let i = 0; i <= segments; i++) {
      const t = (i / segments) * Math.PI * 2;
      const r = radius + Math.cos(p * t);
      const x = r * Math.cos(q * t);
      const y = r * Math.sin(q * t);
      const z = Math.sin(p * t);
      points.push(new THREE.Vector3(x, y, z));
    }
    return new THREE.CatmullRomCurve3(points, true);
  }, [params]);

  const meshRef = useRef();
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.05;
    meshRef.current.rotation.y = t * 0.08;
  });

  return (
    <mesh ref={meshRef}>
      <tubeGeometry args={[curve, 80, 0.015, 6, true]} />
      <meshBasicMaterial color="#d4af37" transparent opacity={0.12} />
    </mesh>
  );
};

const StructuredSplines = () => {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    const { mouse } = state;
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, mouse.x * 1.5, 0.05);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, mouse.y * 1.5, 0.05);
  });

  return (
    <group ref={groupRef}>
      <HelixSpline radius={8} height={20} turns={3} tubeRadius={0.02} index={0} />
      <HelixSpline radius={10} height={18} turns={2} tubeRadius={0.015} index={1} />
      <HelixSpline radius={12} height={16} turns={4} tubeRadius={0.018} index={2} />

      <TorusKnotSpline params={{ p: 3, q: 2, radius: 6 }} index={0} />
      <TorusKnotSpline params={{ p: 2, q: 3, radius: 8 }} index={1} />
      <TorusKnotSpline params={{ p: 5, q: 3, radius: 7 }} index={2} />
    </group>
  );
};

const Hero3D = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 bg-[#050505]">
      <Canvas
        dpr={[1, isMobile ? 1.5 : 2]}
        performance={{ min: 0.5 }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 18]} fov={isMobile ? 50 : 40} />
        <color attach="background" args={['#050505']} />

        <Stars
          radius={120}
          depth={60}
          count={isMobile ? 2000 : 4000}
          factor={5}
          saturation={0}
          fade
          speed={0.8}
        />
        <Sparkles
          count={isMobile ? 60 : 120}
          scale={[25, 25, 25]}
          size={isMobile ? 1 : 1.5}
          speed={0.3}
          color="#d4af37"
        />

        <ambientLight intensity={0.1} />
        <spotLight position={[15, 20, 10]} angle={0.2} penumbra={1} intensity={3} color="#f9f295" />
        <pointLight position={[-15, -10, -10]} intensity={1.5} color="#d4af37" />
        <pointLight position={[0, 0, 5]} intensity={0.5} color="#ffffff" />

        <MainShape />
        <StructuredSplines />

        <Environment preset="night" />
      </Canvas>
    </div>
  );
};

export default Hero3D;
