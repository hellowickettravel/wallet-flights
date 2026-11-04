import { continueRender, delayRender, staticFile } from "remotion";

// Fonts are bundled from @fontsource (public/fonts) so renders need no network.
const faces: [string, string, string][] = [
  ["Bricolage Grotesque", "fonts/bricolage-grotesque-latin-800-normal.woff2", "800"],
  ["Inter", "fonts/inter-latin-600-normal.woff2", "600"],
  ["Inter", "fonts/inter-latin-700-normal.woff2", "700"],
  ["Inter", "fonts/inter-latin-800-normal.woff2", "800"],
];

let loaded = false;
export const loadFonts = () => {
  if (loaded || typeof document === "undefined") return;
  loaded = true;
  const handle = delayRender("Loading fonts");
  Promise.all(
    faces.map(([family, file, weight]) => {
      const f = new FontFace(family, `url(${staticFile(file)}) format('woff2')`, { weight });
      document.fonts.add(f);
      return f.load();
    }),
  )
    .then(() => continueRender(handle))
    .catch((e) => {
      console.error(e);
      continueRender(handle);
    });
};
