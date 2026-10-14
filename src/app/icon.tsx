import { ImageResponse } from "next/og";
import { LogoMarkSvg } from "@/components/layout/logo-mark";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** The header logo's wallet-and-plane mark, as the favicon and in social images. */
export function LogoMark({ scale = 1 }: { scale?: number }) {
  return (
    <div style={{ display: "flex", width: 64 * scale, height: 64 * scale }}>
      <LogoMarkSvg size={64 * scale} />
    </div>
  );
}

export default function Icon() {
  return new ImageResponse(<LogoMark />, size);
}
