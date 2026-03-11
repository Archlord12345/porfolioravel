import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, MeshDistortMaterial, Sphere, Sparkles, Stars } from '@react-three/drei';
import * as THREE from 'three';

const seededRandom = (seed) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const Splines = () => {
  const lineCount = 72;

  const lines = useMemo(() => {
    const generatedLines = [];

    for (let i = 0; i < lineCount; i += 1) {
      const points = [];
      const radius = 6 + seededRandom(i * 100) * 16;
      const speed = 0.02 + seededRandom(i * 200) * 0.06;
      const offset = seededRandom(i * 300) * Math.PI * 2;
      const height = (seededRandom(i * 400) - 0.5) * 22;
      const waveAmp = 1 + seededRandom(i * 500) * 2;

      for (let j = 0; j <= 80; j += 1) {
        const t = (j / 80) * Math.PI * 2;
        points.push(
          new THREE.Vector3(
            Math.cos(t) * radius,
            height + Math.sin(t * 3 + offset) * waveAmp,
            (j / 80 - 0.5) * 44,
          ),
        );
      }

      generatedLines.push({
        id: i,
        speed,
        offset,
        path: new THREE.CatmullRomCurve3(points),
        color: seededRandom(i * 600) > 0.52 ? '#d4af37' : '#e5e4e2',
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
    meshRef.current.rotation.y = Math.sin(elapsed * 0.8) * 0.25;
  });

  return (
    <mesh ref={meshRef}>
      <tubeGeometry args={[line.path, 180, 0.014, 8, false]} />
      <meshStandardMaterial
        color={line.color}
        emissive={line.color}
        emissiveIntensity={1.1}
        transparent
        opacity={0.4}
      />
    </mesh>
  );
};

const Hero3D = () => (
  <div className="fixed inset-0 -z-10 bg-bg-dark">
    <Canvas camera={{ position: [0, 0, 20], fov: 60 }} dpr={[1, 2]}>
      <color attach="background" args={['#050505']} />

      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={220} scale={[20, 20, 20]} size={2} speed={0.5} color="#d4af37" />

      <ambientLight intensity={0.2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#d4af37" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#e5e4e2" />

      <Float speed={3} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[2, 128, 128]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#d4af37"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.1}
            metalness={1}
            emissive="#d4af37"
            emissiveIntensity={0.2}
          />
        </Sphere>
      </Float>

      <Splines />
      <Environment preset="night" />
    </Canvas>
  </div>
);

export default Hero3D;
