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
  Center,
  Mask,
  useMask,
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
import DarkSpeed from "./dark-speed";

type UniformsBoilerplate = {
  u_time?: number;
  u_intensity?: number;
};

const HARDBOPBLACK = "./fonts/hardbop/hardbop-black.otf";
const HARDBOPBLACKJSON = "./fonts/hardbop/hardbop-black.json";

const ROSECOLOR = "#be123c";
const ROSECOLOR500 = "#f43f5e";
const ROSECOLOR400 = "#fb7185";
const ROSECOLORSPHERE = "#FF415C";
const SLATE950 = "#020617";

const SCROLLPAGES = 16;
const SCROLLOFFSET1 = 0.24;
const SCROLLOFFSET2 = 0.4;

class CustomSin extends THREE.Curve {
  constructor(scale = 0.1) {
    super();
    this.scale = scale;
  }

  getPoint(t, optionalTarget = new THREE.Vector3()) {
    const tx = t * 35;
    const ty = Math.sin(6 * Math.PI * t);
    const tz = 0;

    return optionalTarget.set(tx, ty, tz).multiplyScalar(this.scale);
  }
}

export default function ThreeScene() {
  // const mainRenderTarget = useFBO();
  return (
    <Canvas
      // shadows
      camera={{ fov: 74 }}
      className="h-full w-full"
      dpr={[1, 2]}
      color={ROSECOLOR}
    >
      <ThreeCanvas />
    </Canvas>
  );
}

export function ThreeCanvas() {
  const three = useThree();
  // three.scene.background

  return (
    <>
      <EffectComposer>
        <Noise opacity={0.05} />
        <Vignette eskil={true} offset={1.25} darkness={1.05} />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL} // blend mode
          offset={[0.002, 0.0005]} // color offset
        />
      </EffectComposer>
      <ambientLight intensity={3} />
      {/* <OrbitControls /> */}
      <Suspense fallback={null}>
        <Layout />
      </Suspense>
    </>
  );
}

export function Layout() {
  const { width, height } = useScreenSize();
  const ref = useRef();
  const data = [
    "THE BEST ART CAPTURES SKELETONS IN THE FLESH",
    "THE BEST STORIES ARE WRITTEN IN BLOOD",
    "THE BEST EXPERIENCES PUMPS YOUR HEARTRATE",
  ];

  const creativity = "CREATIVITY AT THE SPEED OF DARK";
  const creativityArr = Array.from("G".repeat(10));

  const sphereRadius = THREE.MathUtils.mapLinear(width, 2000, 300, 12, 2);
  const [BGCOLOR, setBGCOLOR] = useState(new THREE.Color(SLATE950));
  const [speed, setSpeed] = useState(0.5);
  function handleNewColor(newcolor: THREE.Color) {
    ref.current.lerp(new THREE.Color(newcolor), 0.1);
  }
  function handleNewSpeed(newSpeed: number) {
    setSpeed(newSpeed);
  }
  return (
    <ScrollControls
      pages={SCROLLPAGES}
      distance={0.5}
      maxSpeed={speed}
      // eps={0.0001}
    >
      <color ref={ref} attach="background" args={[BGCOLOR]} />
      <Scroll>
        <Transitions
          sendNewColor={handleNewColor}
          sendNewSpeed={handleNewSpeed}
        />
        <Hero />
      </Scroll>
      <Scroll>
        <group renderOrder={0}>
          <SphereNoise />
          <group position={[0, -36, -15]} scale={[0.9, 0.9, 0.9]}>
            <mesh>
              <icosahedronGeometry args={[sphereRadius, 60]} />
              <meshBasicMaterial
                color={ROSECOLORSPHERE}
                side={THREE.BackSide}
              />
            </mesh>
          </group>
        </group>
      </Scroll>
      <Scroll>
        <group position={[0, -62.5, -15]} scale={[0.8, 0.8, 0.8]}>
          <DarkSpeed SCROLLOFFSET={SCROLLOFFSET2} />
        </group>
      </Scroll>
      <Scroll html>
        <div className="absolute top-0 w-[100vw]">
          <div className="absolute top-[35vh] w-[100vw]">
            <div className="flex flex-col justify-center font-thin">
              <p className="text-center text-2xl font-normal tracking-tighter text-gray-300">
                WELCOME TO THE HOMEPAGE OF
              </p>
              <p
                className="font-hardbop text-center align-top text-[30vw] font-black text-rose-500 md:text-[16vw]"
                style={{ letterSpacing: "0.01em", lineHeight: "0.7" }}
              >
                BERNARD<span className="font-outline-2 text-slate-950">US</span>
              </p>
            </div>
          </div>
          <div className=" absolute top-[300vh] w-[100vw]">
            <div
              className="font-hardbop flex w-full flex-col gap-0 text-center text-[15vw] font-black text-gray-300"
              style={{ letterSpacing: "0em", lineHeight: "12vw" }}
            >
              <p>GRAPHIC DESIGNER</p>
              <p>MOTION DESIGNER</p>
              <p>GAME DEVELOPER</p>
              <p>WEB DEVELOPER</p>
              <p>SCREENWRITER</p>
            </div>
          </div>
          <div className=" absolute top-[480vh] w-[100vw]">
            <div
              className="font-hardbop flex w-full flex-col gap-0 px-20 text-center  text-[15vw] font-black text-gray-300"
              style={{ letterSpacing: "0em", lineHeight: "12vw" }}
            >
              <div className="w-full">
                <p>
                  THE BEST ART PAINT SKELETONS IN THE{" "}
                  <span className="  bg-gradient-to-br from-rose-700 to-rose-800 bg-clip-text text-transparent">
                    {" "}
                    FLESH
                  </span>
                </p>
              </div>
              <div className=" w-full">
                <p>
                  THE BEST STORIES ARE WRITTEN IN{" "}
                  <span className="  bg-gradient-to-br from-rose-700 to-rose-800 bg-clip-text text-transparent">
                    {" "}
                    BLOOD
                  </span>
                </p>
              </div>
              <div className=" w-full">
                <p>
                  THE BEST CODES PUMPS THE{" "}
                  <span className="  bg-gradient-to-br from-rose-700 to-rose-800 bg-clip-text text-transparent">
                    {" "}
                    HEART
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="absolute top-[700vh] w-[100vw]">
            <div
              className="font-hardbop flex w-full flex-col text-center text-[20vw] font-black text-gray-300"
              style={{
                letterSpacing: "0em",
                lineHeight: "16vw",
                // color: ROSECOLORSPHERE,
              }}
            >
              <p>WIELDING</p>
              <p>CREATIVITY AT THE</p>
              <p>
                SPEED OF <span style={{ color: ROSECOLORSPHERE }}>DARK</span>
              </p>
              {/* {creativityArr.map((item) => (
                <p style={{ color: ROSECOLORSPHERE }}>
                  CREATIVITY AT THE SPEED OF DARK
                </p>
              ))} */}
            </div>
          </div>
          <div
            className="absolute top-[975vh] h-[100vh] w-[100vw] bg-slate-950"
            // style={{ backgroundColor: ROSECOLORSPHERE }}
          ></div>
        </div>
      </Scroll>
      <Scroll></Scroll>
    </ScrollControls>
  );
}

