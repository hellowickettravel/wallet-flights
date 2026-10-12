import { ImageResponse } from "next/og";
import { LogoMark } from "./icon";

export const alt = "Wallet Flights: compare cheap flights in one place";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const board = [
    ["LHR", "JFK", "£389"],
    ["JFK", "LHR", "$489"],
    ["MAN", "DXB", "£436"],
  ];
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", background: "#0f1f3d", display: "flex", padding: 72, color: "white", justifyContent: "space-between" }}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 600 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <LogoMark scale={1.1} />
          <div style={{ fontSize: 44, fontWeight: 800, display: "flex" }}>
            Wallet<span style={{ color: "#ffc83d" }}>Flights</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.02, letterSpacing: -2 }}>Every flight price, side by side.</div>
          <div style={{ fontSize: 30, color: "rgba(255,255,255,0.75)", marginTop: 24 }}>Compare airlines and travel sites, cheapest first.</div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 14 }}>
        {board.map((row) => (
          <div key={row.join()} style={{ display: "flex", gap: 22, background: "#13284d", padding: "18px 24px", borderRadius: 16 }}>
            {row.map((cell, i) => (
              <div key={i} style={{ display: "flex", gap: 6 }}>
                {cell.split("").map((ch, j) => (
                  <div key={j} style={{ width: 34, height: 48, background: "#1b345f", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, fontWeight: 700, color: i === 2 ? "#ffc83d" : "white" }}>
                    {ch}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>,
    size,
  );
}
