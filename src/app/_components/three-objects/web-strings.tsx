import { MeshDistortMaterial } from "@react-three/drei";
import { CustomSin } from "~/app/data";

export function WebStrings({
  tubeRadius = 0.1,
  matDistort = 0.25,
  matSpeed = 1,
  ...prop
}: {
  tubeRadius: number;
  matDistort: number;
  matSpeed: number;
}) {
  const path = new CustomSin(1);

  return (
    <mesh {...prop} renderOrder={1}>
      <tubeGeometry args={[path, 500, tubeRadius, 100, false]} />
      <MeshDistortMaterial
        depthTest={false}
        radius={2}
        distort={matDistort}
        speed={matSpeed}
      />
    </mesh>
  );
}
