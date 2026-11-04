import React from "react";
import { FONT_BODY } from "../lib/theme";
import { shortDate } from "../lib/format";
import type { Audience } from "../lib/types";

/** Required under every on-screen price: "found <date>, prices change". */
export const FareFootnote: React.FC<{
  foundOn: string;
  audience: Audience;
  extra?: string;
  style?: React.CSSProperties;
  dark?: boolean;
}> = ({ foundOn, audience, extra, style, dark }) => (
  <div
    style={{
      fontFamily: FONT_BODY,
      fontWeight: 600,
      fontSize: 30,
      letterSpacing: 0.2,
      color: dark ? "rgba(15,31,61,0.75)" : "rgba(255,255,255,0.82)",
      textShadow: dark ? "none" : "0 2px 8px rgba(0,0,0,0.6)",
      ...style,
    }}
  >
    {extra ? `${extra} · ` : ""}found {shortDate(foundOn, audience)}, prices change
  </div>
);
