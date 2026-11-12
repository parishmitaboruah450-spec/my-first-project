"""Place each narration clip at its film time and write one voice track (44.1 kHz stereo WAV).

usage: python3 voice_track.py <timing.json> <clip-dir> <out.wav> <total-seconds>
timing.json is a list of [id, story_time, film_time, duration] (the film page reports it).
"""
import json, subprocess, sys

timing = json.load(open(sys.argv[1]))
clips, out, total = sys.argv[2], sys.argv[3], float(sys.argv[4])
args, chains = ['ffmpeg', '-y', '-loglevel', 'error'], []
for i, (lid, a, f, d) in enumerate(timing):
    args += ['-i', f'{clips}/{lid}.wav']
    ms = int(round(f * 1000))
    chains.append(f'[{i}:a]aresample=44100,aformat=channel_layouts=mono,adelay={ms}:all=1[v{i}]')
mix = ''.join(f'[v{i}]' for i in range(len(timing)))
graph = ';'.join(chains) + f';{mix}amix=inputs={len(timing)}:normalize=0:duration=longest,' \
    'highpass=f=70,acompressor=threshold=-20dB:ratio=3:attack=5:release=120:makeup=2,' \
    f'apad,atrim=0:{total},pan=stereo|c0=c0|c1=c0[out]'
subprocess.run(args + ['-filter_complex', graph, '-map', '[out]', '-ar', '44100', out], check=True)
print('voice track written:', out)
