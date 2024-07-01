/* eslint-disable */

"use client";
import { motion, useAnimate } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";
import { TWCOLORS, UTILCOLORS } from "~/app/data";
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

  const rotationRange = fitRange(Math.random(), 0, 1, 8, 12);
  const rotateAmt = Math.random() > 0.5 ? rotationRange : -rotationRange;

  useEffect(() => {
    hovered ? hoverLetter() : hoverLetterEnd();
  }, [hovered, animate, scope]);

  function hoverLetter() {
    animate(
      scope.current,
      { color: UTILCOLORS.HEADING_2.REGULAR_HOVERED },
      { duration: 0.3, type: "spring" },
    );
  }

  function mouseDownLetter() {
    animate(
      scope.current,
      { color: UTILCOLORS.HEADING_2.REGULAR_CLICKED },
      { duration: 0.5, type: "spring" },
    );
  }

  function mouseUpLetter() {
    animate(
      scope.current,
      { color: UTILCOLORS.HEADING_2.REGULAR_HOVERED },
      { duration: 0.3, type: "spring" },
    );
  }

  function hoverLetterEnd() {
    animate(
      scope.current,
      { color: UTILCOLORS.HEADING_2.REGULAR },
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
        {...props}
      >
        {letter}
      </p>
    </>
  );
}
