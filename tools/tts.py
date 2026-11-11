"""Generate narration wavs with kokoro-onnx. Usage: python tts.py MODEL.onnx VOICES.bin OUTDIR"""
import sys, os, numpy as np, soundfile as sf
sys.path.insert(0, os.path.dirname(__file__))
from script import SCENES, VOICE, SPEED
from kokoro_onnx import Kokoro
model, voices, out = sys.argv[1:4]
os.makedirs(out, exist_ok=True)
k = Kokoro(model, voices)
for si, sc in enumerate(SCENES):
    for li, (st, text) in enumerate(sc["lines"]):
        s, sr = k.create(text, voice=VOICE, speed=SPEED, lang="en-us")
        sf.write(f"{out}/s{si}_{li}.wav", s, sr)
        nxt = sc["lines"][li+1][0] if li+1 < len(sc["lines"]) else sc["D"]
        print(f"scene{si+1} line{li} start={st:5.1f} dur={len(s)/sr:4.1f} ends={st+len(s)/sr:5.1f} next={nxt:5.1f} {'OK' if st+len(s)/sr < nxt-0.1 else 'TOO LONG'}")
