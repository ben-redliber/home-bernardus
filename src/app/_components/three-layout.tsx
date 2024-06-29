"use client";
import { useRef, useState } from "react";
import useScreenSize from "use-screen-size";
import * as THREE from "three";
import { ScrollControls, Scroll } from "@react-three/drei";
import { SCROLLS, COLORS } from "../data";
import DarkSpeed from "./three-objects/dark-speed";
import { SphereNoise } from "./three-objects/sphere-noise";
import { ThreeTransitions } from "./three-transitions";
import { Hero } from "./three-objects/hero";
import ThreeHTML from "./three-html";

export default function ThreeLayout() {
  const { width, height } = useScreenSize();
  const ref = useRef();
  const data = [
    "THE BEST ART CAPTURES SKELETONS IN THE FLESH",
    "THE BEST STORIES ARE WRITTEN IN BLOOD",
    "THE BEST EXPERIENCES PUMPS YOUR HEARTRATE",
  ];

  const creativity = "CREATIVITY AT THE SPEED OF DARK";
  const creativityArr = Array.from("G".repeat(10));

  const sphereRadius = THREE.MathUtils.mapLinear(width, 2000, 300, 12, 2);
  const [BGCOLOR, setBGCOLOR] = useState(new THREE.Color(COLORS.SLATE950));
  const [speed, setSpeed] = useState(0.5);
  function handleNewColor(newcolor: THREE.Color) {
    ref.current.lerp(new THREE.Color(newcolor), 0.1);
  }
  function handleNewSpeed(newSpeed: number) {
    setSpeed(newSpeed);
  }
  return (
    <ScrollControls
      pages={SCROLLS.SCROLLPAGES}
      distance={0.5}
      maxSpeed={speed}
      // eps={0.0001}
    >
      <color ref={ref} attach="background" args={[BGCOLOR]} />
      <Scroll>
        <ThreeTransitions
          sendNewColor={handleNewColor}
          sendNewSpeed={handleNewSpeed}
        />
        <Hero />
      </Scroll>
      <Scroll>
        <SphereNoise renderOrder={0} position={[0, -36, -15]} />
      </Scroll>
      <Scroll>
        <DarkSpeed
          SCROLLOFFSET={SCROLLS.SCROLLOFFSET_2}
          position={[0, -66, -15]}
          scale={[0.8, 0.8, 0.8]}
        />
      </Scroll>
      <Scroll html>
        <ThreeHTML />
      </Scroll>
    </ScrollControls>
  );
}
