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
  MeshDistortMaterial,
  MeshWobbleMaterial,
  OrbitControls,
  ScrollControls,
  useScroll,
  Outlines,
  Text,
  Scroll,
  useFBO,
  MeshTransmissionMaterial,
  Text3D,
  Center,
  Mask,
  useMask,
} from "@react-three/drei";
import { Box, Flex } from "@react-three/flex";
import {
  Bloom,
  ChromaticAberration,
  DepthOfField,
  DotScreen,
  EffectComposer,
  Noise,
  Scanline,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import useScreenSize from "use-screen-size";
import useMousePos from "~/hooks/use-mouse-pos";

import lensFrag from "~/shaders/lens-noise/fragment.glsl";
import lensVert from "~/shaders/lens-noise/vertex.glsl";
import AnimatedCursor from "react-animated-cursor";
import DarkSpeed from "./dark-speed";
import ThreeEffects from "./three-effects";

import { HARDBOPBLACK, HARDBOPBLACKJSON, SCROLLS, COLORS } from "../data.ts";
import ThreeLayout from "./three-layout.tsx";

type UniformsBoilerplate = {
  u_time?: number;
  u_intensity?: number;
};

export default function ThreeScene() {
  return (
    <Canvas
      // shadows
      camera={{ fov: 74 }}
      className="h-full w-full"
      dpr={[1, 2]}
      color={COLORS.ROSECOLOR}
    >
      <Suspense fallback={null}>
        <ThreeEffects>
          <ThreeLayout />
        </ThreeEffects>
      </Suspense>
    </Canvas>
  );
}
