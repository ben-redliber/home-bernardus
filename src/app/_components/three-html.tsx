import { COLORS, HTMLPOS } from "../data";

export default function ThreeHTML() {
  return (
    <>
      <div className="absolute top-0 w-[100vw]">
        <HeroTexts />
        <Professions />
        <Proverbs />
        <SpeedOfDark />
        <div
          className="absolute top-[1050vh] h-[200vh] w-[100vw]"
          style={{ backgroundColor: COLORS.ROSECOLORSPHERE }}
        ></div>
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
        <p
          className="font-hardbop text-center align-top text-[30vw] font-black text-rose-500 md:text-[16vw]"
          style={{ letterSpacing: "0.01em", lineHeight: "0.7" }}
        >
          BERNARD
          <span className="font-outline-2 text-slate-950">US</span>
        </p>
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
        className="font-hardbop flex w-full flex-col gap-20 text-center text-[15vw] font-black text-gray-300"
        style={{ letterSpacing: "0em", lineHeight: "12vw" }}
      >
        <p>GRAPHIC DESIGNER</p>
        <p>MOTION DESIGNER</p>
        <p>GAME DEVELOPER</p>
        <p>WEB DEVELOPER</p>
        <p>SCREENWRITER</p>
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
        className="font-hardbop flex w-full flex-col gap-20 px-20 text-center  text-[15vw] font-black text-gray-300"
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
            THE BEST CODES PUMP THE{" "}
            <span className="  bg-gradient-to-br from-rose-700 to-rose-800 bg-clip-text text-transparent">
              {" "}
              HEART
            </span>
          </p>
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
        className="font-hardbop flex w-full flex-col text-center text-[20vw] font-black text-gray-300"
        style={{
          letterSpacing: "0em",
          lineHeight: "16vw",
        }}
      >
        <p>WIELDING</p>
        <p>CREATIVITY AT THE</p>
        <p>
          SPEED OF <span style={{ color: COLORS.ROSECOLORSPHERE }}>DARK</span>
        </p>
      </div>
    </div>
  );
}
