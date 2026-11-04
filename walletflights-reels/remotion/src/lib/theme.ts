// Brand tokens for the reels (from the site's docs/DESIGN.md), plus layout constants.
export const C = {
  ink: "#0F1F3D",
  inkDeep: "#091530",
  inkSoft: "#1B2E55",
  line: "#2B4170",
  sun: "#FFC83D",
  fare: "#0A7F4F",
  fareBright: "#19B26B",
  dear: "#A63A28",
  white: "#FFFFFF",
  mist: "#F3F6FB",
  paper: "#FBF8F1",
  muted: "rgba(255,255,255,0.72)",
} as const;

export const FONT_DISPLAY = "'Bricolage Grotesque', 'Inter', sans-serif";
export const FONT_BODY = "'Inter', sans-serif";

// Instagram covers ~200 px at the top (header) and ~420 px at the bottom (caption, buttons),
// and ~140 px on the right (action rail). Keep text inside this box.
export const SAFE = { left: 80, right: 160, top: 220, bottom: 1500 } as const;

export const W = 1080;
export const H = 1920;
export const FPS = 30;
