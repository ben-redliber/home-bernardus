"use client";
import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { fitRange } from "~/lib/utils";

const ROSECOLOR = "#be123c";
const ROSECOLOR500 = "#f43f5e";
const ROSECOLOR400 = "#fb7185";
const ROSECOLORSPHERE = "#FF415C";
const SLATE950 = "#020617";

const TIMESTRETCH = 50;
const POSOFFSET = 40;

export default function DarkSpeed({
  SCROLLOFFSET,
  ...props
}: {
  SCROLLOFFSET: number;
}) {
  const redRef = useRef();
  const blackRef = useRef();
  const scroll = useScroll();

  const maxDistance = 120;
  const interval = 2;
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

  const fittedScale = torusArr.map((_, index) =>
    fitRange(index, 0, torusArr.length, 1, 0),
  );

  useFrame((state) => {
    const { clock, camera, scene, pointer } = state;

    if (scroll.offset > SCROLLOFFSET) {
      redRef.current.position.x = -scroll.offset * TIMESTRETCH + POSOFFSET;
      blackRef.current.position.x = scroll.offset * TIMESTRETCH - POSOFFSET;
    }
  });
  return (
    <group {...props}>
      <group ref={redRef} position={[POSOFFSET, 0, 0]}>
        {torusArr.map((item, index) => {
          // const rad = radius * fittedScale[index];
          // const tube = rad + rad * 0.15;

          return (
            <mesh
              renderOrder={10}
              key={item}
              position={[item.pos, 0, 0]}
              // scale={[scaler, scaler, scaler]}
            >
              <ringGeometry args={[radius, tube, detail]} />
              <meshBasicMaterial depthTest={false} color={ROSECOLORSPHERE} />
            </mesh>
          );
        })}
      </group>
      <group
        ref={blackRef}
        position={[-POSOFFSET, 0, 0]}
        // scale={[1.02, 1.02, 1.02]}
        // visible={false}
      >
        {torusArr.map((item, index) => {
          // const rad = radius * fittedScale[index];
          // const tube = rad + rad * 0.15;

          return (
            <mesh
              renderOrder={10}
              key={item}
              position={[-item.pos, 0, 0]}
              // scale={[scaler, scaler, scaler]}
            >
              <ringGeometry args={[radius, tube, detail]} />
              <meshBasicMaterial depthTest={false} color={SLATE950} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}
