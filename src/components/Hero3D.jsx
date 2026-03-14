import React, { useMemo, useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Environment,
  Float,
  Sparkles,
  Stars,
  PerspectiveCamera,
  Html,
  useTexture,
} from '@react-three/drei';
import * as THREE from 'three';
import avatar from '../photo/ravel.png';

const Sun = () => {
  const meshRef = useRef();
  const texture = useTexture(avatar);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += 0.005;
    const t = state.clock.getElapsedTime();
    const scale = 3 + Math.sin(t * 0.5) * 0.1;
    meshRef.current.scale.set(scale, scale, scale);
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          emissive="#d4af37"
          emissiveIntensity={0.5}
          metalness={0.4}
          roughness={0.3}
        />
      </mesh>
      <pointLight intensity={10} color="#f9f295" distance={50} decay={1} />
      <Html distanceFactor={15}>
        <div className="text-accent-gold font-orbitron font-bold text-lg pointer-events-none select-none text-shadow-gold">
          RAVEL
        </div>
      </Html>
    </group>
  );
};

const Planet = ({ radius, speed, label, color, onClick }) => {
  const meshRef = useRef();
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    if (groupRef.current) {
      groupRef.current.position.x = Math.cos(t) * radius;
      groupRef.current.position.z = Math.sin(t) * radius;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh
          ref={meshRef}
          onClick={onClick}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          className="cursor-pointer"
        >
          <sphereGeometry args={[radius * 0.15, 32, 32]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 1 : 0.2}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      </Float>
      <Html distanceFactor={20} position={[0, radius * 0.2, 0]}>
        <div
          className={`px-2 py-1 rounded-md border border-white/20 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-widest whitespace-nowrap transition-all duration-300 ${hovered ? 'scale-110 border-accent-gold text-accent-gold bg-accent-gold/10' : 'opacity-60'}`}
        >
          {label}
        </div>
      </Html>
    </group>
  );
};

const Meteorite = ({ skill }) => {
  const meshRef = useRef();

  const [state] = useState(() => ({
    pos: new THREE.Vector3(
      (Math.random() - 0.5) * 40,
      (Math.random() - 0.5) * 40,
      (Math.random() - 0.5) * 40
    ),
    vel: new THREE.Vector3(
      (Math.random() - 0.5) * 0.02,
      (Math.random() - 0.5) * 0.02,
      (Math.random() - 0.5) * 0.02
    )
  }));
  const { pos, vel } = state;

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.position.add(vel);
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;

    // Wrap around
    if (Math.abs(meshRef.current.position.x) > 25) meshRef.current.position.x *= -1;
    if (Math.abs(meshRef.current.position.y) > 25) meshRef.current.position.y *= -1;
    if (Math.abs(meshRef.current.position.z) > 25) meshRef.current.position.z *= -1;
  });

  return (
    <group ref={meshRef} position={pos}>
      <mesh>
        <dodecahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial
          color="#888"
          metalness={0.8}
          roughness={0.4}
          emissive="#d4af37"
          emissiveIntensity={0.05}
        />
      </mesh>
      <Html distanceFactor={25} position={[0, 0.5, 0]}>
        <div className="text-[8px] font-bold text-white/40 uppercase tracking-tighter whitespace-nowrap">
          {skill}
        </div>
      </Html>
    </group>
  );
};

const SolarSystem = ({ skills, navigate }) => {
  const planets = [
    { label: 'À propos', route: '#/about', radius: 8, speed: 0.1, color: '#4facfe' },
    { label: 'Projets', route: '#/projects', radius: 12, speed: 0.07, color: '#00f2fe' },
    { label: 'Contact', route: '#/contact', radius: 16, speed: 0.05, color: '#f093fb' },
  ];

  const allSkills = useMemo(() => {
    if (!skills) return [];
    return skills.flatMap(group => group.skills);
  }, [skills]);

  return (
    <group>
      <Sun />
      {planets.map((planet, i) => (
        <Planet
          key={i}
          {...planet}
          onClick={() => navigate(planet.route)}
        />
      ))}
      {allSkills.map((skill, i) => (
        <Meteorite key={i} skill={skill} />
      ))}
    </group>
  );
};

const Hero3D = ({ skills, navigate }) => {
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
        <PerspectiveCamera makeDefault position={[0, 15, 25]} fov={isMobile ? 60 : 45} />
        <color attach="background" args={['#050505']} />

        <Suspense fallback={null}>
          <Stars
            radius={150}
            depth={50}
            count={isMobile ? 3000 : 7000}
            factor={6}
            saturation={0}
            fade
            speed={1}
          />
          <Sparkles
            count={isMobile ? 100 : 200}
            scale={[40, 40, 40]}
            size={isMobile ? 1 : 2}
            speed={0.5}
            color="#d4af37"
          />

          <ambientLight intensity={0.2} />

          <SolarSystem skills={skills} navigate={navigate} />

          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Hero3D;
