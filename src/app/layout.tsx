import "~/styles/globals.css";

import { Righteous, Archivo } from "next/font/google";
import local from "next/font/local";

import { NavBar } from "~/components/NavBar";
import Overlay from "./_components/overlay";
import { Suspense } from "react";
import Cursor from "~/components/cursor";

const displayFont = Righteous({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-display",
});

const mainFont = Archivo({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["italic", "normal"],
  subsets: ["latin"],
});

const bopFont = local({
  src: [
    {
      path: "../../public/fonts/hardbop/hardbop-thin.otf",
      weight: "100",
    },
    {
      path: "../../public/fonts/hardbop/hardbop-light.otf",
      weight: "300",
    },
    {
      path: "../../public/fonts/hardbop/hardbop-normal.otf",
      weight: "400",
    },
    {
      path: "../../public/fonts/hardbop/hardbop-regular.otf",
      weight: "500",
    },
    {
      path: "../../public/fonts/hardbop/hardbop-semibold.otf",
      weight: "600",
    },
    {
      path: "../../public/fonts/hardbop/hardbop-bold.otf",
      weight: "700",
    },
    {
      path: "../../public/fonts/hardbop/hardbop-ultrabold.otf",
      weight: "800",
    },
    {
      path: "../../public/fonts/hardbop/hardbop-black.otf",
      weight: "900",
    },
  ],
  variable: "--font-hardbop",
});

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${mainFont.className} ${bopFont.variable} bg-slate-950 text-rose-500`}
    >
      <body className="w-svw overflow-hidden">
        <Suspense fallback={"test"}>{children}</Suspense>
        <Cursor />
      </body>
    </html>
  );
}
