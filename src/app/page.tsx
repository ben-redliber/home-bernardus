import Link from "next/link";
import ThreeScene from "./_components/three-scene";
import AnimatedCursor from "react-animated-cursor";

export default function HomePage() {
  return (
    <main className="absolute top-0 flex min-h-screen flex-col items-center">
      <div className="h-[100vh] w-[99.5vw]">
        <AnimatedCursor
          color="250,30,40"
          innerSize={10}
          outerSize={250}
          innerScale={0.35}
          outerScale={1.25}
          outerAlpha={0.75}
          outerStyle={{
            mixBlendMode: "exclusion",
            border: "4px solid white",
          }}
        />
        <ThreeScene />
      </div>
    </main>
  );
}
