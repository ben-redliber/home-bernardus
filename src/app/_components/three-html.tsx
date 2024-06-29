import { useState } from "react";
import { COLORS, HTMLPOS } from "../data";
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
        <Contact />
      </div>
    </>
  );
}

function HeroTexts() {
  return (
    <div
      className="absolute w-[100vw]"
      style={{
        top: HTMLPOS.heroTexts,
      }}
    >
      <div className="flex flex-col justify-center font-thin">
        <p className="text-center text-2xl font-normal tracking-tighter text-gray-300">
          WELCOME TO THE HOMEPAGE OF
        </p>
        <AnimLettersHero
          className="font-hardbop content-center justify-center text-center align-top text-[30vw] font-black text-rose-500 md:text-[16vw]"
          style={{ letterSpacing: "0.01em", lineHeight: "0.7" }}
        >
          BERNARDUS
        </AnimLettersHero>
        {/* <p
          className="font-hardbop text-center align-top text-[30vw] font-black text-rose-500 md:text-[16vw]"
          style={{ letterSpacing: "0.01em", lineHeight: "0.7" }}
        >
          BERNARD
          <span className="font-outline-2 text-slate-950">US</span>
        </p> */}
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
        className="font-hardbop flex w-full flex-col gap-2 text-center text-[13vw] font-black text-gray-300"
        style={{ letterSpacing: "0em", lineHeight: "10vw" }}
      >
        <AnimModal
          className="justify-center "
          modal="Posters, Banners, Concept Arts, Typography"
        >
          <AnimLettersPeak>GRAPHIC DESIGNER</AnimLettersPeak>
        </AnimModal>
        <AnimModal
          className="justify-center "
          modal="Animations, Motion Graphs, Video Editing"
        >
          <AnimLettersPeak>MOTION DESIGNER</AnimLettersPeak>
        </AnimModal>
        <AnimModal
          className="justify-center "
          modal="Level Design, Unreal Engine, Blender, Houdini"
        >
          <AnimLettersPeak>GAME DEVELOPER</AnimLettersPeak>
        </AnimModal>
        <AnimModal
          className="justify-center "
          modal="React - NextJS Dev, Back-end, Front-end"
        >
          <AnimLettersPeak>WEB DEVELOPER</AnimLettersPeak>
        </AnimModal>
        <AnimModal
          className="justify-center "
          modal="Screen Development, Directing, Producing"
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
        className="font-hardbop flex w-full flex-col gap-12 px-60 text-center text-[13vw] font-black text-gray-300"
        style={{ letterSpacing: "0em", lineHeight: "10vw" }}
      >
        <div className="w-full">
          <AnimLetters className="justify-end">THE BEST ART PAINT</AnimLetters>
          <AnimLetters className="" span spanIndex={12}>
            SKELETONS ON FLESH
          </AnimLetters>
        </div>
        <div className="w-full">
          <AnimLetters className="justify-start">
            THE BEST STORIES ARE
          </AnimLetters>
          <AnimLetters className="justify-end" span spanIndex={10}>
            WRITTEN IN BLOOD
          </AnimLetters>
        </div>
        <div className="w-full">
          <AnimLetters className="justify-center">THE BEST CODES</AnimLetters>
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
        className="font-hardbop flex w-full flex-col justify-center text-center text-[18vw] font-black text-gray-300"
        style={{
          letterSpacing: "0em",
          lineHeight: "14vw",
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
        backgroundColor: COLORS.ROSECOLOR500,
        top: HTMLPOS.contact,
      }}
    >
      <AnimLetters className="justify-end text-right text-[8vw] font-black leading-none tracking-tight text-gray-300">
        DON'T BE SHY
      </AnimLetters>
      <AnimLetters className="justify-end text-right text-[8vw] font-black leading-none tracking-tight text-gray-300">
        SIMPLY CONTACT ME
      </AnimLetters>
      <div className=" flex flex-row  justify-end text-start text-gray-300">
        <p className="tracking-tightest content-center text-right text-xl">
          b.bernardus@redliber.com
        </p>
        <p className="px-4 text-3xl">|</p>
        <SiX
          size="12px"
          color={COLORS.GRAY300}
          className="self-center"
          href="https://x.com/bb_redliber"
        />
        <a
          className="content-center self-center pr-1 font-semibold"
          href="https://x.com/bb_redliber"
        >
          &nbsp;@bb_redliber
        </a>
      </div>
    </div>
  );
}
