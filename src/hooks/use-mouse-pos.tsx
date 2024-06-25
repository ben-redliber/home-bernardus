import { useEffect, useState } from "react";

export default function useMousePos() {
  const [usePos, setPos] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const updateMousePos = (event: MouseEvent) => {
      setPos({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener("mousemove", updateMousePos);
    return () => {
      window.removeEventListener("mousemove", updateMousePos);
    };
  }, [setPos]);

  return usePos;
}
