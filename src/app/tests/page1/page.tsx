"use client";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Jersey_20 } from "next/font/google";
import { useRef } from "react";
import Cursor from "~/components/cursor";

const roseColor = "#be123c";
const roseColor500 = "#f43f5e";
const roseColor400 = "#fb7185";

export default function Page() {
  return (
    <main className="absolute top-0 flex min-h-screen flex-col items-center">
      <div className="h-[100vh] w-[99.5vw]">
        <Cursor />
        <Canvas
          shadows
          camera={{ fov: 74 }}
          className="h-full w-full rounded-b-xl"
          dpr={[1, 2]}
        >
          <OrbitControls />
          <ambientLight intensity={1} />
          {/* <directionalLight intensity={2} /> */}
          <Torus />
        </Canvas>
      </div>
    </main>
  );
}

export function Torus() {
  const redRef = useRef();
  const blackRef = useRef();

  const maxDistance = 180;
  const interval = 1.65;
  const radius = 8;
  const tube = radius + radius * 0.1;
  const detail = 90;
  const torusArr = [];
  for (let i = 0; i <= maxDistance; i += interval) {
    // const iRadius = (radius / i) * 0.9;
    torusArr.push({
      pos: i,
      // radius: iRadius,
      // tube: iRadius * 1.2,
    });
  }

  useFrame((state) => {
    const { clock } = state;

    const timeStretch = 0.5;
    // redRef.current.position.x = -1 * (clock.getElapsedTime() * timeStretch);
    // blackRef.current.position.x = clock.getElapsedTime() * timeStretch;
  });
  return (
    <>
      <group ref={redRef}>
        {torusArr.map((item) => {
          return (
            <mesh key={item} position={[item.pos, 0, 0]}>
              <ringGeometry args={[radius, tube, detail]} />
              <meshBasicMaterial color={roseColor} />
            </mesh>
          );
        })}
      </group>
      <group ref={blackRef}>
        {torusArr.map((item) => {
          return (
            <mesh key={item} position={[-item.pos, 0, 0]}>
              <ringGeometry args={[radius, tube, detail]} />
              <meshBasicMaterial color="#09090b" />
            </mesh>
          );
        })}
      </group>
    </>
  );
}
