/* eslint-disable */
"use client";
import {
  Canvas,
  MeshProps,
  ThreeElements,
  useFrame,
  useThree,
} from "@react-three/fiber";
import {
  ReactNode,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import ThreeEffects from "./three-effects";

import { HARDBOPBLACK, HARDBOPBLACKJSON, SCROLLS, TWCOLORS } from "../data.ts";
import ThreeLayout from "./three-layout.tsx";
import { Html } from "@react-three/drei";
import { useAnimate } from "framer-motion";

type UniformsBoilerplate = {
  u_time?: number;
  u_intensity?: number;
};

export default function ThreeScene({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<Loader />}>
      <Canvas
        // shadows
        camera={{ fov: 74 }}
        className="h-full w-full"
        dpr={[1, 2]}
        // color={TWCOLORS.ROSECOLOR}
      >
        {children}
      </Canvas>
    </Suspense>
  );
}

export function Loader() {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      scope.current,
      {
        y: [-20, 20],
      },
      {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
      },
    );
  }, []);

  return (
    <main className="absolute top-0 flex min-h-screen w-[100vw] flex-col items-center justify-center">
      <p
        ref={scope}
        className="font-hardbop text-center text-9xl font-black tracking-tighter text-white"
      >
        LOADING
      </p>
    </main>
  );
}
