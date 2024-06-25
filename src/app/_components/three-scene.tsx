/* eslint-disable */
"use client";
import {
  Canvas,
  MeshProps,
  ThreeElements,
  useFrame,
  useThree,
} from "@react-three/fiber";
import {
  MeshDistortMaterial,
  MeshWobbleMaterial,
  OrbitControls,
  ScrollControls,
  useScroll,
  Outlines,
  Text,
  Scroll,
  useFBO,
  MeshTransmissionMaterial,
  Text3D,
} from "@react-three/drei";
import { Box, Flex } from "@react-three/flex";
import {
  Bloom,
  ChromaticAberration,
  DepthOfField,
  DotScreen,
  EffectComposer,
  Noise,
  Scanline,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import useScreenSize from "use-screen-size";
import useMousePos from "~/hooks/use-mouse-pos";

import frag from "~/shaders/sphere-noise/fragment.glsl";
import sphereNoiseVertex from "~/shaders/sphere-noise/vertex.glsl";
import lensFrag from "~/shaders/lens-noise/fragment.glsl";
import lensVert from "~/shaders/lens-noise/vertex.glsl";
import AnimatedCursor from "react-animated-cursor";

type UniformsBoilerplate = {
  u_time?: number;
  u_intensity?: number;
};

const hardbopNormal = "./fonts/hardbop/hardbop-black.otf";
const roseColor = "#be123c";
const roseColor500 = "#f43f5e";
const roseColor400 = "#fb7185";

export default function ThreeScene() {
  // const mainRenderTarget = useFBO();
  return (
    <Canvas
      shadows
      camera={{ fov: 74 }}
      className="h-full w-full rounded-b-xl"
      dpr={[1, 2]}
    >
      <ThreeCanvas />
    </Canvas>
  );
}

export function ThreeCanvas() {
  return (
    <>
      <EffectComposer>
        <Noise opacity={0.175} />
        {/* <Vignette eskil={true} offset={1.25} darkness={1.05} /> */}
      </EffectComposer>
      <ambientLight intensity={1.5} />
      {/* <OrbitControls enableRotate={false} enableZoom={false} /> */}
      <Suspense fallback={null}>
        <Layout />
      </Suspense>
    </>
  );
}

export function Layout() {
  return (
    <ScrollControls pages={6} distance={0.5}>
      <Scroll>
        <Hero />
      </Scroll>
      <Scroll>
        <SphereNoise />
      </Scroll>
      <Scroll html>
        <div className="absolute top-0 w-[100vw]">
          <div className="absolute top-[500vh] w-[100vw]">
            <div className="flex w-full flex-col justify-center gap-0 px-24">
              <p className="font-hardbop text-center text-[12rem] font-black leading-none">
                A GOOD SONG NEVER DIES
              </p>
              <p className="font-hardbop text-center text-[12rem] font-black leading-none">
                A GOOD SONG NEVER DIES
              </p>
              <p className="font-hardbop text-center text-[12rem] font-black leading-none">
                A GOOD SONG NEVER DIES
              </p>
            </div>
          </div>
        </div>
      </Scroll>
    </ScrollControls>
  );
}

export function SphereNoise() {
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
        value: 0.6,
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
      hoverRef.current ? 2.1 : 0.03,
      0.02,
    );
  });
  return (
    <group position={[0, -35, 1]}>
      <mesh
        onPointerOver={() => (hoverRef.current = true)}
        ref={meshRef}
        onPointerOut={() => (hoverRef.current = false)}
        position={[0, -1, -16]}
      >
        <icosahedronGeometry args={[sphereRadius, 60]} />
        <shaderMaterial
          vertexShader={sphereNoiseVertex}
          fragmentShader={frag}
          uniforms={uniforms}
        />
      </mesh>
    </group>
  );
}

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
    [],
  );

  // Purely for type error, setting the Ref with what fodder data to avoid ts complaining.
  const lensRef = useRef(
    new THREE.Mesh(
      new THREE.IcosahedronGeometry(),
      new THREE.ShaderMaterial({ uniforms: lensUniforms }),
    ),
  );
  const textRef = useRef();
  const dotRef = useRef(false);
  const whiteTrailRef = useRef();

  const [useDot, setDot] = useState(BlendFunction.NORMAL);
  const [useWhiteTrailRot, setWhiteTrailRot] = useState(0.5);

  const letterSpacing = 0.02;
  const arms = 8;

  const scrollOffset1 = 0.75;

  let fontSize, fontOffset;
  if (width <= 500) {
    fontSize = 0.85;
    fontOffset = 0.6;
  } else if (width > 500 && width < 1000) {
    fontSize = 1;
    fontOffset = 0.75;
  } else {
    fontSize = 1.25;
    fontOffset = 0.95;
  }

  const whiteTrailProps = useMemo(
    () => ({
      rotation: [0, 0, 0.5],
    }),
    [],
  );

  useEffect(() => {
    if (scroll.offset > scrollOffset1) {
      three.camera.position.z += scrollOffset1;
    }
    if (scroll.offset < scrollOffset1) {
      three.camera.position.set(
        three.camera.position.x,
        three.camera.position.y,
        5,
      );
    }
  }, [scroll.offset]);

  useFrame((state) => {
    const { gl, camera, scene, viewport, pointer, clock } = state;
    const pointerViewport = viewport.getCurrentViewport(camera, [0, 0, 1]);

    if (scroll.offset > scrollOffset1) {
      camera.position.z = THREE.MathUtils.lerp(
        camera.position.z,
        5 - scrollOffset1 * 7.5,
        0.05,
      );
    }
    if (scroll.offset < scrollOffset1) {
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, 5, 0.05);
    }

    const newPosX = (pointer.x * pointerViewport.width) / 2;
    const newPosY = (pointer.y * pointerViewport.height) / 2;
    // lensRef.current.position.x = THREE.MathUtils.lerp(
    //   lensRef.current.position.x,
    //   newPosX,
    //   0.01,
    // );
    // lensRef.current.position.y = THREE.MathUtils.lerp(
    //   lensRef.current.position.y,
    //   newPosY,
    //   0.01,
    // );
    // textRef.current.color = "white";
    // lensRef.current.material.uniforms.u_time.value = clock.getElapsedTime() * 0.5;

    // gl.setRenderTarget(bgRenderTarget);
    // gl.render(scene, camera);

    // lensRef.current.material.uniforms.u_texture.value = bgRenderTarget.texture;
    // lensRef.current.material.uniforms.u_resolution.value = new THREE.Vector2(
    //   width,
    //   height,
    // ).multiplyScalar(Math.min(window.devicePixelRatio, 2.0));

    // textRef.current.color = roseColor500;
    // gl.setRenderTarget(null);
  });
  return (
    <>
      <group position={[fontOffset, 0, 1.5]}>
        <Text
          ref={textRef}
          font={hardbopNormal}
          color={roseColor}
          anchorX="right"
          anchorY="middle"
          fontSize={fontSize}
          letterSpacing={letterSpacing}
        >
          BERNARD
        </Text>
        <Text
          position={[letterSpacing, 0, 0]}
          font={hardbopNormal}
          color="#0c0a09"
          strokeWidth={0.01}
          strokeColor={roseColor}
          anchorX="left"
          anchorY="middle"
          fontSize={fontSize}
          letterSpacing={letterSpacing}
        >
          US
        </Text>
      </group>
      <group rotation={[0, -0.075, 0]} position={[-0.525, 0, 0]}>
        <mesh
          ref={whiteTrailRef}
          rotation={[0, 0, 0.5]}
          name="white-trails"
          castShadow
        >
          <torusKnotGeometry args={[7, 0.1, 3000, 100, arms, arms * 5]} />
          <MeshDistortMaterial distort={0.15} speed={2} color="white" />
        </mesh>
        <mesh
          name="red-veins"
          rotation={[-Math.PI / 1, 0, 0]}
          position={[0, 0, 0]}
        >
          <torusKnotGeometry args={[12, 0.75, 3000, 200, 30, 12]} />
          <MeshDistortMaterial
            distort={0.15}
            speed={1.5}
            color={roseColor500}
          />
        </mesh>
      </group>
    </>
  );
}
