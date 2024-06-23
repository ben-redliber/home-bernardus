"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  MeshDistortMaterial,
  MeshWobbleMaterial,
  OrbitControls,
  Outlines,
  Text,
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
import { useMemo, useRef } from "react";
import * as THREE from "three";
import frag from "~/shaders/sphere-noise/fragment.glsl";
import sphereNoiseVertex from "@/shaders/sphere-noise/vertex.glsl";

const hardbopNormal = "./fonts/hardbop/hardbop-bold.otf";
const roseColor = "#be123c";
const roseColor500 = "#f43f5e";

export default function ThreeScene() {
  return (
    <Canvas
      shadows
      camera={{ fov: 74 }}
      className="h-full w-full rounded-b-xl"
      dpr={[1, 2]}
    >
      <EffectComposer>
        <DepthOfField
          focusDistance={0.175}
          focalLength={2}
          bokehScale={12}
          height={480}
        />
        <Noise opacity={0.075} />
        <Vignette eskil={true} offset={1.25} darkness={1.12} />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.0003, 0.002]}
        />
      </EffectComposer>
      <ambientLight intensity={1.5} />
      <OrbitControls enableRotate={false} enableZoom={false} />
      <Layout />
    </Canvas>
  );
}

export function Layout() {
  return (
    <Flex flexDirection="column">
      <Box>
        <Hero />
      </Box>
      <Box>
        <SphereNoise />
      </Box>
    </Flex>
  );
}

export function SphereNoise() {
  const meshRef = useRef();
  const hoverRef = useRef(false);
  const uniforms = useMemo(
    () => ({
      u_time: {
        value: 0.0,
      },
      u_intensity: {
        value: 0.85,
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
    <mesh
      onPointerOver={() => (hoverRef.current = true)}
      ref={meshRef}
      onPointerOut={() => (hoverRef.current = false)}
      position={[0, -1, -16]}
    >
      <icosahedronGeometry args={[16, 60]} />
      <shaderMaterial
        vertexShader={sphereNoiseVertex}
        fragmentShader={frag}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export function Hero() {
  const letterSpacing = 0.075;
  return (
    <Flex flexDirection="column" plane="xz">
      <Box>
        <Flex position={[0.75, -0.1, 0]} flexDirection="row" plane="xz">
          <Box marginLeft={-letterSpacing}>
            <Text
              font={hardbopNormal}
              color={roseColor}
              anchorX="right"
              anchorY="middle"
              fontSize={1}
              letterSpacing={letterSpacing}
            >
              BERNARD
            </Text>
          </Box>
          <Text
            font={hardbopNormal}
            color="#0c0a09"
            strokeWidth={0.01}
            strokeColor={roseColor}
            anchorX="left"
            anchorY="middle"
            fontSize={1}
            letterSpacing={letterSpacing}
          >
            US
          </Text>
        </Flex>
      </Box>
      <Box marginBottom={1}>
        <mesh castShadow>
          <torusKnotGeometry args={[6, 0.125, 3000, 200, 6, 48]} />
          <MeshDistortMaterial distort={0.2} speed={2} color="white" />
        </mesh>
        <mesh castShadow rotation={[-Math.PI / 1, 0, 0]} position={[0, 0, 0]}>
          <torusKnotGeometry args={[12, 0.75, 3000, 200, 30, 12]} />
          <MeshDistortMaterial
            distort={0.15}
            speed={1.5}
            color={roseColor500}
          />
        </mesh>
      </Box>
    </Flex>
  );
}
