import * as THREE from "three";

const HARDBOPBLACK = "./fonts/hardbop/hardbop-black.otf";
const HARDBOPBLACKJSON = "./fonts/hardbop/hardbop-black.json";

const COLORS = {
  ROSECOLOR: "#be123c",
  ROSECOLOR500: "#f43f5e",
  ROSECOLOR400: "#fb7185",
  ROSECOLORSPHERE: "#FF415C",
  SLATE950: "#020617",
};

const SCROLLS = {
  SCROLLPAGES: 16,
  SCROLLOFFSET_1: 0.24,
  SCROLLOFFSET_2: 0.4,
};

const HTMLPOS = {
  heroTexts: "35vh",
  professions: "150vh",
  proverbs: "465vh",
  speedOfDark: "700vh",
};

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

export { HARDBOPBLACK, HARDBOPBLACKJSON, COLORS, SCROLLS, CustomSin, HTMLPOS };
