/**
 * CLI config (`npx remotion studio|render`). The pipeline's render.ts passes the same
 * options to the Node APIs directly.
 */
import { Config } from "@remotion/cli/config";

Config.setEntryPoint("remotion/src/index.ts");
Config.setPublicDir("remotion/public");
Config.setRspack(true);
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setDefaultPremountInSeconds(2);
Config.setChromiumOpenGlRenderer("angle");
if (process.env.REMOTION_BROWSER_EXECUTABLE) Config.setBrowserExecutable(process.env.REMOTION_BROWSER_EXECUTABLE);
