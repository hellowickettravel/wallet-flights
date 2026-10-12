import { ImageResponse } from "next/og";
import { LogoMark } from "./icon";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div style={{ width: 180, height: 180, background: "#0f1f3d", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <LogoMark scale={2} />
    </div>,
    size,
  );
}
