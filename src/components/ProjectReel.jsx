import { useEffect, useRef } from 'react';
import { categories } from '../data/projects';

/**
 * 首页底部项目轮播带：
 * - 默认自动无限向左滚动（内容复制两份做无缝循环）
 * - 鼠标按住 / 手指触摸可左右拖拽浏览；悬停或按住时自动滚动暂停
 * - 位移很小的松手视为“点击”，正常跳转到对应项目；超过阈值才算拖拽并拦截点击
 *
 * 注意：不要在容器上 setPointerCapture —— 那会让 click 的命中目标从卡片 <a>
 * 变成容器，导致真实点击无法跳转。拖拽改用 window 级监听跟踪。
 */
export default function ProjectReel({ items }) {
  const trackRef = useRef(null);
  const S = useRef({
    pos: 0, oneSet: 0, raf: 0, running: true, hover: false,
    pressed: false, dragActive: false, startX: 0, startPos: 0, moved: 0,
  });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const st = S.current;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    st.running = !reduce;
    const DRAG_THRESHOLD = 6;

    const apply = () => { track.style.transform = `translate3d(${st.pos}px,0,0)`; };
    const normalize = () => {
      if (st.oneSet <= 0) return;
      while (st.pos <= -st.oneSet) st.pos += st.oneSet;
      while (st.pos > 0) st.pos -= st.oneSet;
    };
    const measure = () => { st.oneSet = track.scrollWidth / 2; normalize(); apply(); };

    let last = performance.now();
    const loop = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (st.running && !st.pressed && !st.hover && st.oneSet > 0) {
        st.pos -= (st.oneSet / 38) * dt; // 约 38s 走完一份
        normalize(); apply();
      }
      st.raf = requestAnimationFrame(loop);
    };
    st.raf = requestAnimationFrame(loop);

    const down = (e) => {
      st.pressed = true; st.dragActive = false;
      st.startX = e.clientX; st.startPos = st.pos; st.moved = 0;
    };
    const move = (e) => {
      if (!st.pressed) return;
      const dx = e.clientX - st.startX;
      st.moved = Math.abs(dx);
      if (st.moved > DRAG_THRESHOLD && !st.dragActive) {
        st.dragActive = true;
        track.classList.add('is-dragging');
      }
      if (st.dragActive) { st.pos = st.startPos + dx; normalize(); apply(); }
    };
    const up = () => {
      if (!st.pressed) return;
      st.pressed = false; st.dragActive = false;
      track.classList.remove('is-dragging');
    };
    // 真正发生拖拽时，拦截随后的 click，避免拖完误跳转；普通点击放行给 <a>
    const guardClick = (e) => {
      if (st.moved > DRAG_THRESHOLD) { e.preventDefault(); e.stopPropagation(); }
      st.moved = 0;
    };

    track.addEventListener('pointerdown', down);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
    track.addEventListener('click', guardClick, true);
    track.addEventListener('mouseenter', () => { st.hover = true; });
    track.addEventListener('mouseleave', () => { st.hover = false; });

    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener('resize', measure);
    const tm = setTimeout(measure, 400);
    measure();

    return () => {
      cancelAnimationFrame(st.raf);
      track.removeEventListener('pointerdown', down);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
      track.removeEventListener('click', guardClick, true);
      window.removeEventListener('resize', measure);
      ro.disconnect();
      clearTimeout(tm);
    };
  }, []);

  const catOf = (id) => categories.find((c) => c.id === id);
  const doubled = [...items, ...items];

  return (
    <div className="hero-x-reel" aria-label="项目轮播，可按住左右拖动，点击卡片进入项目">
      <div className="hero-x-track" ref={trackRef}>
        {doubled.map((p, i) => (
          <a className="hero-x-card" href={`#/work/${p.slug}`} key={i} aria-label={p.title} draggable="false">
            <img src={p.cover} alt="" loading="lazy" draggable="false" />
            <figcaption>{catOf(p.category)?.label}</figcaption>
          </a>
        ))}
      </div>
    </div>
  );
}
