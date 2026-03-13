import React, { useMemo, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';

const FloatingIcon = ({ position, scale, speed, icon }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * speed;
    meshRef.current.rotation.y = t * speed * 0.7;
    meshRef.current.position.y += Math.sin(t * speed) * 0.003;
  });

  const colors = ['#d4af37', '#00ff88', '#0088ff', '#ff0088', '#ffff00'];
  const color = colors[Math.floor(Math.random() * colors.length)];

  return (
    <Float speed={speed} rotationIntensity={0.3} floatIntensity={0.4}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
};

const OrbitingElement = ({ radius, speed, index, total }) => {
  const meshRef = useRef();
  const angle = (index / total) * Math.PI * 2;

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime() * speed;
    meshRef.current.position.x = Math.cos(angle + t) * radius;
    meshRef.current.position.z = Math.sin(angle + t) * radius;
    meshRef.current.rotation.x = t;
    meshRef.current.rotation.y = t * 0.5;
  });

  return (
    <mesh ref={meshRef}>
      <octahedronGeometry args={[0.4, 2]} />
      <meshStandardMaterial
        color="#d4af37"
        emissive="#d4af37"
        emissiveIntensity={0.2}
        metalness={0.9}
        roughness={0.1}
      />
    </mesh>
  );
};

const DynamicSplineField = ({ isMobile }) => {
  const groupRef = useRef();
  const elements = useMemo(() => {
    return Array.from({ length: isMobile ? 6 : 12 }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 30,
      ],
      scale: Math.random() * 0.4 + 0.2,
      speed: Math.random() * 0.8 + 0.3,
    }));
  }, [isMobile]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const { mouse } = state;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mouse.y * 0.3,
      0.05
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouse.x * 0.3,
      0.05
    );
  });

  return (
    <group ref={groupRef}>
      {elements.map((el) => (
        <FloatingIcon
          key={el.id}
          position={el.position}
          scale={el.scale}
          speed={el.speed}
          icon={el.id}
        />
      ))}
      {Array.from({ length: isMobile ? 4 : 8 }, (_, i) => (
        <OrbitingElement
          key={`orbit-${i}`}
          radius={8 + i * 2}
          speed={0.3 + i * 0.05}
          index={i}
          total={8}
        />
      ))}
    </group>
  );
};

const TechSpline = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="w-full h-[400px] md:h-[500px]">
      <Canvas
        dpr={[1, isMobile ? 1.5 : 2]}
        performance={{ min: 0.5 }}
        camera={{ position: [0, 0, 25], fov: isMobile ? 50 : 40 }}
      >
        <PerspectiveCamera makeDefault />
        <color attach="background" args={['#050505']} />

        <Sparkles
          count={isMobile ? 30 : 60}
          scale={[30, 30, 30]}
          size={isMobile ? 0.8 : 1.2}
          speed={0.2}
          color="#d4af37"
        />

        <ambientLight intensity={0.15} />
        <pointLight position={[20, 20, 20]} intensity={2} color="#d4af37" />
        <pointLight position={[-20, -20, 20]} intensity={1} color="#00ff88" />

        <DynamicSplineField isMobile={isMobile} />

        <Environment preset="night" />
      </Canvas>
    </div>
  );
};

export default TechSpline;
