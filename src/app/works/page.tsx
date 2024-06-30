import ThreeEffects from "~/components/three-effects";
import ThreeScene from "~/components/three-scene";
import ThreeLayout from "./_components/three-layout";

export default function Page() {
  return (
    <div className="h-[100vh] w-[99.5vw]">
      <ThreeScene>
        <ThreeEffects>
          <ThreeLayout />
        </ThreeEffects>
      </ThreeScene>
    </div>
  );
}
