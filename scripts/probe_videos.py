# -*- coding: utf-8 -*-
import os, subprocess, re
import imageio_ffmpeg

ff = imageio_ffmpeg.get_ffmpeg_exe()
vd = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "videos")
for f in sorted(os.listdir(vd)):
    if not f.endswith(".mp4"):
        continue
    r = subprocess.run([ff, "-i", os.path.join(vd, f)], capture_output=True, text=True)
    e = r.stderr
    dur = re.search(r"Duration: ([\d:.]+)", e)
    st = re.search(r"Video:.*?, (\d+)x(\d+)", e)
    rot = "rotate" in e.lower()
    mb = os.path.getsize(os.path.join(vd, f)) / 1024 / 1024
    d = dur.group(1) if dur else "?"
    s = (st.group(1) + "x" + st.group(2)) if st else "?"
    print(f"{f:28s} {d:11s} {s:11s} rot={rot} {mb:6.1f}MB")
