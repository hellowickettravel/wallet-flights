// Approximate airport coordinates and standard UTC offsets, used only to make
// demo durations and local times realistic. Not for navigation.
export const geo: Record<string, [lat: number, lon: number, utc: number]> = {
  NYC: [40.64, -73.78, -5], JFK: [40.64, -73.78, -5], EWR: [40.69, -74.17, -5], LAX: [33.94, -118.41, -8],
  ORD: [41.98, -87.9, -6], IAH: [29.99, -95.34, -6], ATL: [33.64, -84.43, -5], DFW: [32.9, -97.04, -6],
  MIA: [25.79, -80.29, -5], SFO: [37.62, -122.38, -8], SEA: [47.45, -122.31, -8], BOS: [42.36, -71.01, -5],
  IAD: [38.95, -77.46, -5], MCO: [28.43, -81.31, -5], YYZ: [43.68, -79.63, -5],
  LON: [51.47, -0.45, 0], LHR: [51.47, -0.45, 0], LGW: [51.15, -0.19, 0], MAN: [53.35, -2.27, 0],
  EDI: [55.95, -3.36, 0], BHX: [52.45, -1.75, 0], CDG: [49.01, 2.55, 1], FCO: [41.8, 12.25, 1],
  MAD: [40.49, -3.57, 1], BCN: [41.3, 2.08, 1], LIS: [38.77, -9.13, 0], AMS: [52.31, 4.76, 1],
  FRA: [50.03, 8.57, 1], IST: [41.26, 28.74, 3], DXB: [25.25, 55.36, 4], DOH: [25.27, 51.61, 3],
  CAI: [30.12, 31.41, 2], LOS: [6.58, 3.32, 1], ACC: [5.61, -0.17, 0], CPT: [-33.97, 18.6, 2],
  DEL: [28.56, 77.1, 5.5], BOM: [19.09, 72.87, 5.5], MNL: [14.51, 121.02, 8], BKK: [13.69, 100.75, 7],
  SIN: [1.36, 103.99, 8], HND: [35.55, 139.78, 9], ICN: [37.46, 126.44, 9], DPS: [-8.75, 115.17, 8],
  SYD: [-33.94, 151.18, 10], CUN: [21.04, -86.87, -5], MEX: [19.44, -99.07, -6], GIG: [-22.81, -43.25, -3],
  LIM: [-12.02, -77.11, -5], CUZ: [-13.54, -71.94, -5],
};

export function distanceKm(a: string, b: string) {
  const [la1, lo1] = geo[a] ?? [0, 0];
  const [la2, lo2] = geo[b] ?? [0, 0];
  const r = Math.PI / 180;
  const h =
    Math.sin(((la2 - la1) * r) / 2) ** 2 +
    Math.cos(la1 * r) * Math.cos(la2 * r) * Math.sin(((lo2 - lo1) * r) / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
}

export const utcOffset = (code: string) => geo[code]?.[2] ?? 0;
