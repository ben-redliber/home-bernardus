export function NavBar() {
  return (
    <header
      className={"sticky top-0 z-50 h-[10vh] bg-transparent text-rose-500"}
    >
      <div
        className={
          "mx-10 flex h-full flex-row items-center justify-between gap-4 py-10 text-3xl font-bold tracking-tighter "
        }
      >
        <div>WORK</div>
        <div>BLOG</div>
      </div>
    </header>
  );
}
