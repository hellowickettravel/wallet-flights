// Which kind of deploy this build is, on Vercel (VERCEL_ENV) or Netlify (CONTEXT).
// Inlined at build time by next.config.ts, so it holds on both hosts at runtime.
// "production" | "preview" | "" (local builds and the e2e server).
const raw = process.env.DEPLOY_CONTEXT ?? "";

export const isProductionDeploy = () => raw === "production";
export const isPreviewDeploy = () => raw !== "" && raw !== "production";
