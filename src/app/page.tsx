import Link from "next/link";
import ThreeScene from "./_components/three-scene";

export default function HomePage() {
  return (
    <main className="absolute top-0 flex min-h-screen flex-col items-center">
      <div className="h-[100vh] w-[99.5vw]">
        <ThreeScene />
      </div>
    </main>
  );
}