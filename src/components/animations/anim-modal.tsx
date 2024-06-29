/* eslint-disable */
"use client";
import { useFrame } from "@react-three/fiber";
import { stagger, useAnimate } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
import useScreenSize from "use-screen-size";
import { COLORS } from "~/app/data";
import useMousePos from "~/hooks/use-mouse-pos";

export default function AnimModal({
  children,
  modal,
  className,
}: {
  children: ReactNode;
  modal?: string;
  className: string;
}) {
  const [scope, animate] = useAnimate();

  const [useModal, setModal] = useState("");
  const [hovered, setHovered] = useState(false);

  const { x, y } = useMousePos();
  const { width, height } = useScreenSize;

  useEffect(() => {
    hovered ? mouseOver() : mouseOut();
  });

  function mouseOver() {
    setTimeout(() => setModal(String(modal)), 300);
    animate(
      scope.current,
      {
        opacity: 1,
        marginRight: "15px",
        width: "15vw",
      },
      { type: "tween", duration: 0.3 },
    );
    animate(
      "p",
      {
        opacity: 1,
      },
      {
        type: "tween",
        duration: 0.3,
        delay: stagger(0, { startDelay: 0.5 }),
      },
    );
  }

  function mouseOut() {
    setModal("");
    animate(
      scope.current,
      {
        opacity: 1,
        marginRight: "10px",
        width: "0vw",
      },
      { type: "tween", duration: 0.25 },
    );
    animate(
      "p",
      {
        opacity: 0,
      },
      { type: "keyframes", duration: 0 },
    );
  }
  return (
    <div
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
      className={`flex max-h-full flex-row ${className}`}
    >
      <div
        ref={scope}
        className=" z-[99] h-auto max-h-[10vw] overflow-hidden"
        style={{ backgroundColor: COLORS.ROSECOLOR500, opacity: 1 }}
      >
        <p
          className="overflow-hidden p-4 text-right text-2xl font-bold tracking-tighter text-gray-300"
          style={{
            fontFamily: "'__Archivo_b2f0d5', '__Archivo_Fallback_b2f0d5'",
          }}
          content="Commodo eiusmod laboris"
        >
          {useModal}
        </p>
      </div>
      <div className="static">{children}</div>
    </div>
  );
}
