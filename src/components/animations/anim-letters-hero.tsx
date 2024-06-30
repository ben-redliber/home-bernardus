/* eslint-disable */

"use client";
import { inView, motion, stagger, useAnimate, useInView } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";
import useScreenSize from "use-screen-size";
import { UTILCOLORS } from "~/app/data";
import { fitRange } from "~/lib/utils";

export default function AnimLettersHero({
  children,
  className,
  style,
  range,
  backAnimate = true,
  ...props
}: {
  children: ReactNode;
  className: string;
  range?: number;
  style: any;
  backAnimate: boolean;
}) {
  let lettersArr;
  if (typeof children == "string" && children) {
    lettersArr = children.split("");

    return (
      <div className={`${className} flex flex-row gap-0`} style={style}>
        {lettersArr.map((item, index) => {
          if (item == " ") {
            return (
              <p key={index} {...props}>
                &nbsp;&nbsp;
              </p>
            );
          }
          return (
            <Letter
              backAnimate={backAnimate}
              range={range}
              key={index}
              idx={index}
              letter={item}
              {...props}
            />
          );
        })}
      </div>
    );
  }
}

function Letter({
  letter,
  range = 100,
  idx,
  backAnimate,
  ...props
}: {
  letter: string;
  idx: number;
  range: number;
  backAnimate: boolean;
}) {
  const [scope, animate] = useAnimate();

  const [hovered, setHovered] = useState(false);
  const [maxFloat, setMaxFloat] = useState(range * 0.25);
  const [maxEntrance, setMaxEntrance] = useState(-150);
  const [indicateDone, setDone] = useState(false);

  const isInView = useInView(scope);
  const { width, height } = useScreenSize();

  useEffect(() => {
    if (width > 768) {
      setMaxFloat(range);
      setMaxEntrance(-500);
    }
  }, [width]);

  const rotationRange = fitRange(Math.random(), 0, 1, 8, 12);
  const rotateAmt = Math.random() > 0.5 ? rotationRange : -rotationRange;

  const floatingRange = fitRange(Math.random(), 0, 1, -maxFloat, maxFloat);
  const floatingAmt = Math.random() > 0.5 ? floatingRange : -1 * floatingRange;

  // Regular
  let letterColor = UTILCOLORS.HERO.REGULAR;
  let hoveredLetterColor = UTILCOLORS.HERO.REGULAR_HOVERED;
  let clickedLetterColor = UTILCOLORS.HERO.REGULAR_CLICKED;

  // Accent
  if (letter == "U" || letter == "S") {
    letterColor = UTILCOLORS.HERO.ACCENT;
    hoveredLetterColor = UTILCOLORS.HERO.ACCENT_HOVERED;
    clickedLetterColor = UTILCOLORS.HERO.ACCENT_CLICKED;
  }

  const hoveredState = {
    anim: { scale: 1.1, rotate: rotateAmt * 0.8, color: hoveredLetterColor },
    transition: { duration: 0.3, type: "spring" },
  };

  useEffect(() => {
    if (isInView && !indicateDone) {
      animate([
        [
          scope.current,
          { opacity: 0, scale: 1, y: maxEntrance },
          { duration: 0, type: "spring" },
        ],
        [
          scope.current,
          { opacity: 1, scale: 1, y: floatingAmt },
          {
            duration: 1,
            type: "spring",
            delay: idx * 0.15,
          },
        ],
      ]);
      setDone(backAnimate);
    }
  }, [isInView]);

  useEffect(() => {
    hovered ? hoverLetter() : hoverLetterEnd();
  }, [hovered, animate, scope]);

  function hoverLetter() {
    animate(scope.current, hoveredState.anim, hoveredState.transition);
  }

  function mouseDownLetter() {
    animate(
      scope.current,
      {
        scale: 1.2,
        rotate: rotateAmt * 0.5,
        color: clickedLetterColor,
      },
      { duration: 0.5, type: "spring" },
    );
  }

  function mouseUpLetter() {
    animate(scope.current, hoveredState.anim, hoveredState.transition);
  }

  function hoverLetterEnd() {
    animate(
      scope.current,
      { scale: 1, rotate: 0, color: letterColor },
      { duration: 0.5, type: "spring" },
    );
  }

  return (
    <>
      <p
        ref={scope}
        onMouseOver={() => setHovered(true)}
        onMouseOut={() => setHovered(false)}
        onMouseDown={() => mouseDownLetter()}
        onMouseUp={() => mouseUpLetter()}
        style={{ opacity: 0, color: letterColor }}
        {...props}
      >
        {letter}
      </p>
    </>
  );
}
