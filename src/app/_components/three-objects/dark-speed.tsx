"use client";
import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const ROSECOLOR = "#be123c";
const ROSECOLOR500 = "#f43f5e";
const ROSECOLOR400 = "#fb7185";
const ROSECOLORSPHERE = "#FF415C";
const SLATE950 = "#020617";

const TIMESTRETCH = 40;
const POSOFFSET = 22;

export default function DarkSpeed({ SCROLLOFFSET }: { SCROLLOFFSET: number }) {
  const redRef = useRef();
  const blackRef = useRef();
  const scroll = useScroll();

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
    const { clock, camera, scene, pointer } = state;

    if (scroll.offset > SCROLLOFFSET) {
      redRef.current.position.x = -scroll.offset * TIMESTRETCH + POSOFFSET;
      blackRef.current.position.x = scroll.offset * TIMESTRETCH - POSOFFSET;
    }

    // if (scroll.offset > SCROLLOFFSET * 1.25) {
    //   const newPos = -scroll.offset * TIMESTRETCH * 0.6;

    //   redRef.current.position.z = THREE.MathUtils.lerp(
    //     redRef.current.position.z,
    //     newPos,
    //     0.1,
    //   );
    //   redRef.current.position.y = THREE.MathUtils.lerp(
    //     redRef.current.position.y,
    //     newPos,
    //     0.1,
    //   );

    //   console.log("curr->", redRef.current.position);
    //   blackRef.current.position.y = newPos;
    // }
  });
  return (
    <>
      <group ref={redRef} position={[POSOFFSET, 0, 0]}>
        {torusArr.map((item) => {
          return (
            <mesh renderOrder={10} key={item} position={[item.pos, 0, 0]}>
              <ringGeometry args={[radius, tube, detail]} />
              <meshBasicMaterial depthTest={false} color={ROSECOLORSPHERE} />
            </mesh>
          );
        })}
      </group>
      <group ref={blackRef} position={[-POSOFFSET, 0, 0]}>
        {torusArr.map((item) => {
          return (
            <mesh renderOrder={10} key={item} position={[-item.pos, 0, 0]}>
              <ringGeometry args={[radius, tube, detail]} />
              <meshBasicMaterial depthTest={false} color={SLATE950} />
            </mesh>
          );
        })}
      </group>
    </>
  );
}
