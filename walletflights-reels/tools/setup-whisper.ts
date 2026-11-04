// Builds whisper.cpp into tools/whisper.cpp and downloads the base.en model (from Hugging Face).
import path from "node:path";
import { downloadWhisperModel, installWhisperCpp } from "@remotion/install-whisper-cpp";

const to = path.resolve("tools/whisper.cpp");
await installWhisperCpp({ to, version: "1.7.6" });
await downloadWhisperModel({ model: "base.en", folder: to });
console.log("whisper.cpp ready:", to);
