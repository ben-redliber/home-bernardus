import Link from "next/link";
import ThreeScene from "./_components/three-scene";
import AnimatedCursor from "react-animated-cursor";
import Cursor from "~/components/cursor";
import Overlay from "./_components/overlay";

export default function HomePage() {
  return (
    <main className="absolute top-0 flex min-h-screen flex-col items-center">
      <div className="h-[100vh] w-[99.5vw]">
        <Cursor />
        <ThreeScene />
      </div>
    </main>
  );
}
