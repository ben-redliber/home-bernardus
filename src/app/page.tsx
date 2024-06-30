import Link from "next/link";
import ThreeScene from "~/components/three-scene";
import AnimatedCursor from "react-animated-cursor";
import Cursor from "~/components/cursor";
import Overlay from "./_components/overlay";
import { NavBar } from "~/components/NavBar";
import ThreeEffects from "~/components/three-effects";
import ThreeLayout from "./_components/three-layout";

export default function HomePage() {
  return (
    <>
      <main className="absolute top-0 flex min-h-screen flex-col items-center">
        <div className="h-[100vh] w-[99.5vw]">
          <NavBar />
          <ThreeScene>
            <ThreeEffects>
              <ThreeLayout />
            </ThreeEffects>
          </ThreeScene>
          <Overlay />
        </div>
      </main>
    </>
  );
}
