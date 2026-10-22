import { useEffect, useRef, useState } from 'react';
import { profile } from '../data/profile';
import { projects } from '../data/projects';
import ProjectReel from './ProjectReel';

export default function Hero() {
  const vidRef = useRef(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const v = vidRef.current;
    if (!v) return;
    let wantPlay = true;

    // 优先“有声自动播放”；若被浏览器自动播放策略拦截，则先静音起播，
    // 并在用户首次与页面交互（点击/触摸/按键）后恢复有声。
    const tryPlay = () => {
      if (!wantPlay) return;
      v.play().catch(() => {
        v.muted = true; setMuted(true);
        v.play().catch(() => {});
      });
    };
    v.muted = false;
    tryPlay();

    const unmute = () => {
      if (v.muted) { v.muted = false; setMuted(false); tryPlay(); }
    };
    const acts = ['pointerdown', 'keydown', 'touchstart'];
    acts.forEach((ev) => window.addEventListener(ev, unmute, { once: true }));

    // 下滑离开首屏即暂停，回到首屏继续播放
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.intersectionRatio < 0.5) { wantPlay = false; v.pause(); }
        else { wantPlay = true; tryPlay(); }
      });
    }, { threshold: [0, 0.5, 0.75, 1] });
    io.observe(v);

    return () => {
      acts.forEach((ev) => window.removeEventListener(ev, unmute));
      io.disconnect();
    };
  }, []);

  const toggleMute = () => {
    const v = vidRef.current;
    if (!v) return;
    const next = !v.muted;
    v.muted = next;
    setMuted(next);
    if (!next) v.play().catch(() => {});
  };

  const scrollTo = (e, sel) => {
    const t = document.querySelector(sel);
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  };

  // 底部无限滚动带：有封面的项目
  const reel = projects.filter((p) => p.cover);

  return (
    <section id="top" className="hero-x">
      {/* 视频背景 */}
      <div className="hero-x-bg" aria-hidden="true">
        <video ref={vidRef} loop playsInline preload="metadata" poster={profile.heroPoster}>
          <source src={profile.heroVideo} type="video/mp4" />
        </video>
      </div>
      <div className="hero-x-veil"></div>
      <div className="hero-x-glow"></div>

      <div className="hero-x-inner">
        <p className="hero-x-kicker">
          <span className="dot"></span>AI VIDEO DESIGNER · VISUAL DESIGNER
        </p>
        <h1 className="hero-x-title">
          <span className="t-accent">KERWIN</span>
          <span className="t-line">AI VIDEO</span>
          <span className="t-line">
            PORTFOLIO<em className="t-hand">Wu&nbsp;Kunyan</em>
          </span>
        </h1>
        <p className="hero-x-desc">
          用 AI 驱动视频创作，覆盖剧本拆解、分镜设计、AI 视频生成到后期包装的完整链路，
          以工程化思维打造更有视觉冲击力的动态内容。
        </p>
        <div className="hero-x-actions">
          <a className="btn-pill btn-pill--solid" href="#projects" onClick={(e) => scrollTo(e, '#projects')}>
            查看精选作品 →
          </a>
          <a className="btn-pill btn-pill--ghost" href="#about" onClick={(e) => scrollTo(e, '#about')}>
            了解更多
          </a>
          <button
            type="button"
            className={`hero-x-sound${muted ? ' is-muted' : ''}`}
            onClick={toggleMute}
            aria-label={muted ? '开启声音' : '关闭声音'}
            title={muted ? '开启声音' : '关闭声音'}
          >
            {muted ? (
              <svg viewBox="0 0 24 24" width="19" height="19" fill="none" aria-hidden="true">
                <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" />
                <path d="M16 9l5 6M21 9l-5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="19" height="19" fill="none" aria-hidden="true">
                <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" />
                <path d="M16 9a4 4 0 010 6M18.5 6.5a8 8 0 010 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* 底部作品封面：自动轮播 + 可左右拖拽 + 点击进详情 */}
      <ProjectReel items={reel} />

      <div className="hero-x-scroll" aria-hidden="true">
        <span>SCROLL</span><span className="bar"></span>
      </div>
    </section>
  );
}
