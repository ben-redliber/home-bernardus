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
          {/* <Torus /> */}
        </Canvas>
      </div>
    </main>
  );
}
