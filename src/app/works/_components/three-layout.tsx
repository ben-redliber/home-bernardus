"use client";
import { useMemo, useRef, useState } from "react";
import useScreenSize from "use-screen-size";
import { motion } from "framer-motion-3d";

import * as THREE from "three";
import { ScrollControls, Scroll, Text } from "@react-three/drei";
import {
  SCROLLS,
  TWCOLORS,
  UTILCOLORS,
  PROJECTS,
  HARDBOPBLACK,
} from "../../data";
import frag from "~/shaders/sphere-noise/fragment.glsl";
import sphereNoiseVertex from "~/shaders/sphere-noise/vertex.glsl";
import { useFrame } from "@react-three/fiber";
import AnimLettersHero from "~/components/animations/anim-letters-hero";
import AnimLetters from "~/components/animations/anim-letters";
import AnimModal from "~/components/animations/anim-modal";
import AnimLettersPeak from "~/components/animations/anim-letters-peak";

export default function ThreeLayout() {
  const meshRef = useRef();
  const [isHovered, setIsHovered] = useState(false);
  const uniforms = useMemo(
    () => ({
      u_time: {
        value: 0.0,
      },
      u_intensity: {
        value: 2,
      },
    }),
    [],
  );

  const worksArr = "WORKS".split("");

  useFrame((state) => {
    const { clock, camera } = state;
    camera.position.z = 2;
    meshRef.current.material.uniforms.u_time.value =
      0.2 * clock.getElapsedTime();
  });
  return (
    <ScrollControls pages={PROJECTS.length * 0.5} distance={0.5} damping={0.1}>
      <Scroll>
        <mesh ref={meshRef} position={[0, 20, -20]} scale={[1, 1, 1]}>
          <icosahedronGeometry args={[20, 160]} />
          <shaderMaterial
            vertexShader={sphereNoiseVertex}
            fragmentShader={frag}
            uniforms={uniforms}
          />
        </mesh>
      </Scroll>
      <Scroll html>
        <div className="absolute top-[17.5vh] w-[100vw] md:top-[5vh]">
          <div className="absolute w-[100vw]">
            <div className="font-hardbop flex  flex-col content-center justify-center gap-20 text-center align-top text-[24vw] font-black md:gap-48 md:text-[20vw]">
              {PROJECTS.map((item, index) => {
                return (
                  <AnimModal
                    hasModal={true}
                    maxWidth="10vw"
                    className="justify-center "
                    modal={item[1]}
                    key={index}
                  >
                    <AnimLetters
                      className=""
                      style={{ letterSpacing: "0.0001em", lineHeight: "0.7" }}
                    >
                      {item[0]}
                    </AnimLetters>
                  </AnimModal>
                );
              })}
            </div>
          </div>
        </div>
      </Scroll>
    </ScrollControls>
  );
}
