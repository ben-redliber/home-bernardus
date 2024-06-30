"use client";
import Link from "next/link";
import AnimModal from "./animations/anim-modal";
import { usePathname } from "next/navigation";

export function NavBar() {
  const usePath = usePathname().split("");
  const pathName = usePath.slice(1).join("");
  console.log(pathName);

  const paths = ["home", "works", "blog"];
  return (
    <header
      className={
        "sticky top-0 z-[100] h-[0vh] bg-transparent mix-blend-exclusion "
      }
    >
      <div
        className={
          "mx-2 flex h-full flex-col items-start justify-start gap-0 bg-transparent py-2 text-xl font-bold tracking-tighter md:mx-6 md:justify-between md:py-8 md:text-2xl lg:justify-start"
        }
      >
        {paths.map((item, index) => {
          const link = item == "home" ? "" : item;
          return (
            <Link key={index} href={`/${link}`}>
              {link == pathName ? (
                <div className="bg-transparent text-white hover:text-rose-300 active:text-amber-200">
                  {item.toUpperCase()}
                </div>
              ) : (
                <div className="bg-transparent hover:text-white active:text-amber-500">
                  {item.toUpperCase()}
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </header>
  );
}
