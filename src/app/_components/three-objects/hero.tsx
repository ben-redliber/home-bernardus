"use client";
import { MeshDistortMaterial, useFBO, useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import useScreenSize from "use-screen-size";
import useMousePos from "~/hooks/use-mouse-pos";
import * as THREE from "three";
import { COLORS, SCROLLS } from "~/app/data";
import { WebStrings } from "./web-strings";

export function Hero() {
  const { width, height } = useScreenSize();
  const bgRenderTarget = useFBO();
  const scroll = useScroll();
  const { x, y } = useMousePos();
  const three = useThree();

  const lensUniforms = useMemo(
    () => ({
      u_time: {
        value: 0.0,
      },
      u_intensity: {
        value: 0.12,
      },
      u_texture: {
        value: null,
      },
      u_resolution: {
        value: new THREE.Vector2(width, height).multiplyScalar(
          Math.min(window.devicePixelRatio, 2.0),
        ),
      },
    }),
    [width, height],
  );

  // Purely for type error, setting the Ref with what fodder data to avoid ts complaining.
  const lensRef = useRef(
    new THREE.Mesh(
      new THREE.IcosahedronGeometry(),
      new THREE.ShaderMaterial({ uniforms: lensUniforms }),
    ),
  );
  const whiteTrailRef = useRef();
  const ref = useRef();

  const arms = 8;

  useFrame((state) => {
    const { gl, camera, scene, viewport, pointer, clock } = state;
    const pointerViewport = viewport.getCurrentViewport(camera, [0, 0, 1]);

    if (width < 750) {
      ref.current.scale.set(0.5, 0.5, 0.5);
    }
    if (width > 750) {
      ref.current.scale.set(1, 1, 1);
    }

    if (scroll.offset > SCROLLS.SCROLLOFFSET_1) {
      camera.position.z = THREE.MathUtils.lerp(
        camera.position.z,
        5 - SCROLLS.SCROLLOFFSET_1 * 30,
        0.1,
      );
    }
    if (scroll.offset < SCROLLS.SCROLLOFFSET_1) {
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, 5, 0.1);
    }
  });
  return (
    <>
      <group
        ref={ref}
        rotation={[0, -0.075, 0]}
        position={[-0.525, 0, 0]}
        scale={[1, 1, 1]}
      >
        <mesh
          ref={whiteTrailRef}
          rotation={[0, 0, 0.5]}
          name="white-trails"
          castShadow
        >
          <torusKnotGeometry args={[7, 0.1, 4000, 100, arms, arms * 5]} />
          <MeshDistortMaterial distort={0.2} speed={2} color="white" />
        </mesh>
        <mesh
          name="red-veins"
          rotation={[-Math.PI / 1, 0, 0]}
          position={[0, 0, 0]}
        >
          <torusKnotGeometry args={[12, 0.75, 4000, 200, 30, 12]} />
          <MeshDistortMaterial
            distort={0.2}
            speed={1.5}
            color={COLORS.ROSECOLOR500}
          />
        </mesh>
        <WebStrings
          tubeRadius={0.075}
          matDistort={0.2}
          matSpeed={1}
          position={[-16, 0, -3]}
          rotation={[0, Math.PI * 2, 0]}
        />
      </group>
    </>
  );
}
