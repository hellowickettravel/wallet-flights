import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** The wallet-and-wing mark from the header logo, as the favicon. */
export function LogoMark({ scale = 1 }: { scale?: number }) {
  const s = (n: number) => n * scale;
  return (
    <div style={{ width: s(64), height: s(64), background: "#1f5bd8", borderRadius: s(18), display: "flex", position: "relative" }}>
      <div style={{ position: "absolute", left: s(13), top: s(18), width: s(37), height: s(11), background: "#ffc83d", borderRadius: s(6), transform: "skewX(-24deg)" }} />
      <div style={{ position: "absolute", left: s(13), top: s(29), width: s(38), height: s(22), background: "#ffffff", borderRadius: s(6) }} />
      <div style={{ position: "absolute", left: s(40), top: s(37), width: s(7), height: s(7), background: "#1f5bd8", borderRadius: s(7) }} />
    </div>
  );
}

export default function Icon() {
  return new ImageResponse(<LogoMark />, size);
}
