/* eslint-disable */

"use client";
import { motion, useAnimate, useInView } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";
import { TWCOLORS, UTILCOLORS } from "~/app/data";
import { fitRange } from "~/lib/utils";

export default function AnimLetters({
  children,
  className,
  span,
  spanRange,
  spanIndex,
  ...props
}: {
  children: ReactNode;
  span?: boolean;
  spanRange?: number;
  spanIndex?: number;
  className: string;
}) {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);
  const [indicateDone, setDone] = useState(false);

  useEffect(() => {
    if (isInView && !indicateDone) {
      animate([
        [
          scope.current,
          { opacity: 0, scale: 1, y: 100 },
          { duration: 0, type: "spring" },
        ],
        [
          scope.current,
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

  let lettersArr;
  if (typeof children == "string" && children) {
    lettersArr = children.split("");

    return (
      <div
        className={`${className} flex flex-row gap-0`}
        ref={scope}
        style={{ opacity: 0 }}
      >
        {lettersArr.map((item, index) => {
          if (item == " ") {
            return (
              <p key={index} {...props}>
                &nbsp;
              </p>
            );
          } else {
            const letterSpan = span && index > Number(spanIndex) ? true : false;
            return (
              <Letter key={index} span={letterSpan} letter={item} {...props} />
            );
          }
        })}
      </div>
    );
  }
}

function Letter({ letter, span, ...props }: { letter: string; span: boolean }) {
  const letterColor = span
    ? UTILCOLORS.HEADING.ACCENT
    : UTILCOLORS.HEADING.REGULAR;
  const hoverColor = span
    ? UTILCOLORS.HEADING.ACCENT_HOVERED
    : UTILCOLORS.HEADING.REGULAR_HOVERED;
  const [scope, animate] = useAnimate();

  const [hovered, setHovered] = useState(false);

  const [rotate, setRotate] = useState([0]);
  const [scale, setScale] = useState(1);
  const [color, setColor] = useState("");

  const rotationRange = fitRange(Math.random(), 0, 1, 8, 12);
  const rotateAmt = Math.random() > 0.5 ? rotationRange : -rotationRange;

  useEffect(() => {
    hovered ? hoverLetter() : hoverLetterEnd();
  }, [hovered, animate, scope]);

  function hoverLetter() {
    animate(
      scope.current,
      { scale: 1.5, rotate: rotateAmt * 2, color: hoverColor },
      { duration: 0.3, type: "spring" },
    );
  }

  function mouseDownLetter() {
    animate(
      scope.current,
      {
        scale: 1.25,
        rotate: rotateAmt * 0.5,
        color: UTILCOLORS.HEADING.REGULAR_CLICKED,
      },
      { duration: 0.5, type: "spring" },
    );
  }

  function mouseUpLetter() {
    animate(
      scope.current,
      { scale: 1.5, rotate: rotateAmt * 2, color: hoverColor },
      { duration: 0.3, type: "spring" },
    );
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
        style={{
          color: letterColor,
        }}
        {...props}
      >
        {letter}
      </p>
    </>
  );
}
