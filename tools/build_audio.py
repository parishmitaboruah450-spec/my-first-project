"""Mix narration + synthesized music/SFX per scene, encode to mp3, embed in ../index.html.
Usage: python build_audio.py WAVDIR   (WAVDIR from tts.py)"""
import sys, os, io, json, base64, subprocess, numpy as np, soundfile as sf
from scipy.signal import lfilter, butter
sys.path.insert(0, os.path.dirname(__file__))
from script import SCENES
SR = 24000
rs = np.random.RandomState(1)
def T(d): return np.arange(int(d * SR)) / SR
def noise(d): return rs.randn(int(d * SR))
def lp(x, fc): b, a = butter(2, fc / (SR / 2), 'low'); return lfilter(b, a, x)
def hp(x, fc): b, a = butter(2, fc / (SR / 2), 'high'); return lfilter(b, a, x)
def dec(d, k): return np.exp(-T(d) * k)
def fade(x, a=.01, r=.03):
    n = len(x); e = np.ones(n); na, nr = int(a * SR), int(r * SR)
    e[:na] = np.linspace(0, 1, na); e[-nr:] = np.linspace(1, 0, nr); return x * e

def whoosh(d=.8):
    t = T(d); e = np.sin(np.pi * t / d) ** 2
    n = hp(lp(noise(d), 4000), 300) * e * .9
    f = 250 + 1400 * (t / d) ** 2
    return n * .6 + np.sin(2 * np.pi * np.cumsum(f) / SR) * e * .12
def boom(d=1.8):
    t = T(d); f = 38 + 60 * np.exp(-t * 6)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * dec(d, 2.2) * .9 + lp(noise(d), 500) * dec(d, 4) * .5
def thud(d=.3, f0=120):
    t = T(d); f = 45 + (f0 - 45) * np.exp(-t * 30)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * dec(d, 14) * .9 + lp(noise(d), 1200) * dec(d, 50) * .3
def crack(d=.7):
    n = hp(noise(d), 1500) * dec(d, 12); n += hp(noise(d), 600) * dec(d, 30) * .8
    for off in (.12, .2, .33):
        i = int(off * SR); n[i:i + 800] += hp(noise(800 / SR), 1000) * np.linspace(1, 0, 800) * .6
    return n * .8
def tick(d=.12, f=1800): return np.sin(2 * np.pi * f * T(d)) * dec(d, 45) * .7
def pop(d=.14):
    t = T(d); f = 500 + 900 * t / d; return np.sin(2 * np.pi * np.cumsum(f) / SR) * dec(d, 22) * .6
def ding(d=.9): t = T(d); return (np.sin(2 * np.pi * 880 * t) + .5 * np.sin(2 * np.pi * 1320 * t) + .25 * np.sin(2 * np.pi * 1760 * t)) * dec(d, 4.5) * .45
def shimmer(d=1.5, n=14):
    x = np.zeros(int(d * SR))
    for _ in range(n):
        s = int(rs.rand() * (d - .3) * SR); f = rs.choice([2093, 2349, 2637, 3136, 3520, 4186]); l = min(int(.35 * SR), len(x) - s); t = np.arange(l) / SR
        x[s:s + l] += np.sin(2 * np.pi * f * t) * np.exp(-t * 9) * .25
    return x
def riser(d=1.5):
    t = T(d); e = (t / d) ** 2
    n = noise(d); return (lp(n, 1200) * (1 - t / d) + lp(n, 7000) * (t / d)) * e * .7 + np.sin(2 * np.pi * np.cumsum(200 + 1500 * (t / d) ** 2) / SR) * e * .2
def heart(): 
    x = np.zeros(int(.6 * SR)); a = thud(.25, 90) * .8; b = thud(.2, 75) * .55; x[:len(a)] += a; i = int(.27 * SR); x[i:i + len(b)] += b; return x
