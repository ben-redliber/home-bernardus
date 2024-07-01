import { useState } from "react";
import { TWCOLORS, HTMLPOS, UTILCOLORS } from "../data";
import { SiX } from "@icons-pack/react-simple-icons";
import { motion } from "framer-motion";
import AnimLetters from "~/components/animations/anim-letters";
import AnimModal from "~/components/animations/anim-modal";
import AnimLettersPeak from "~/components/animations/anim-letters-peak";
import AnimLettersHero from "~/components/animations/anim-letters-hero";

export default function ThreeHTML() {
  return (
    <>
      <div className="absolute top-0 w-[100vw]">
        <HeroTexts />
        <Professions />
        <Proverbs />
        <SpeedOfDark />
        <div
          className="absolute z-[90] h-[200vh] w-[100vw] px-6 pt-10"
          style={{
            backgroundColor: UTILCOLORS.OBJECTS.WHITE,
            top: HTMLPOS.contactwhite,
          }}
        ></div>
        <Contact />
      </div>
    </>
  );
}

function HeroTexts() {
  return (
    <div className="absolute top-[40vh] w-[100vw] md:top-[30vh]">
      <div className="flex flex-col justify-center font-thin">
        <AnimLettersHero
          className="font-hardbop content-center justify-center text-center align-top text-[40vw] font-black md:text-[40vw]"
          style={{ letterSpacing: "0.0001em", lineHeight: "0.7" }}
        >
          BERNARDUS
        </AnimLettersHero>
      </div>
    </div>
  );
}

function Professions() {
  return (
    <div
      className=" absolute w-[100vw]"
      style={{
        top: HTMLPOS.professions,
      }}
    >
      <div
        className="font-hardbop flex w-full flex-col gap-2 text-center text-[24vw] font-black leading-[13vw] text-gray-50 md:text-[16vw] md:leading-[12vw]"
        style={{ letterSpacing: "0em" }}
      >
        <AnimModal
          hasModal={true}
          className="justify-center "
          modal="Posters, Banners, Concept Arts, Typography, Branding"
        >
          <AnimLettersPeak>GRAPHIC DESIGNER</AnimLettersPeak>
        </AnimModal>
        <AnimModal
          hasModal={true}
          className="justify-center "
          modal="Animations, Motion Graphs, Video Editing"
        >
          <AnimLettersPeak>MOTION DESIGNER</AnimLettersPeak>
        </AnimModal>
        <AnimModal
          hasModal={true}
          className="justify-center "
          modal="Level Design, Unreal Engine, Blender, Houdini"
        >
          <AnimLettersPeak>GAME DEVELOPER</AnimLettersPeak>
        </AnimModal>
        <AnimModal
          hasModal={true}
          className="justify-center "
          modal="React, NextJS, WebGL, Full-Stack"
        >
          <AnimLettersPeak>WEB DEVELOPER</AnimLettersPeak>
        </AnimModal>
        <AnimModal
          hasModal={true}
          className="justify-center "
          modal="Screenwriting, Directing, Producing"
        >
          <AnimLettersPeak>SCREENWRITER</AnimLettersPeak>
        </AnimModal>
      </div>
    </div>
  );
}

function Proverbs() {
  return (
    <div
      className=" absolute w-[100vw]"
      style={{
        top: HTMLPOS.proverbs,
      }}
    >
      <div
        className="font-hardbop flex w-full flex-col gap-20 px-2 text-center text-[23vw] font-black leading-[18vw] text-gray-50 md:px-60 md:text-[16vw] md:leading-[12vw]"
        style={{ letterSpacing: "0em" }}
      >
        <div className="w-full">
          <AnimLetters className="justify-end">THE BEST ART</AnimLetters>
          <AnimLetters className="justify-end">SCULPTS SKELETONS</AnimLetters>
          <AnimLetters className="" span spanIndex={6}>
            OUT OF FLESH
          </AnimLetters>
        </div>
        <div className="w-full">
          <AnimLetters className="justify-start">THE BEST STORIES</AnimLetters>
          <AnimLetters className="justify-end">ARE WRITTEN</AnimLetters>
          <AnimLetters className="justify-end" span spanIndex={2}>
            IN BLOOD
          </AnimLetters>
        </div>
        <div className="w-full">
          <AnimLetters className="justify-start">THE BEST</AnimLetters>
          <AnimLetters className="justify-center">EXPERIENCES</AnimLetters>
          <AnimLetters className="" span spanIndex={8}>
            PUMP THE HEART
          </AnimLetters>
        </div>
      </div>
    </div>
  );
}

function SpeedOfDark() {
  return (
    <div
      className="absolute w-[100vw]"
      style={{
        top: HTMLPOS.speedOfDark,
      }}
    >
      <div
        className="font-hardbop flex w-full flex-col justify-center px-1 text-center text-[23vw] font-black leading-[18vw] md:text-[18vw] md:leading-[13.25vw]"
        style={{
          letterSpacing: "0em",
        }}
      >
        <AnimLetters className="justify-start">WIELDING</AnimLetters>
        <AnimLetters className="justify-end">CREATIVITY AT THE</AnimLetters>
        <AnimLetters className="" span={true} spanIndex={8} spanRange={12}>
          SPEED OF DARK
        </AnimLetters>
      </div>
    </div>
  );
}

function Contact() {
  return (
    <div
      className="absolute z-[100] h-[200vh] w-[100vw] px-6 pt-10"
      style={{
        backgroundColor: TWCOLORS.ROSECOLOR500,
        top: HTMLPOS.contact,
      }}
    >
      <AnimLetters className="justify-end text-right text-[8vw] font-black leading-none tracking-tight ">
        DON'T BE SHY
      </AnimLetters>
      <AnimLetters className="justify-end text-right text-[8vw] font-black leading-none tracking-tight ">
        SIMPLY CONTACT ME
      </AnimLetters>
      <div className=" flex flex-col justify-end gap-0 pr-1 pt-24 text-start leading-none text-gray-300 md:pt-0">
        <p
          className="tracking-tightest content-center self-end text-right text-base md:text-xl"
          id="email"
        >
          b.bernardus@redliber.com
        </p>
        <div className="flex flex-row self-end">
          <SiX
            size="12px"
            color={TWCOLORS.GRAY300}
            className="self-center"
            href="https://x.com/bb_redliber"
          />
          <a
            className="content-center self-end"
            href="https://x.com/bb_redliber"
          >
            &nbsp;@bb_redliber
          </a>
        </div>
      </div>
    </div>
  );
}
