'use client';

import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, MeshDistortMaterial, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { Suspense } from 'react';
import { useInView } from 'framer-motion';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

/* ─────────────────────────────────────────────
   Hero3D — Cinematic R3F scene for the hero section.

   Scene contents:
   1. GoldParticleField — 1500 drifting gold particles
   2. SneakerPedestal   — Reflective chrome disc +
                          floating distorted gem (placeholder
                          until real sneaker GLB is ready)
   3. CameraRig         — Mouse-driven damped camera orbit
   4. Lighting          — Gold rim lights + ambient
   5. Environment       — HDRI for reflections

   Accessibility: all animation is paused when
   prefers-reduced-motion is active.
   ───────────────────────────────────────────── */

// ─── Gold constants ────────────────────────────
const GOLD = new THREE.Color('#c5a43a');
const GOLD_DIM = new THREE.Color('#8a6f22');

/* ── 1. Particle Field ──────────────────────── */
function GoldParticleField({ count = 1500, reduced }: { count?: number; reduced: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const timer = useRef(new THREE.Timer());

  // Build particle positions in a galaxy/disc spread
  const [[positions, velocities]] = useState(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Distribute in a shallow disc with spiral bias
      const angle = Math.random() * Math.PI * 2;
      const radius = 2 + Math.random() * 5;
      const spread = (Math.random() - 0.5) * 2.5;
      pos[i * 3 + 0] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = spread;
      pos[i * 3 + 2] = Math.sin(angle) * radius - 2; // push back in Z
      // Unique drift phase per particle
      vel[i * 3 + 0] = Math.random() * Math.PI * 2;
      vel[i * 3 + 1] = Math.random() * Math.PI * 2;
      vel[i * 3 + 2] = 0.2 + Math.random() * 0.4;   // drift speed
    }
    return [pos, vel];
  });

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions.slice(), 3));
    return g;
  }, [positions]);

  useFrame(() => {
    if (reduced || !ref.current) return;
    timer.current.update();
    const t = timer.current.getElapsed();
    const posAttr = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      const speed = velocities[i * 3 + 2];
      posAttr.array[i * 3 + 1] = (positions[i * 3 + 1] + Math.sin(t * speed + velocities[i * 3]) * 0.2) as unknown as number;
    }
    posAttr.needsUpdate = true;
    // Slow galaxy spin
    ref.current.rotation.y = t * 0.04;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        color={GOLD}
        size={0.018}
        sizeAttenuation
        transparent
        opacity={0.55}
        depthWrite={false}
      />
    </points>
  );
}

/* ── 2. Sneaker Pedestal (abstract stand-in) ─── */
function SneakerPedestal({ reduced }: { reduced: boolean }) {
  const gemRef = useRef<THREE.Mesh>(null);
  const discRef = useRef<THREE.Mesh>(null);
  const timer = useRef(new THREE.Timer());

  useFrame(() => {
    if (reduced) return;
    timer.current.update();
    const t = timer.current.getElapsed();
    if (gemRef.current) {
      // Float up and down
      gemRef.current.position.y = Math.sin(t * 0.7) * 0.12;
      // Slow Y rotation
      gemRef.current.rotation.y = t * 0.35;
      gemRef.current.rotation.x = t * 0.18;
    }
    if (discRef.current) {
      // Subtle disc breathe
      const s = 1 + Math.sin(t * 0.5) * 0.02;
      discRef.current.scale.set(s, 1, s);
    }
  });

  return (
    <group position={[0, -0.2, 0]}>
      {/* Reflective chrome base disc */}
      <mesh ref={discRef} position={[0, -0.55, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.1, 1.1, 0.04, 64]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={1}
          roughness={0.05}
          envMapIntensity={2}
        />
      </mesh>

      {/* Thin pedestal post */}
      <mesh position={[0, -0.28, 0]}>
        <cylinderGeometry args={[0.04, 0.06, 0.5, 16]} />
        <meshStandardMaterial
          color={GOLD_DIM}
          metalness={0.9}
          roughness={0.15}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Abstract floating gem — stands in for sneaker */}
      <Float
        speed={reduced ? 0 : 1.2}
        rotationIntensity={reduced ? 0 : 0.3}
        floatIntensity={reduced ? 0 : 0.6}
      >
        <mesh ref={gemRef} position={[0, 0.15, 0]} castShadow>
          <icosahedronGeometry args={[0.55, 1]} />
          <MeshDistortMaterial
            color={GOLD}
            metalness={0.85}
            roughness={0.08}
            distort={reduced ? 0 : 0.18}
            speed={reduced ? 0 : 1.5}
            envMapIntensity={3}
          />
        </mesh>
      </Float>
    </group>
  );
}

