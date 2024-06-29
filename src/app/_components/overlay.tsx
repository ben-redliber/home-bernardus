export default function Overlay() {
  return (
    <div className=" absolute bottom-0 h-[12vh] w-full bg-transparent pb-16">
      <div
        className={
          "mx-10 flex h-full flex-row items-center justify-between gap-4 py-10 tracking-tight"
        }
      >
        <div className="flex max-w-md flex-col gap-2">
          <p className="text-lg font-thin" style={{ lineHeight: "1.5rem" }}>
            The unconscious contained the wisdom and experience of untold ages,
            and thus formed an unparalleled guide.
          </p>
          <p className=" text-xl font-medium">CARL GUSTAV JUNG</p>
        </div>
        <div
          className=" justify-end align-bottom font-medium"
          style={{ maxWidth: "15rem" }}
        >
          <p className=" text-right text-xl font-thin">
            AVAILABLE FOR FREELANCE WORK
          </p>
        </div>
      </div>
    </div>
  );
}
