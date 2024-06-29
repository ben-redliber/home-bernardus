/* eslint-disable */

"use client";
import { motion, useAnimate } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";
import { COLORS } from "~/app/data";
import { fitRange } from "~/lib/utils";

export default function AnimLettersPeak({
  children,
  className,
  ...props
}: {
  children: ReactNode;
  className?: string;
}) {
  let lettersArr;
  if (typeof children == "string" && children) {
    lettersArr = children.split("");

    return (
      <div className={`${className} flex flex-row gap-0`}>
        {lettersArr.map((item, index) => {
          if (item == " ") {
            return (
              <p key={index} {...props}>
                &nbsp;
              </p>
            );
          }
          return <Letter key={index} letter={item} {...props} />;
        })}
      </div>
    );
  }
}

function Letter({ letter, ...props }: { letter: string }) {
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
      { color: COLORS.ROSECOLOR400 },
      { duration: 0.3, type: "spring" },
    );
  }

  function mouseDownLetter() {
    animate(
      scope.current,
      { color: COLORS.ROSECOLOR200 },
      { duration: 0.5, type: "spring" },
    );
  }

  function mouseUpLetter() {
    animate(
      scope.current,
      { color: COLORS.ROSECOLOR400 },
      { duration: 0.3, type: "spring" },
    );
  }

  function hoverLetterEnd() {
    animate(scope.current, { color: "" }, { duration: 0.5, type: "spring" });
  }

  return (
    <>
      <p
        ref={scope}
        onMouseOver={() => setHovered(true)}
        onMouseOut={() => setHovered(false)}
        onMouseDown={() => mouseDownLetter()}
        onMouseUp={() => mouseUpLetter()}
        {...props}
      >
        {letter}
      </p>
    </>
  );
}
