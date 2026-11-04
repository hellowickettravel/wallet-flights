// All steps for one or more days, in order: fetch-fares → write-script → tts → captions →
// fetch-broll → render. Each step writes a file, so a failed reel can be re-run from the broken step.
import { args } from "./lib";
import { fetchFares } from "./fetch-fares";
import { writeScript } from "./write-script";
import { tts } from "./tts";
import { captions } from "./captions";
import { fetchBroll } from "./fetch-broll";
import { render } from "./render";

const { days, flags } = args();
for (const d of days) {
  await fetchFares(d);
  await writeScript(d);
  tts(d);
  await captions(d);
  await fetchBroll(d);
  await render(d, { sample: flags.has("--sample") });
}
