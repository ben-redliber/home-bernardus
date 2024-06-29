import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fitRange(
  number: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
) {
  return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}