def beep(d=1.6): return fade(np.sin(2 * np.pi * 1000 * T(d)) * .16, .005, .3)
def rumble(d=4): t = T(d); return lp(noise(d), 110) * 2.2 * (.7 + .3 * np.sin(2 * np.pi * 7 * t)) * np.minimum(1, t * 4) * np.minimum(1, (d - t) * 2)
def windn(d=4, lvl=.5): t = T(d); return hp(lp(noise(d), 2500), 200) * np.sin(np.pi * t / d) ** .5 * lvl
def boing(d=.35):
    t = T(d); f = 300 + 500 * np.sin(np.pi * t / d) + 30 * np.sin(2 * np.pi * 30 * t); return np.sin(2 * np.pi * np.cumsum(f) / SR) * dec(d, 7) * .5
def drips(d=2, n=14):
    x = np.zeros(int(d * SR))
    for _ in range(n):
        s = int(rs.rand() * (d - .15) * SR); l = min(int(.08 * SR), len(x) - s); t = np.arange(l) / SR
        x[s:s + l] += np.sin(2 * np.pi * (900 + rs.rand() * 700) * t) * np.exp(-t * 40) * .3
    return x
def swell(d=2.5): t = T(d); e = np.minimum(1, t / (d * .7)) * dec(d, 1.2); return sum(np.sin(2 * np.pi * f * t) for f in (220, 277, 330, 440, 554)) * e * .1

