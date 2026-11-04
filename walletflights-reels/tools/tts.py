"""Kokoro TTS for one reel. Usage: python -I tools/tts.py <request.json> <out.wav> <timings.json>

request.json: {"voice": "bf_emma", "lang": "en-gb", "speed": 1.05, "leadMs": 120,
               "segments": [{"id": "hook", "say": "...", "pauseAfterMs": 250}, ...]}
Each segment is voiced separately, trimmed to its speech, and joined with the given pauses, so
segment start/end times are exact (the templates time their beats to them).
"""
import json, sys, os
import numpy as np
import soundfile as sf
from kokoro_onnx import Kokoro

HERE = os.path.dirname(os.path.abspath(__file__))
req = json.load(open(sys.argv[1]))
k = Kokoro(os.path.join(HERE, "kokoro", "kokoro-v1.0.onnx"), os.path.join(HERE, "kokoro", "voices-v1.0.bin"))

def trim(x, sr, thresh=0.012, keep_ms=30):
    idx = np.where(np.abs(x) > thresh)[0]
    if len(idx) == 0:
        return x[:0]
    keep = int(sr * keep_ms / 1000)
    return x[max(0, idx[0] - keep): min(len(x), idx[-1] + keep)]

sr = 24000
out = [np.zeros(int(sr * req.get("leadMs", 120) / 1000), dtype=np.float32)]
t = len(out[0])
timings = []
for seg in req["segments"]:
    audio, sr = k.create(seg["say"], voice=req["voice"], speed=req.get("speed", 1.05), lang=req["lang"])
    audio = trim(np.asarray(audio, dtype=np.float32), sr)
    start = t
    out.append(audio); t += len(audio)
    timings.append({"id": seg["id"], "startMs": round(start / sr * 1000), "endMs": round(t / sr * 1000)})
    gap = np.zeros(int(sr * seg.get("pauseAfterMs", 200) / 1000), dtype=np.float32)
    out.append(gap); t += len(gap)

wav = np.concatenate(out)
sf.write(sys.argv[2], wav, sr, subtype="PCM_16")
json.dump({"sampleRate": sr, "durationMs": round(len(wav) / sr * 1000), "segments": timings}, open(sys.argv[3], "w"), indent=2)