/* ── 3. Camera Rig — mouse-following orbit ───── */
function CameraRig({ reduced }: { reduced: boolean }) {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const target = useRef(new THREE.Vector3(0, 0, 5));
  const timer = useRef(new THREE.Timer());

  // Track mouse globally
  if (typeof window !== 'undefined') {
    // Safe — only in useEffect inside Canvas but we capture once here
  }

  useFrame(({ pointer }) => {
    if (reduced) return;
    timer.current.update();
    const t = timer.current.getElapsed();

    // pointer is already -1..1 in R3F
    mouse.current.x = pointer.x;
    mouse.current.y = pointer.y;

    // Auto-orbit + mouse deviation
    const orbitAngle = t * 0.08;
    const orbitRadius = 4.8;
    const targetX = Math.sin(orbitAngle) * orbitRadius * 0.15 + mouse.current.x * 0.6;
    const targetY = mouse.current.y * 0.4 + 0.1;
    const targetZ = 5 + Math.cos(orbitAngle) * 0.3;

    // Damp toward targets (lerp factor)
    target.current.x += (targetX - target.current.x) * 0.04;
    target.current.y += (targetY - target.current.y) * 0.04;
    target.current.z += (targetZ - target.current.z) * 0.02;

    camera.position.set(target.current.x, target.current.y, target.current.z);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ── 4. The Full Scene ─────────────────────── */
function HeroScene({ reduced }: { reduced: boolean }) {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.15} />

      {/* Gold left rim light */}
      <pointLight
        position={[-4, 3, 2]}
        color={GOLD}
        intensity={8}
        distance={12}
        decay={2}
      />
      {/* Cool right counter-light for contrast */}
      <pointLight
        position={[4, -2, 3]}
        color="#8098c8"
        intensity={3}
        distance={10}
        decay={2}
      />
      {/* Top fill light — subtle warm */}
      <pointLight
        position={[0, 5, 1]}
        color="#ffeedd"
        intensity={2}
        distance={8}
        decay={2}
      />

      {/* Environment — provides HDRI reflections */}
      <Environment preset="night" />

      {/* Background starfield — very subtle */}
      <Stars
        radius={30}
        depth={20}
        count={reduced ? 0 : 800}
        factor={0.5}
        saturation={0.2}
        fade
        speed={reduced ? 0 : 0.3}
      />

      {/* Scene objects */}
      <GoldParticleField count={reduced ? 0 : 1500} reduced={reduced} />
      <SneakerPedestal reduced={reduced} />
      <CameraRig reduced={reduced} />
    </>
  );
}

/* ── 5. Suspense fallback — void black rect ─── */
function SceneFallback() {
  return <div className="absolute inset-0 bg-void" aria-hidden="true" />;
}

/* ── 6. Root component exported dynamically ─── */
export default function Hero3D() {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef);

  return (
    <div ref={containerRef} className="absolute inset-0" aria-hidden="true">
      <Suspense fallback={<SceneFallback />}>
        <Canvas
          frameloop={inView && !reduced ? 'always' : 'never'}
          camera={{ position: [0, 0, 5], fov: 50, near: 0.1, far: 100 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          dpr={[1, Math.min(1.5, typeof window !== 'undefined' ? window.devicePixelRatio : 1.5)]}
          style={{ background: 'transparent' }}
        >
          <HeroScene reduced={reduced} />
        </Canvas>
      </Suspense>
    </div>
  );
}
