import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Sphere, MeshDistortMaterial, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const seededRandom = (seed) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
};

const Slines = () => {
    const lineCount = 60;
    const lines = useMemo(() => {
        const tempLines = [];
        for (let i = 0; i < lineCount; i++) {
            const points = [];
            const radius = 8 + seededRandom(i * 100) * 12;
            const speed = 0.02 + seededRandom(i * 200) * 0.05;
            const offset = seededRandom(i * 300) * Math.PI * 2;
            const height = (seededRandom(i * 400) - 0.5) * 30;

            for (let j = 0; j <= 60; j++) {
                const t = (j / 60) * Math.PI * 2;
                points.push(new THREE.Vector3(
                    Math.cos(t) * radius,
                    height + Math.sin(t * 2) * 2,
                    (j / 60 - 0.5) * 40
                ));
            }
            tempLines.push({
                path: new THREE.CatmullRomCurve3(points),
                speed,
                offset,
                id: i,
                color: seededRandom(i * 500) > 0.5 ? "#d4af37" : "#e5e4e2"
            });
        }
        return tempLines;
    }, []);

    return (
        <group>
            {lines.map((line) => (
                <Line key={line.id} line={line} />
            ))}
        </group>
    );
};

const Line = ({ line }) => {
    const meshRef = useRef();
    useFrame((state) => {
        const time = state.clock.getElapsedTime() * line.speed;
        meshRef.current.rotation.z = time + line.offset;
        meshRef.current.rotation.y = Math.sin(time * 0.5) * 0.2;
    });

    return (
        <mesh ref={meshRef}>
            <tubeGeometry args={[line.path, 128, 0.015, 8, false]} />
            <meshStandardMaterial
                color={line.color}
                emissive={line.color}
                emissiveIntensity={1.2}
                transparent
                opacity={0.4}
            />
        </mesh>
    );
};

const Hero3D = () => {
    return (
        <div className="fixed inset-0 -z-10 bg-bg-dark">
            <Canvas camera={{ position: [0, 0, 20], fov: 60 }} dpr={[1, 2]}>
                <color attach="background" args={['#050505']} />

                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <Sparkles count={200} scale={[20, 20, 20]} size={2} speed={0.5} color="#d4af37" />

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

                <Slines />
                <Environment preset="night" />
            </Canvas>
        </div>
    );
};

export default Hero3D;
