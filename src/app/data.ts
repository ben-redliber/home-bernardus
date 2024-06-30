import * as THREE from "three";

const HARDBOPBLACK = "./fonts/hardbop/hardbop-black.otf";
const HARDBOPBLACKJSON = "./fonts/hardbop/hardbop-black.json";

const TWCOLORS = {
  ROSECOLOR100: "#ffe4e6",
  ROSECOLOR200: "#fecdd3",
  ROSECOLOR300: "#fda4af",
  ROSECOLOR400: "#fb7185",
  ROSECOLOR500: "#f43f5e",
  ROSECOLOR600: "#e11d48",
  ROSECOLOR700: "#be123c",
  ROSECOLORSPHERE: "#FF415C",
  SLATE950: "#020617",
  GRAY50: "#f9fafb",
  GRAY100: "#f3f4f6",
  GRAY200: "#e5e7eb",
  GRAY300: "#d1d5db",
  GRAY400: "#9ca3af",
  GRAY500: "#6b7280",
  GRAY600: "#4b5563",
  GRAY700: "#374151",
  GRAY800: "#1f2937",
  GRAY900: "#111827",
  GRAY950: "#030712",
  AMBER100: "#fef3c7",
  AMBER200: "#fde68a",
  AMBER300: "#fcd34d",
  AMBER400: "#fbbf24",
  AMBER500: "#f59e0b",
};

const UTILCOLORS = {
  HERO: {
    REGULAR: TWCOLORS.GRAY100,
    REGULAR_HOVERED: TWCOLORS.ROSECOLOR500,
    REGULAR_CLICKED: TWCOLORS.ROSECOLOR700,
    ACCENT: TWCOLORS.ROSECOLOR200,
    ACCENT_HOVERED: TWCOLORS.AMBER200,
    ACCENT_CLICKED: TWCOLORS.AMBER300,
  },
  HEADING: {
    REGULAR: TWCOLORS.GRAY200,
    REGULAR_HOVERED: TWCOLORS.ROSECOLOR300,
    REGULAR_CLICKED: TWCOLORS.ROSECOLOR700,
    ACCENT: TWCOLORS.ROSECOLOR600,
    ACCENT_HOVERED: TWCOLORS.AMBER200,
    ACCENT_CLICKED: TWCOLORS.AMBER100,
  },
  HEADING_2: {
    REGULAR: TWCOLORS.GRAY300,
    REGULAR_HOVERED: TWCOLORS.AMBER200,
    REGULAR_CLICKED: TWCOLORS.ROSECOLOR500,
    ACCENT: TWCOLORS.ROSECOLOR500,
    ACCENT_HOVERED: TWCOLORS.ROSECOLOR600,
    ACCENT_CLICKED: TWCOLORS.ROSECOLOR700,
  },
  MODAL: {
    REGULAR: TWCOLORS.GRAY200,
    REGULAR_HOVERED: TWCOLORS.GRAY700,
    REGULAR_CLICKED: TWCOLORS.ROSECOLOR500,
    ACCENT: TWCOLORS.ROSECOLOR500,
    ACCENT_HOVERED: TWCOLORS.ROSECOLOR600,
    ACCENT_CLICKED: TWCOLORS.ROSECOLOR700,
  },
  OBJECTS: {
    RED: TWCOLORS.ROSECOLOR500,
    PINK: TWCOLORS.ROSECOLOR200,
    WHITE: TWCOLORS.GRAY300,
    YELLOW: TWCOLORS.AMBER200,
    BLACK: TWCOLORS.SLATE950,
    BACKGROUND: TWCOLORS.SLATE950,
  },
};

const SCROLLS = {
  SCROLLPAGES: 10.75,
  SCROLLOFFSET_1: 0.24,
  SCROLLOFFSET_2: 0.4,
};

const PROJECTS = [
  ["DENDAM DERU", "Screenplay, TV Show"],
  ["TESTQUEST", "Branding, Website"],
  ["PERANAKAN", "Branding, Website, Business Administration"],
  ["DLOTC", "3D Modeler, Developer, Artist, Creator"],
  ["ARCHIPELAGO", "Director, Animator, Editor"],
  ["CASANOVA CC CUP", "Designer, Animator"],
  ["MUDIKA", "Designer, Cinematographer"],
  ["NANDERS GAME", "Producer, Screenwriter"],
];

const HTMLPOS = {
  heroTexts: "30vh",
  professions: "150vh",
  proverbs: "465vh",
  speedOfDark: "680vh",
  contact: "1020vh",
  contactwhite: "1015vh",
};

const OBJECTPOS = {};

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

export {
  HARDBOPBLACK,
  HARDBOPBLACKJSON,
  TWCOLORS,
  UTILCOLORS,
  SCROLLS,
  CustomSin,
  HTMLPOS,
  PROJECTS,
};
