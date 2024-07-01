import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect } from "react";
import { SCROLLS } from "../data";
import { Color } from "three";

export function ThreeTransitions({
  sendNewColor,
  sendNewSpeed,
}: {
  sendNewColor: (newColor: Color) => void;
  sendNewSpeed: (newSpeed: number) => void;
}) {
  const scroll = useScroll();

  useFrame((state) => {
    if (scroll.offset > SCROLLS.SCROLLOFFSET_1 * 1.3) {
      // sendNewColor(new THREE.Color(ROSECOLORSPHERE));
      sendNewSpeed(0.15);
    } else if (scroll.offset < SCROLLS.SCROLLOFFSET_1 * 1.3) {
      // sendNewColor(new THREE.Color(SLATE950));
      sendNewSpeed(0.25);
    }
  });
  return (
    <>{/* <color ref={ref} attach="background" args={[SLATE950_VEC]} /> */}</>
  );
}
