import React, { useEffect, useRef, useState } from "react";
import * as turf from "@turf/turf";
import * as maplibregl from "maplibre-gl";
import type { GeoJSONSource, Map as MlMap, StyleSpecification } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { AbsoluteFill, interpolate, Easing, staticFile, useCurrentFrame, useDelayRender, useVideoConfig } from "remotion";
import { C, FONT_BODY, FONT_DISPLAY } from "../lib/theme";

export type ArcStop = {
  name: string;
  lngLat: [number, number];
  /** Frame the arc starts drawing. */
  at: number;
  label: string;
  chip?: string;
};

const ARC_FRAMES = 26;

const greatCircle = (from: [number, number], to: [number, number]) => {
  const route = turf.greatCircle(from, to, { npoints: 120 });
  if (route.geometry.type === "LineString") return turf.lineString(route.geometry.coordinates);
  const longest = route.geometry.coordinates.reduce((a, b) => (b.length > a.length ? b : a));
  return turf.lineString(longest);
};

// Offline mode: MapLibre draws only the arcs on a transparent canvas; the land underneath is one
// SVG projected through the same camera (map.project), so there are no tiles and no seams.
const offlineStyle = (): StyleSpecification => ({ version: 8, sources: {}, layers: [] });

type Geo = { features: { geometry: { type: string; coordinates: number[][][] | number[][][][] } }[] };
const projectLand = (m: MlMap, geo: Geo, w: number, h: number) => {
  const parts: string[] = [];
  const ring = (r: number[][]) => {
    let d = "";
    let any = false;
    let prev: number | null = null;
    r.forEach(([rawLng, lat], i) => {
      // Unwrap across the antimeridian so Russia/Fiji don't sweep a band across the map.
      let lng = rawLng;
      if (prev !== null) while (lng - prev > 180) lng -= 360;
      if (prev !== null) while (prev - lng > 180) lng += 360;
      prev = lng;
      const pt = m.project([lng, lat]);
      if (pt.x > -w && pt.x < 2 * w && pt.y > -h && pt.y < 2 * h) any = true;
      d += `${i ? "L" : "M"}${pt.x.toFixed(1)},${pt.y.toFixed(1)}`;
    });
    if (any) parts.push(d + "Z");
  };
  for (const f of geo.features) {
    const g = f.geometry;
    if (g.type === "Polygon") (g.coordinates as number[][][]).forEach(ring);
    else if (g.type === "MultiPolygon") (g.coordinates as number[][][][]).forEach((poly) => poly.forEach(ring));
  }
  return parts.join("");
};

// OpenFreeMap (no key). Set OPENFREEMAP_STYLE at render time to change; needs network at render.
const OPENFREEMAP_STYLE = "https://tiles.openfreemap.org/styles/dark";

let workerSet = false;

/**
 * Dark map, origin pulse, great-circle arcs that draw in one by one, price chips on arrival.
 * Camera is fixed (fit to all points) for shimmer-free renders; the whole plate eases in slightly.
 */
