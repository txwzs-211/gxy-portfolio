# -*- coding: utf-8 -*-
import os, subprocess
import imageio_ffmpeg

ff = imageio_ffmpeg.get_ffmpeg_exe()
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VD = os.path.join(ROOT, "public", "videos")
OUT = os.path.join(ROOT, "_scratch")
os.makedirs(OUT, exist_ok=True)

# (文件, 抽帧秒)
JOBS = [
    ("base-promo.mp4", 15),
    ("skyworth-night.mp4", 35),
    ("skyworth-c40.mp4", 22),
    ("drama-mermaid.mp4", 320),
]
for f, ss in JOBS:
    dst = os.path.join(OUT, f.replace(".mp4", ".jpg"))
    cmd = [ff, "-y", "-ss", str(ss), "-i", os.path.join(VD, f),
           "-frames:v", "1", "-vf", "scale=480:-2", dst]
    subprocess.run(cmd, capture_output=True)
    print(dst if os.path.exists(dst) else "FAIL " + f)
