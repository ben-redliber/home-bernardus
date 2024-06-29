/* eslint-disable */

"use client";
import { inView, motion, stagger, useAnimate, useInView } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";
import { COLORS } from "~/app/data";
import { fitRange } from "~/lib/utils";

export default function AnimLettersHero({
  children,
  className,
  style,
  ...props
}: {
  children: ReactNode;
  className: string;
  style: any;
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
          return <Letter key={index} idx={index} letter={item} {...props} />;
        })}
      </div>
    );
  }
}

function Letter({ letter, idx, ...props }: { letter: string; idx: number }) {
  const [scope, animate] = useAnimate();
  const [hovered, setHovered] = useState(false);
  const isInView = useInView(scope);

  const [rotate, setRotate] = useState([0]);
  const [scale, setScale] = useState(1);
  const [color, setColor] = useState("");

  const rotationRange = fitRange(Math.random(), 0, 1, 8, 12);
  const rotateAmt = Math.random() > 0.5 ? rotationRange : -rotationRange;

  let classNameUS = "";
  let hoveredLetterColor = COLORS.ROSECOLOR400;

  if (letter == "U" || letter == "S") {
    classNameUS = "text-gray-300";
    hoveredLetterColor = COLORS.AMBER200;
  }

  useEffect(() => {
    if (isInView) {
      animate([
        [
          scope.current,
          { opacity: 0, scale: 0.2 },
          { duration: 0, type: "spring" },
        ],
        [
          scope.current,
          { opacity: 1, scale: 1 },
          {
            duration: 1,
            type: "spring",
            delay: idx * 0.15,
          },
        ],
      ]);
    } else if (!isInView) {
      animate(scope.current, { opacity: 0 }, { duration: 1 });
    }
  }, [isInView]);

  useEffect(() => {
    hovered ? hoverLetter() : hoverLetterEnd();
  }, [hovered, animate, scope]);

  function hoverLetter() {
    animate(
      scope.current,
      { scale: 1.5, rotate: rotateAmt * 2, color: hoveredLetterColor },
      { duration: 0.3, type: "spring" },
    );
  }

  function mouseDownLetter() {
    animate(
      scope.current,
      { scale: 1.25, rotate: rotateAmt * 0.5, color: COLORS.ROSECOLOR200 },
      { duration: 0.5, type: "spring" },
    );
  }

  function mouseUpLetter() {
    animate(
      scope.current,
      { scale: 1.5, rotate: rotateAmt * 2, color: hoveredLetterColor },
      { duration: 0.3, type: "spring" },
    );
  }

  function hoverLetterEnd() {
    animate(
      scope.current,
      { scale: 1, rotate: 0, color: "" },
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
        className={classNameUS}
        style={{ opacity: 0 }}
        {...props}
      >
        {letter}
      </p>
    </>
  );
}
