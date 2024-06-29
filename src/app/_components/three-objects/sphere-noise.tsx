import { useMemo, useRef } from "react";
import useScreenSize from "use-screen-size";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

import frag from "~/shaders/sphere-noise/fragment.glsl";
import sphereNoiseVertex from "~/shaders/sphere-noise/vertex.glsl";
import { COLORS } from "~/app/data";

export function SphereNoise({ ...props }) {
  const meshRef = useRef();
  const hoverRef = useRef(false);
  const { width, height } = useScreenSize();
  const sphereRadius = THREE.MathUtils.mapLinear(width, 2000, 300, 12, 2);

  const uniforms = useMemo(
    () => ({
      u_time: {
        value: 0.0,
      },
      u_intensity: {
        value: 2,
      },
    }),
    [],
  );

  useFrame((state) => {
    const { clock } = state;
    meshRef.current.material.uniforms.u_time.value =
      0.5 * clock.getElapsedTime();
    meshRef.current.material.uniforms.u_intensity.value = THREE.MathUtils.lerp(
      meshRef.current.material.uniforms.u_intensity.value,
      hoverRef.current ? 5 : 2.5,
      0.05,
    );
  });

  return (
    <group {...props}>
      <mesh
        onPointerOver={() => (hoverRef.current = true)}
        ref={meshRef}
        onPointerOut={() => (hoverRef.current = false)}
      >
        <icosahedronGeometry args={[sphereRadius, 72]} />
        <shaderMaterial
          vertexShader={sphereNoiseVertex}
          fragmentShader={frag}
          uniforms={uniforms}
        />
      </mesh>
      <mesh scale={[0.9, 0.9, 0.9]}>
        <icosahedronGeometry args={[sphereRadius, 60]} />
        <meshBasicMaterial
          color={COLORS.ROSECOLORSPHERE}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}
