/* eslint-disable */
"use client";
import { useFrame } from "@react-three/fiber";
import { stagger, useAnimate, useInView } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
import useScreenSize from "use-screen-size";
import { UTILCOLORS } from "~/app/data";
import useMousePos from "~/hooks/use-mouse-pos";

export default function AnimModal({
  children,
  hasModal = true,
  smallScreen = true,
  modal,
  className,
  maxHeight = "10vw",
  maxWidth = "15vw",
}: {
  children: ReactNode;
  hasModal: boolean;
  smallScreen: boolean;
  modal?: string;
  className?: string;
  maxHeight: string;
  maxWidth: string;
}) {
  const [scope, animate] = useAnimate();
  const [divScope, divAnimate] = useAnimate();
  const isInView = useInView(divScope);

  const [useModal, setModal] = useState("");
  const [hovered, setHovered] = useState(false);
  const [indicateDone, setDone] = useState(false);

  const { x, y } = useMousePos();
  const { width, height } = useScreenSize;

  useEffect(() => {
    if (isInView && !indicateDone) {
      divAnimate([
        [
          divScope.current,
          { opacity: 0, scale: 1, y: 100 },
          { duration: 0, type: "spring" },
        ],
        [
          divScope.current,
          { opacity: 1, scale: 1, y: 0 },
          {
            duration: 1,
            type: "spring",
            delay: 0.25,
          },
        ],
      ]);
      setDone(true);
    }
  }, [isInView, indicateDone, setDone]);

  useEffect(() => {
    hovered ? mouseOver() : mouseOut();
  });

  function mouseOver() {
    setModal(String(modal));
    animate(
      scope.current,
      {
        opacity: 1,
        marginRight: "15px",
        width: maxWidth,
      },
      { type: "spring", duration: 0.3 },
    );
    if (hasModal) {
      animate(
        "p",
        {
          opacity: 1,
        },
        {
          type: "spring",
          duration: 0.3,
          delay: stagger(0, { startDelay: 0.2 }),
        },
      );
    }
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
      { type: "spring", duration: 0.25 },
    );
    if (hasModal) {
      animate(
        "p",
        {
          opacity: 0,
        },
        { type: "spring", duration: 0 },
      );
    }
  }
  return (
    <div
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
      className={`align-center flex max-h-full flex-col px-1 md:flex-row md:px-0 ${className}`}
      ref={divScope}
      style={{
        opacity: 0,
      }}
    >
      <div
        ref={scope}
        className="h-autooverflow-hidden mt-4 hidden shadow-2xl  md:flex"
        style={{
          backgroundColor: UTILCOLORS.MODAL.ACCENT,
          opacity: 1,
          maxHeight: maxHeight,
        }}
      >
        {hasModal && (
          <p
            className=" overflow-hidden p-2 text-right text-xl font-bold leading-[1.25rem] tracking-tighter"
            style={{
              fontFamily: "'__Archivo_b2f0d5', '__Archivo_Fallback_b2f0d5'",
              color: UTILCOLORS.MODAL.REGULAR,
            }}
          >
            {useModal}
          </p>
        )}
      </div>
      <div className="static bg-transparent">{children}</div>
      {hasModal && smallScreen && (
        <div
          className="mb-8 mt-2 flex min-h-24 max-w-[50%] justify-start py-3 md:hidden"
          style={{
            fontFamily: "'__Archivo_b2f0d5', '__Archivo_Fallback_b2f0d5'",
          }}
        >
          <p
            className="text-start text-lg font-bold leading-[1] tracking-tighter"
            style={{ color: UTILCOLORS.MODAL.REGULAR }}
          >
            {modal}
          </p>
        </div>
      )}
    </div>
  );
}
