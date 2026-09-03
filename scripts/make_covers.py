# -*- coding: utf-8 -*-
"""按人工选定的时间点抽取每个项目的定稿封面，输出到 public/assets/covers。
横屏宽 1600、竖屏宽 720，高质量 webp。UI 项目由 design frame-30 转换。"""
import os, subprocess, tempfile
import imageio_ffmpeg
from PIL import Image, ImageEnhance

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VID = os.path.join(ROOT, "public", "videos")
OUT = os.path.join(ROOT, "public", "assets", "covers")
os.makedirs(OUT, exist_ok=True)
FF = imageio_ffmpeg.get_ffmpeg_exe()

# (封面名, 视频文件, seek秒, 是否竖屏, 顶部裁掉比例[去水印])
JOBS = [
    ("nba-duel",        "hero-reel.mp4",         2.6,  False, 0.0),
    ("football-manager","football-manager.mp4", 56.1,  False, 0.0),
    ("seven-days",      "seven-days.mp4",      369.8,  False, 0.0),
    ("mermaid",         "drama-mermaid.mp4",   269.3,  True,  0.0),
    ("comic-drama",     "comic-drama.mp4",      63.4,  False, 0.0),
    ("ue5-short",       "ue5-short.mp4",       111.2,  False, 0.08),
    ("comic-ops",       "comic-ops-clip.mp4",    1.7,  False, 0.0),
    ("base-promo",      "base-promo.mp4",        5.7,  True,  0.0),
    ("skyworth-night",  "skyworth-night.mp4",   21.1,  False, 0.0),
    ("skyworth-c40",    "skyworth-c40.mp4",     13.4,  False, 0.0),
]

def grab(vname, t, w, crop_top):
    src = os.path.join(VID, vname)
    tmp = tempfile.NamedTemporaryFile(suffix=".png", delete=False).name
    cmd = [FF, "-y", "-ss", f"{t:.2f}", "-i", src, "-frames:v", "1",
           "-vf", f"scale={w}:-2", tmp]
    r = subprocess.run(cmd, capture_output=True, text=True)
    if not os.path.exists(tmp) or os.path.getsize(tmp) == 0:
        print("FAIL", vname, r.stderr[-200:]); return None
    im = Image.open(tmp).convert("RGB"); os.remove(tmp)
    if crop_top > 0:
        w0, h0 = im.size; cut = int(h0*crop_top)
        im = im.crop((0, cut, w0, h0))
    return im

for name, vf, t, portrait, crop in JOBS:
    im = grab(vf, t, 720 if portrait else 1600, crop)
    if im is None: continue
    # 轻微提对比/饱和，让封面在暗底上更挺（不夸张）
    im = ImageEnhance.Contrast(im).enhance(1.05)
    im = ImageEnhance.Color(im).enhance(1.06)
    dst = os.path.join(OUT, name+".webp")
    im.save(dst, "WEBP", quality=88, method=6)
    print(f"OK {name}.webp {im.size[0]}x{im.size[1]} {os.path.getsize(dst)/1024:.0f}KB")

# UI 项目：design frame-30 转封面（宽 1600）
src_ui = os.path.join(ROOT, "public", "assets", "gallery", "design", "frame-30.webp")
if os.path.exists(src_ui):
    im = Image.open(src_ui).convert("RGB")
    if im.width < 1600:
        nh = int(im.height*1600/im.width); im = im.resize((1600, nh), Image.LANCZOS)
    im.save(os.path.join(OUT, "design-showcase.webp"), "WEBP", quality=88, method=6)
    print("OK design-showcase.webp", im.size)
print("ALL DONE")
