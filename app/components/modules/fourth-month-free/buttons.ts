// Button classes mirror app/components/modules/home/Button.tsx so every CTA on
// this page reads exactly like the /glp2 pills (black primary, white secondary).
// Press feedback (scale 0.97) is the one addition; Tailwind v4 scale writes `scale`, so it is listed in the transition.
// Kept out of ui.tsx: a "use client" module hands server components a reference stub, not the string.
const BTN_BASE =
  "inline-flex items-center justify-center gap-2 px-6 md:px-10 py-3.5 rounded-full font-semibold transition-[color,background-color,border-color,scale] duration-150 ease-out active:scale-[0.97] motion-reduce:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2";
export const BTN_DARK = `${BTN_BASE} bg-black text-white shadow hover:bg-blue-500`;
export const BTN_LIGHT = `${BTN_BASE} bg-white text-black border border-gray-300 hover:border-blue-500 hover:bg-blue-500 hover:text-white`;
