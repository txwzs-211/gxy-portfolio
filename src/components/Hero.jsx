import { useEffect, useRef } from 'react';
import { profile } from '../data/profile';
import { projects } from '../data/projects';
import ProjectReel from './ProjectReel';

export default function Hero() {
  const vidRef = useRef(null);

  useEffect(() => {
    const v = vidRef.current;
    if (!v) return;
    let wantPlay = true;
    v.muted = true; // 背景视频始终静音，避免自动播放拦截与加载卡顿
    const tryPlay = () => {
      if (!wantPlay) return;
      v.play().catch(() => {});
    };
    tryPlay();

    // 下滑离开首屏即暂停，回到首屏继续播放
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.intersectionRatio < 0.5) { wantPlay = false; v.pause(); }
        else { wantPlay = true; tryPlay(); }
      });
    }, { threshold: [0, 0.5, 0.75, 1] });
    io.observe(v);

    return () => io.disconnect();
  }, []);

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
        <video ref={vidRef} loop playsInline preload="metadata" poster={profile.heroPoster} onContextMenu={(e) => e.preventDefault()}>
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
