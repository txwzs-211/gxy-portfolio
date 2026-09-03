# -*- coding: utf-8 -*-
import os
from PIL import Image, ImageDraw, ImageFont
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
D=os.path.join(ROOT,"public","assets","covers")
try: F=ImageFont.truetype(r"C:\Windows\Fonts\arialbd.ttf",20)
except: F=ImageFont.load_default()
names=["nba-duel","football-manager","seven-days","mermaid","comic-drama","ue5-short","comic-ops","base-promo","skyworth-night","skyworth-c40","design-showcase"]
cols=4; tw=340; pad=10; lab=24
cellh=210
rows=(len(names)+cols-1)//cols
sheet=Image.new("RGB",(cols*(tw+pad)+pad,rows*(cellh+lab+pad)+pad),(14,16,12))
d=ImageDraw.Draw(sheet)
for i,n in enumerate(names):
    p=os.path.join(D,n+".webp")
    im=Image.open(p).convert("RGB"); im.thumbnail((tw,cellh))
    x=pad+(i%cols)*(tw+pad); y=pad+(i//cols)*(cellh+lab+pad)
    sheet.paste(im,(x+(tw-im.width)//2,y+lab+(cellh-im.height)//2))
    d.text((x+3,y+2),f"{i+1:02d} {n}",font=F,fill=(200,247,59))
sheet.save(os.path.join(ROOT,"_scratch","candidates","_covers_final.jpg"),"JPEG",quality=84)
print("DONE")
