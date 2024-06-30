"use client";

import { useFrame, useThree } from "@react-three/fiber";
import {
  Bloom,
  ChromaticAberration,
  DepthOfField,
  EffectComposer,
  Glitch,
  Noise,
  Pixelation,
  Vignette,
} from "@react-three/postprocessing";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  BlendFunction,
  GlitchMode,
  KernelSize,
  Resolution,
} from "postprocessing";
import * as THREE from "three";
import { useAnimate } from "framer-motion";
import { fitRange } from "~/lib/utils";

export default function ThreeEffects({ children }: { children: ReactNode }) {
  const [light, setLight] = useState(0);
  const lightRef = useRef();

  const [scope, animate] = useAnimate();

  useFrame((state) => {
    const { clock } = state;
    const duration = 2;
    const elapsed = Math.min(clock.getElapsedTime(), duration);
    const fittedRange = fitRange(elapsed, 0, duration, 0, 3);
    lightRef.current.intensity = fittedRange;
  });
  return (
    <>
      <EffectComposer>
        {/* <Noise blendFunction={BlendFunction.LUMINOSITY} opacity={0.3} /> */}
        {/* <Vignette eskil={true} offset={1.25} darkness={1.025} /> */}
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL} // blend mode
          offset={[0.002, 0.001]} // color offset
        />
        {/* <DepthOfField
          focusDistance={0} // where to focus
          focalLength={0.02} // focal length
          bokehScale={2} // bokeh size
        /> */}
      </EffectComposer>
      <ambientLight ref={lightRef} intensity={0} />
      {/* <OrbitControls /> */}

      {children}
    </>
  );
}
