"use client";
import { useEffect, useRef, useState } from "react";
import AnimatedCursor from "react-animated-cursor";
import { useTime } from "react-timer-hook";

export default function Cursor() {
  return (
    <AnimatedCursor
      color="250,30,40"
      innerSize={25}
      outerSize={250}
      innerScale={0.5}
      outerScale={1.25}
      outerAlpha={0.75}
      outerStyle={{
        mixBlendMode: "exclusion",
        border: "4px solid white",
      }}
    />
  );
}
