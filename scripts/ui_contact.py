# -*- coding: utf-8 -*-
"""把 design frame-01..53 拼成缩略对照图，供挑选 UI 项目封面。"""
import os
from PIL import Image, ImageDraw, ImageFont
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
D = os.path.join(ROOT, "public", "assets", "gallery", "design")
OUT = os.path.join(ROOT, "_scratch", "candidates")
os.makedirs(OUT, exist_ok=True)
try:
    FONT = ImageFont.truetype(r"C:\Windows\Fonts\arialbd.ttf", 18)
except Exception:
    FONT = ImageFont.load_default()
files = sorted(f for f in os.listdir(D) if f.endswith(".webp"))
tw, th, cols, pad, lab = 240, 150, 5, 10, 22
rows = (len(files)+cols-1)//cols
sheet = Image.new("RGB", (cols*(tw+pad)+pad, rows*(th+lab+pad)+pad), (16,18,14))
dr = ImageDraw.Draw(sheet)
for i,f in enumerate(files):
    try:
        im = Image.open(os.path.join(D,f)).convert("RGB")
        im.thumbnail((tw, th))
        x = pad+(i%cols)*(tw+pad); y = pad+(i//cols)*(th+lab+pad)
        sheet.paste(im,(x+(tw-im.width)//2, y+lab+(th-im.height)//2))
        dr.text((x+3,y+2), f.replace("frame-","").replace(".webp",""), font=FONT, fill=(200,247,59))
    except Exception as e:
        print("skip", f, e)
sheet.save(os.path.join(OUT,"ui-frames.jpg"),"JPEG",quality=80)
print("DONE", len(files))
