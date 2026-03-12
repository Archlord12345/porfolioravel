import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Environment,
  Float,
  MeshDistortMaterial,
  RoundedBox,
  Sparkles,
  Stars,
  Text,
  Torus,
} from '@react-three/drei';
import * as THREE from 'three';

const seededRandom = (seed) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const TechSplines = () => {
  const lineCount = 84;

  const lines = useMemo(() => {
    const generatedLines = [];

    for (let i = 0; i < lineCount; i += 1) {
      const points = [];
      const radius = 5 + seededRandom(i * 100) * 14;
      const speed = 0.04 + seededRandom(i * 200) * 0.1;
      const offset = seededRandom(i * 300) * Math.PI * 2;
      const height = (seededRandom(i * 400) - 0.5) * 20;
      const waveAmp = 1 + seededRandom(i * 500) * 2.4;

      for (let j = 0; j <= 80; j += 1) {
        const t = (j / 80) * Math.PI * 2;
        points.push(
          new THREE.Vector3(
            Math.cos(t) * radius,
            height + Math.sin(t * 2.8 + offset) * waveAmp,
            (j / 80 - 0.5) * 45,
          ),
        );
      }

      generatedLines.push({
        id: i,
        speed,
        offset,
        path: new THREE.CatmullRomCurve3(points),
        color: seededRandom(i * 600) > 0.45 ? '#d4af37' : '#8cc8ff',
      });
    }

    return generatedLines;
  }, []);

  return (
    <group>
      {lines.map((line) => (
        <SplineLine key={line.id} line={line} />
      ))}
    </group>
  );
};

const SplineLine = ({ line }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;

    const elapsed = state.clock.getElapsedTime() * line.speed;
    meshRef.current.rotation.z = elapsed + line.offset;
    meshRef.current.rotation.y = Math.sin(elapsed * 0.8) * 0.22;
  });

  return (
    <mesh ref={meshRef}>
      <tubeGeometry args={[line.path, 220, 0.013, 8, false]} />
      <meshStandardMaterial
        color={line.color}
        emissive={line.color}
        emissiveIntensity={1.1}
        transparent
        opacity={0.38}
      />
    </mesh>
  );
};

const TechStation = ({ position, rotation = [0, 0, 0], accent = '#d4af37' }) => (
  <group position={position} rotation={rotation}>
    <RoundedBox args={[1.3, 0.8, 0.08]} radius={0.08} smoothness={4} position={[0, 0.65, 0]}>
      <meshStandardMaterial color="#121722" metalness={0.5} roughness={0.35} />
    </RoundedBox>
    <mesh position={[0, 0.65, 0.05]}>
      <planeGeometry args={[1.1, 0.58]} />
      <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.35} />
    </mesh>
    <RoundedBox args={[1.5, 0.12, 0.6]} radius={0.08} smoothness={4} position={[0, 0.1, 0]}>
      <meshStandardMaterial color="#252a36" metalness={0.65} roughness={0.28} />
    </RoundedBox>
    <RoundedBox args={[0.95, 0.05, 0.28]} radius={0.06} smoothness={4} position={[0, 0.2, 0.28]}>
      <meshStandardMaterial color="#cfd7ea" metalness={0.3} roughness={0.6} />
    </RoundedBox>
  </group>
);

const Robot = () => {
  const robotRef = useRef();

  useFrame((state) => {
    if (!robotRef.current) return;
    const t = state.clock.getElapsedTime();
    robotRef.current.position.y = Math.sin(t * 1.5) * 0.16 - 0.45;
    robotRef.current.rotation.y = Math.sin(t * 0.75) * 0.3;
  });

  return (
    <group ref={robotRef} position={[3.7, -0.5, -1]}>
      <RoundedBox args={[0.8, 0.95, 0.45]} radius={0.16} smoothness={5}>
        <meshStandardMaterial color="#e5e4e2" metalness={0.9} roughness={0.2} />
      </RoundedBox>
      <RoundedBox args={[0.55, 0.45, 0.42]} radius={0.1} smoothness={4} position={[0, 0.82, 0]}>
        <meshStandardMaterial color="#141a26" metalness={0.7} roughness={0.25} />
      </RoundedBox>
      <mesh position={[-0.12, 0.83, 0.22]}>
        <sphereGeometry args={[0.045, 20, 20]} />
        <meshStandardMaterial color="#8cc8ff" emissive="#8cc8ff" emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[0.12, 0.83, 0.22]}>
        <sphereGeometry args={[0.045, 20, 20]} />
        <meshStandardMaterial color="#d4af37" emissive="#d4af37" emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
};

const Companion = () => {
  const companionRef = useRef();
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = useMemo(
    () => [
      'Deploy en cours...',
      'API check: OK',
      'Nouveau prototype 3D prêt',
      'Bienvenue sur le portfolio tech',
    ],
    [],
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2600);

    return () => clearInterval(interval);
  }, [messages.length]);

  useFrame((state) => {
    if (!companionRef.current) return;
    const t = state.clock.getElapsedTime();
    companionRef.current.position.x = Math.sin(t * 0.8) * 4.2;
    companionRef.current.position.y = 1.45 + Math.sin(t * 1.8) * 0.45;
    companionRef.current.position.z = Math.cos(t * 0.55) * 1.35;
    companionRef.current.rotation.y = Math.sin(t * 0.7) * 0.45;
  });

  return (
    <group ref={companionRef}>
      <Torus args={[0.38, 0.08, 16, 48]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#8cc8ff" emissive="#8cc8ff" emissiveIntensity={0.9} />
      </Torus>
      <mesh>
        <sphereGeometry args={[0.14, 24, 24]} />
        <meshStandardMaterial color="#d4af37" emissive="#d4af37" emissiveIntensity={0.65} />
      </mesh>
      <Text
        position={[0, 0.62, 0]}
        fontSize={0.16}
        maxWidth={3.2}
        anchorX="center"
        anchorY="middle"
        color="#e6f4ff"
      >
        {messages[messageIndex]}
      </Text>
    </group>
  );
};

const Hero3D = () => (
  <div className="fixed inset-0 -z-10 bg-bg-dark">
    <Canvas camera={{ position: [0, 0, 20], fov: 60 }} dpr={[1, 2]}>
      <color attach="background" args={['#050505']} />

      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={220} scale={[20, 20, 20]} size={2} speed={0.5} color="#d4af37" />

      <ambientLight intensity={0.28} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2.2} color="#d4af37" />
      <pointLight position={[-10, -10, -10]} intensity={1.2} color="#8cc8ff" />

      <Float speed={3} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[0, 0, 0]}>
          <icosahedronGeometry args={[1.8, 4]} />
          <MeshDistortMaterial
            color="#d4af37"
            attach="material"
            distort={0.35}
            speed={2}
            roughness={0.1}
            metalness={1}
            emissive="#d4af37"
            emissiveIntensity={0.22}
          />
        </mesh>
      </Float>

      <TechStation position={[-4.1, -2.25, -1.5]} rotation={[0.12, 0.3, 0]} accent="#8cc8ff" />
      <TechStation position={[4.3, -2.1, -2.5]} rotation={[0.08, -0.2, 0]} accent="#d4af37" />
      <Robot />
      <Companion />
      <TechSplines />
      <Environment preset="night" />
    </Canvas>
  </div>
);

export default Hero3D;