def music(D, bpm, roots, mutes, arp_hi=True):
    """simple bass+pluck+kick+hat bed; mutes = [(a,b)] silent ranges (soft ramp)"""
    n = int(D * SR); x = np.zeros(n); beat = 60 / bpm
    for k in range(int(D / beat) + 1):
        t0 = k * beat; i = int(t0 * SR)
        if i >= n: break
        root = roots[(k // 8) % len(roots)]
        l = int(beat * SR); tt = np.arange(l) / SR
        seg = np.sin(2 * np.pi * root / 2 * tt) * np.exp(-tt * 3) * .5
        if k % 4 in (0, 2): seg[:min(l, int(.09 * SR))] += np.sin(2 * np.pi * 55 * tt[:min(l, int(.09 * SR))]) * 0.5
        ar = [1, 1.2, 1.5, 2, 1.5, 1.2][k % 6] * root * 2
        seg += np.sin(2 * np.pi * ar * tt) * np.exp(-tt * 7) * .22 + np.sin(2 * np.pi * ar * 2 * tt) * np.exp(-tt * 10) * .06
        j = min(l, n - i); x[i:i + j] += seg[:j]
        h = int((t0 + beat / 2) * SR)
        if h < n - 1500: x[h:h + 1500] += hp(noise(1500 / SR), 6000) * np.exp(-np.arange(1500) / SR * 70) * .12
    g = np.ones(n)
    for a, b in mutes: g[int(a * SR):int(b * SR)] = 0
    g = lp(g, 8)  # smooth edges
    return x * g

def place(buf, x, t, gain=1.0):
    i = int(t * SR); 
    if i >= len(buf): return
    j = min(len(buf), i + len(x)); buf[i:j] += x[:j - i] * gain

def sfx(si, D):
    b = np.zeros(int(D * SR)); P = lambda x, t, g=1.0: place(b, x, t, g)
    if si == 0:
        P(whoosh(.8), .1, .7); P(riser(1.6), 3.6, .6)
        for k in range(11): P(heart(), (k + .3) / 1.1 - .05, .9)
        for t in np.linspace(5.6, 9.4, 4): P(shimmer(1.6, 10), t, .8)
        P(thud(.5, 80), 10.0, 1.2); P(beep(1.8), 10.05, .8)
        P(pop(), 13.8, .9); P(ding(), 13.85, .5)
        P(drips(2.2, 16), 18.0, .8); P(riser(1.2), 18.8, .6)
        for k in range(int((D - 20.2) * 1.1)): P(heart(), 20.2 + k / 1.1, 1.0)
        P(boom(1.2), 20.2, .8)
        for k in range(4): P(boing(), 21.0 + k * .833, .8)
        P(ding(), 22.0, .4)
    elif si == 1:
        P(whoosh(.8), .1, .7); P(riser(1.4), 2.4, .4)
        P(windn(3.6, .18), 4.4, 1); P(riser(1.3), 7.7, .8)
        P(boom(2.2), 9.0, 1.1); P(rumble(5), 9.0, .8); P(windn(7, .9), 9.2, 1)
        for k in range(5): P(tick(.12, 1500 if k else 2000), 9.0 + k, 1)
        P(tick(.4, 900), 14.0, 1)
        for tt in (9.6, 10.3, 11.1, 11.9, 12.6): P(thud(.3, 140), tt, .8); P(crack(.6), tt + .05, .35)
        P(whoosh(1.6), 10.4, .8); P(boom(1.6), 14.0, .7); P(whoosh(1.2), 14.4, .6)
        P(ding(), 18.6, .6); P(pop(), 19.2, .7)
    else:
        P(whoosh(.8), .1, .7)
        for k in range(6): P(thud(.3, 150), .9 * k + .225 + .45, .9); P(crack(.4), .9 * k + .225 + .45, .12)
        P(crack(.9), 5.6, 1.2); P(rumble(2.2), 5.6, .9); P(drips(2, 18), 5.8, .8)
        P(riser(1.0), 7.0, .6); P(swell(3.5), 8.0, 1.0); P(shimmer(2.5, 18), 8.2, .9)
        for t in (12.3, 12.85, 13.4, 14.0): P(pop(), t, .9)
        P(drips(2, 8), 16, .4)
        P(ding(), 19.2, .7); P(pop(), 19.1, .6)
    return b

CFG = [  # bpm, bass roots (Hz), muted music ranges
    (98, [110, 87.3, 130.8, 98], [(10.0, 20.2)]),
    (124, [73.4, 58.3, 87.3, 65.4], [(9.0, 14.0)]),
    (88, [82.4, 65.4, 98, 73.4], [(5.6, 8.0)]),
]
def build(wavdir):
    out = {"tracks": [], "lines": [], "D": []}
    for si, sc in enumerate(SCENES):
        D = sc["D"]; n = int(D * SR); voice = np.zeros(n); lines = []
        for li, (st, text) in enumerate(sc["lines"]):
            s, sr = sf.read(f"{wavdir}/s{si}_{li}.wav"); assert sr == SR
            s = s / (np.abs(s).max() + 1e-9) * .85
            place(voice, s, st); lines.append({"s": st, "d": round(len(s) / SR, 2), "text": text})
        env = lp(np.abs(voice), 6); duck = 1 - .6 * np.clip(env / .05, 0, 1)
        bpm, roots, mutes = CFG[si]
        mus = music(D, bpm, roots, mutes) * .55 * duck
        mix = voice * 1.0 + mus + sfx(si, D) * .55
        mix = np.tanh(mix * 1.1) / np.tanh(1.1); mix = mix / max(1, np.abs(mix).max()) * .92
        wav = f"/tmp/claude-0/tts/mix{si}.wav"; sf.write(wav, mix, SR)
        mp3 = wav.replace(".wav", ".mp3")
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", wav, "-b:a", "80k", "-ac", "1", mp3], check=True)
        out["tracks"].append(base64.b64encode(open(mp3, "rb").read()).decode()); out["lines"].append(lines); out["D"].append(D)
        print("scene", si + 1, "mp3 KB", os.path.getsize(mp3) // 1024)
    return out
if __name__ == "__main__":
    data = build(sys.argv[1])
    path = os.path.join(os.path.dirname(__file__), "..", "index.html")
    html = open(path).read()
    a, b = html.index("/*AUDIO_BEGIN*/"), html.index("/*AUDIO_END*/")
    html = html[:a] + "/*AUDIO_BEGIN*/\nwindow.AUDIO=" + json.dumps(data) + ";\n" + html[b:]
    open(path, "w").write(html)
    print("embedded into index.html")