export function Transitions({
  sendNewColor,
  sendNewSpeed,
}: {
  sendNewColor: Function;
  sendNewSpeed: Function;
}) {
  const scroll = useScroll();

  useEffect(() => {}, [scroll.offset]);

  useFrame((state) => {
    if (scroll.offset > SCROLLOFFSET1 * 1.3) {
      // sendNewColor(new THREE.Color(ROSECOLORSPHERE));
      sendNewSpeed(0.15);
    } else if (scroll.offset < SCROLLOFFSET1 * 1.3) {
      // sendNewColor(new THREE.Color(SLATE950));
      sendNewSpeed(0.4);
    }
  });
  return (
    <>{/* <color ref={ref} attach="background" args={[SLATE950_VEC]} /> */}</>
  );
}

export function TextData1() {
  const scroll = useScroll();
  const data = [
    "THE BEST ART DISPLAYS SKELETONS",
    "THE BEST STORIES ARE WRITTEN IN BLOOD",
    "THE BEST CODES GET THE MOST RETWEETS",
  ];
  const dataRef = useRef();
  const position = [0, -25, -16];
  const { width, height } = useScreenSize();
  const [useFontSize, setFontSize] = useState(1);
  const stencil = useMask(1);
  const sphereRadius = THREE.MathUtils.mapLinear(width, 2000, 300, 12, 2);

  useEffect(() => {
    setFontSize(width * 0.01 * 0.3);
  }, [width]);

  useFrame((state) => {
    const { clock, camera } = state;
    console.log("pos>", camera.position);
  });
  return (
    <>
      <group position={new THREE.Vector3(...position)}>
        {data.map((item, index) => (
          <Text
            // depthOffset={10}
            ref={dataRef}
            renderOrder={1}
            position={
              new THREE.Vector3(
                position[0],
                position[1] + useFontSize * (index + 1) * 0.8,
                position[2],
              )
            }
            key={item}
            font={HARDBOPBLACK}
            color={SLATE950}
            fontSize={useFontSize}
          >
            {item}
          </Text>
        ))}
      </group>
    </>
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
    <mesh
      onPointerOver={() => (hoverRef.current = true)}
      ref={meshRef}
      onPointerOut={() => (hoverRef.current = false)}
      position={[0, -36, -15]}
    >
      <icosahedronGeometry args={[sphereRadius, 72]} />
      <shaderMaterial
        vertexShader={sphereNoiseVertex}
        fragmentShader={frag}
        uniforms={uniforms}
      />
    </mesh>
  );
}

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

    if (scroll.offset > SCROLLOFFSET1) {
      camera.position.z = THREE.MathUtils.lerp(
        camera.position.z,
        5 - SCROLLOFFSET1 * 30,
        0.1,
      );
    }
    if (scroll.offset < SCROLLOFFSET1) {
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
          <MeshDistortMaterial distort={0.2} speed={1.5} color={ROSECOLOR500} />
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
