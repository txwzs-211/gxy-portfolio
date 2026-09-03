# -*- coding: utf-8 -*-
"""为每个项目视频均匀抽 8 帧，拼成带时间戳的对照图，输出到 _scratch/candidates。
仅用于人工挑选最佳封面帧，不进产物。"""
import os, subprocess, tempfile
import imageio_ffmpeg
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VID = os.path.join(ROOT, "public", "videos")
OUT = os.path.join(ROOT, "_scratch", "candidates")
os.makedirs(OUT, exist_ok=True)
FF = imageio_ffmpeg.get_ffmpeg_exe()

FONT = None
for fp in [r"C:\Windows\Fonts\arialbd.ttf", r"C:\Windows\Fonts\arial.ttf"]:
    if os.path.exists(fp):
        FONT = ImageFont.truetype(fp, 22); break
if FONT is None: FONT = ImageFont.load_default()

# (输出名, 视频文件, 时长秒, 是否竖屏)
JOBS = [
    ("01-nba",        "hero-reel.mp4",          44.0,  False),
    ("02-football",   "football-manager.mp4",   84.94, False),
    ("03-sevendays",  "seven-days.mp4",        410.84, False),
    ("04-mermaid",    "drama-mermaid.mp4",     641.27, True),
    ("05-comicdrama", "comic-drama.mp4",       351.95, False),
    ("06-ue5",        "ue5-short.mp4",         142.50, False),
    ("07-comicops",   "comic-ops-clip.mp4",     27.93, False),
    ("08-basa",       "base-promo.mp4",         31.67, True),
    ("09-night",      "skyworth-night.mp4",     70.40, False),
    ("10-c40",        "skyworth-c40.mp4",       44.83, False),
]
RATIOS = [0.06, 0.18, 0.30, 0.42, 0.54, 0.66, 0.78, 0.90]
COLS = 4

def grab(src, t, w):
    tmp = tempfile.NamedTemporaryFile(suffix=".png", delete=False).name
    cmd = [FF, "-y", "-ss", f"{t:.2f}", "-i", src, "-frames:v", "1",
           "-vf", f"scale={w}:-2", tmp]
    subprocess.run(cmd, capture_output=True)
    if not os.path.exists(tmp) or os.path.getsize(tmp) == 0:
        return None
    im = Image.open(tmp).convert("RGB"); os.remove(tmp); return im

for name, vf, dur, portrait in JOBS:
    src = os.path.join(VID, vf)
    if not os.path.exists(src): print("MISS", vf); continue
    w = 230 if portrait else 400
    frames = []
    for r in RATIOS:
        t = max(0.2, dur * r)
        im = grab(src, t, w)
        frames.append((t, im))
        print(f"  {name} @{t:6.1f}s {'ok' if im else 'FAIL'}")
    ok = [(t, im) for t, im in frames if im is not None]
    if not ok: print("NO FRAME", name); continue
    fw, fh = ok[0][1].size
    rows = (len(ok) + COLS - 1) // COLS
    pad, label = 8, 26
    sheet = Image.new("RGB", (COLS*(fw+pad)+pad, rows*(fh+label+pad)+pad), (16,18,14))
    d = ImageDraw.Draw(sheet)
    for i, (t, im) in enumerate(ok):
        x = pad + (i % COLS)*(fw+pad); y = pad + (i//COLS)*(fh+label+pad)
        sheet.paste(im, (x, y+label))
        d.text((x+4, y+2), f"#{i}  {t:0.1f}s", font=FONT, fill=(200,247,59))
    dst = os.path.join(OUT, name+".jpg")
    sheet.save(dst, "JPEG", quality=82)
    print("SHEET", dst)
print("ALL DONE")
