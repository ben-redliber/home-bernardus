export default function Overlay() {
  return (
    <div className=" invisible absolute bottom-0 h-[12vh] w-full bg-transparent pb-16 mix-blend-exclusion sm:visible">
      <div
        className={
          "mx-2 flex h-full flex-row items-center justify-between gap-4 bg-transparent py-10 tracking-tight md:mx-10"
        }
      >
        <div className="flex max-w-[16rem] flex-col gap-2 bg-transparent md:max-w-md">
          <p className="text-xs font-thin leading-[1rem] md:text-lg md:leading-[1.5rem]">
            The unconscious contained the wisdom and experience of untold ages,
            and thus formed an unparalleled guide.
          </p>
          <p className="text-sm font-medium md:text-xl">CARL GUSTAV JUNG</p>
        </div>
        <div
          className=" justify-end bg-transparent align-bottom font-medium"
          style={{ maxWidth: "15rem" }}
        >
          <p className=" text-right text-sm font-thin md:text-xl">
            AVAILABLE FOR FREELANCE WORK
          </p>
        </div>
      </div>
    </div>
  );
}
