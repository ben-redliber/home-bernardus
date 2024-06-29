"use client";

import { useThree } from "@react-three/fiber";
import {
  ChromaticAberration,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import type { ReactNode } from "react";
import { BlendFunction } from "postprocessing";

export default function ThreeEffects({ children }: { children: ReactNode }) {
  return (
    <>
      <EffectComposer>
        <Noise opacity={0.05} />
        <Vignette eskil={true} offset={1.25} darkness={1.025} />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL} // blend mode
          offset={[0.002, 0.0005]} // color offset
        />
      </EffectComposer>
      <ambientLight intensity={3} />
      {/* <OrbitControls /> */}
      {children}
    </>
  );
}