export const FlightArc: React.FC<{
  origin: { name: string; lngLat: [number, number] };
  stops: ArcStop[];
  mapStyle: "offline" | "openfreemap";
  padding?: { top: number; bottom: number; left: number; right: number };
  attribution?: boolean;
}> = ({ origin, stops, mapStyle, padding = { top: 820, bottom: 740, left: 220, right: 280 }, attribution = true }) => {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const { delayRender, continueRender } = useDelayRender();
  const [map, setMap] = useState<MlMap | null>(null);
  const [points, setPoints] = useState<{ x: number; y: number }[] | null>(null);
  const [land, setLand] = useState<string | null>(null);
  const [handle] = useState(() => delayRender("Loading map"));

  useEffect(() => {
    if (!ref.current) return;
    if (!workerSet) {
      workerSet = true;
      const url = new URL(staticFile("maplibre/maplibre-gl-worker.mjs"), window.location.href).href;
      maplibregl.setWorkerUrl(URL.createObjectURL(new Blob([`import "${url}";`], { type: "text/javascript" })));
    }
    const all = [origin.lngLat, ...stops.map((s) => s.lngLat)];
    const bounds = all.reduce((b, p) => b.extend(p), new maplibregl.LngLatBounds(all[0], all[0]));
    const m = new maplibregl.Map({
      container: ref.current,
      style: mapStyle === "offline" ? offlineStyle() : OPENFREEMAP_STYLE,
      bounds,
      fitBoundsOptions: { padding },
      interactive: false,
      attributionControl: false,
      fadeDuration: 0,
      renderWorldCopies: false,
      canvasContextAttributes: { preserveDrawingBuffer: true, antialias: true },
    });
    m.on("load", () => {
      stops.forEach((s, i) => {
        m.addSource(`arc-${i}`, { type: "geojson", data: turf.lineString([s.lngLat, s.lngLat]) });
        m.addLayer({
          id: `arc-${i}`,
          type: "line",
          source: `arc-${i}`,
          layout: { "line-cap": "round", "line-join": "round" },
          paint: { "line-color": C.sun, "line-width": 7 },
        });
        m.addSource(`head-${i}`, { type: "geojson", data: turf.featureCollection([]) });
        m.addLayer({
          id: `head-${i}`,
          type: "circle",
          source: `head-${i}`,
          paint: { "circle-color": C.white, "circle-radius": 11, "circle-stroke-color": C.sun, "circle-stroke-width": 5 },
        });
      });
      m.once("idle", async () => {
        setPoints([origin.lngLat, ...stops.map((s) => s.lngLat)].map((p) => m.project(p)));
        if (mapStyle === "offline") {
          const geo = (await (await fetch(staticFile("geo/countries-50m.geojson"))).json()) as Geo;
          setLand(projectLand(m, geo, width, height));
        }
        setMap(m);
        continueRender(handle);
      });
    });
    m.on("error", (e) => console.error("map error", e.error?.message));
    // No m.remove() cleanup: it interferes with Remotion's render lifecycle.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!map) return;
    const h = delayRender(`map frame ${frame}`);
    stops.forEach((s, i) => {
      const line = greatCircle(origin.lngLat, s.lngLat);
      const len = turf.length(line);
      const p = interpolate(frame, [s.at, s.at + ARC_FRAMES], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.bezier(0.45, 0, 0.2, 1),
      });
      const part = turf.lineSliceAlong(line, 0, Math.max(0.001, len * p));
      (map.getSource(`arc-${i}`) as GeoJSONSource).setData(p > 0 ? part : turf.lineString([s.lngLat, s.lngLat]));
      const head = turf.along(line, len * p).geometry.coordinates as [number, number];
      (map.getSource(`head-${i}`) as GeoJSONSource).setData(
        p > 0 && p < 1 ? turf.featureCollection([turf.point(head)]) : turf.featureCollection([]),
      );
    });
    map.once("idle", () => continueRender(h));
    map.triggerRepaint();
  }, [map, frame, stops, origin, delayRender, continueRender]);

  const zoomIn = interpolate(frame, [0, 600], [1.0, 1.06], { extrapolateRight: "clamp" });
  const pulse = (frame % 36) / 36;

  return (
    <AbsoluteFill style={{ backgroundColor: C.inkDeep, transform: `scale(${zoomIn})` }}>
      {land ? (
        <svg width={width} height={height} style={{ position: "absolute", inset: 0 }}>
          <path d={land} fill="#16284D" stroke="#2B4170" strokeWidth={1.4} strokeLinejoin="round" />
        </svg>
      ) : null}
      <div ref={ref} style={{ position: "absolute", width, height }} />
      {points ? (
        <>
          {/* Origin pulse */}
          <div style={{ position: "absolute", left: points[0].x, top: points[0].y }}>
            <div
              style={{
                position: "absolute",
                width: 160,
                height: 160,
                left: -80,
                top: -80,
                borderRadius: "50%",
                border: `6px solid ${C.sun}`,
                transform: `scale(${0.2 + pulse})`,
                opacity: 1 - pulse,
              }}
            />
            <div style={{ position: "absolute", width: 40, height: 40, left: -20, top: -20, borderRadius: "50%", backgroundColor: C.sun, border: `6px solid ${C.white}` }} />
            <div
              style={{
                position: "absolute",
                left: -200,
                width: 400,
                top: -86,
                textAlign: "center",
                fontFamily: FONT_BODY,
                fontWeight: 800,
                fontSize: 40,
                color: C.white,
                letterSpacing: 1,
                textShadow: "0 2px 10px rgba(0,0,0,0.8)",
              }}
            >
              {origin.name.toUpperCase()}
            </div>
          </div>
          {stops.map((s, i) => {
            const pt = points[i + 1];
            const t = frame - (s.at + ARC_FRAMES - 4);
            if (t < 0) return null;
            const pop = interpolate(t, [0, 6, 10], [0.4, 1.12, 1], { extrapolateRight: "clamp" });
            // Chip sits under the pin, nudged sideways so it stays inside the safe area (x 60–920).
            const half = 130;
            const shift = Math.min(0, 920 - (pt.x + half)) + Math.max(0, 60 - (pt.x - half));
            return (
              <div key={s.name} style={{ position: "absolute", left: pt.x, top: pt.y }}>
                <div style={{ position: "absolute", width: 26, height: 26, left: -13, top: -13, borderRadius: "50%", backgroundColor: C.white, border: `5px solid ${C.sun}` }} />
                <div
                  style={{
                    position: "absolute",
                    left: shift,
                    top: 26,
                    transform: `translateX(-50%) scale(${pop})`,
                    transformOrigin: "top center",
                    backgroundColor: C.white,
                    borderRadius: 18,
                    padding: "8px 20px 10px",
                    boxShadow: "0 12px 30px rgba(0,0,0,0.45)",
                    whiteSpace: "nowrap",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontFamily: FONT_BODY, fontWeight: 800, fontSize: 26, color: C.ink, letterSpacing: 1 }}>{s.name.toUpperCase()}</div>
                  <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 56, lineHeight: 1, color: C.fare }}>{s.label}</div>
                  {s.chip ? <div style={{ fontFamily: FONT_BODY, fontWeight: 700, fontSize: 22, color: C.ink, opacity: 0.7 }}>{s.chip}</div> : null}
                </div>
              </div>
            );
          })}
        </>
      ) : null}
      {/* Natural Earth (offline plate) is public domain; OpenFreeMap/OSM need visible credit. */}
      {attribution && mapStyle === "openfreemap" ? (
        <div style={{ position: "absolute", left: 80, top: 1505, fontFamily: FONT_BODY, fontWeight: 600, fontSize: 18, color: "rgba(255,255,255,0.55)" }}>
          © OpenFreeMap © OpenMapTiles © OpenStreetMap contributors
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
