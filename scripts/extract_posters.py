# -*- coding: utf-8 -*-
"""从 public/videos 视频抽取一帧，生成列表/播放器封面到 public/assets/posters。
横屏宽 1280、竖屏宽 720，输出 webp。重复运行会覆盖。"""
import os, subprocess
import imageio_ffmpeg
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VID = os.path.join(ROOT, "public", "videos")
OUT = os.path.join(ROOT, "public", "assets", "posters")
os.makedirs(OUT, exist_ok=True)
FF = imageio_ffmpeg.get_ffmpeg_exe()

# (视频文件名, 封面名不含扩展, 是否竖屏, seek秒)
JOBS = [
    ("nba-player-intro.mp4",     "nba-player-intro",     False, 1.5),
    ("football-manager.mp4",     "football-manager",     False, 2.0),
    ("seven-days.mp4",           "seven-days",           False, 3.0),
    ("ue5-short.mp4",            "ue5-short",            False, 2.0),
    ("comic-ops-clip.mp4",       "comic-ops-clip",       False, 1.5),
    ("comic-ops-scene.mp4",      "comic-ops-scene",      True,  1.5),
    ("comic-ops-transition.mp4", "comic-ops-transition", True,  1.5),
    ("base-promo.mp4",           "base-promo",           True,  1.5),
    ("skyworth-night.mp4",       "skyworth-night",       False, 1.2),
    ("skyworth-c40.mp4",         "skyworth-c40",         False, 2.0),
    ("drama-mermaid.mp4",        "drama-mermaid",        True,  60),
]

for vname, pname, portrait, seek in JOBS:
    src = os.path.join(VID, vname)
    tmp = os.path.join(OUT, pname + ".png")
    dst = os.path.join(OUT, pname + ".webp")
    if not os.path.exists(src):
        print("MISS VIDEO:", vname); continue
    w = 720 if portrait else 1280
    cmd = [FF, "-y", "-ss", str(seek), "-i", src, "-frames:v", "1",
           "-vf", f"scale={w}:-2", tmp]
    r = subprocess.run(cmd, capture_output=True, text=True)
    if not os.path.exists(tmp):
        print("FAIL:", vname, r.stderr[-300:]); continue
    im = Image.open(tmp).convert("RGB")
    im.save(dst, "WEBP", quality=82, method=6)
    os.remove(tmp)
    print(f"OK {pname}.webp {im.size[0]}x{im.size[1]} {os.path.getsize(dst)/1024:.0f}KB")
print("DONE")
