import { useEffect, useRef, useState } from 'react';

/**
 * 全局 HUD：顶部阅读进度条（框架机制，视觉阶段再定样式）
 */
export default function ScrollProgress() {
  const barRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = null;
    const update = () => {
      raf = null;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div className="scroll-progress-bar" ref={barRef} style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}
