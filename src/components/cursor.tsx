"use client";
import { useEffect, useRef, useState } from "react";
import AnimatedCursor from "react-animated-cursor";
import { useTime } from "react-timer-hook";

export default function Cursor() {
  return (
    <AnimatedCursor
      color="250,30,40"
      innerSize={15}
      outerSize={100}
      innerScale={0.3}
      outerScale={1.75}
      outerAlpha={0.75}
      trailingSpeed={1.5}
      outerStyle={{
        mixBlendMode: "exclusion",
        border: "4px solid white",
      }}
    />
  );
}
