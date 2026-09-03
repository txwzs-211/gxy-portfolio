import { useEffect, useState } from 'react';

/**
 * 悬浮「回到顶部」圆形按钮：向下滚动超过约一屏后淡入，
 * 水平居中贴底；点击平滑回到当前页顶部（首页即回到 Hero）。
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    // 挂载后再校验一次：覆盖返回首页时滚动位置被恢复到中段、却未触发 scroll 事件的情况
    const raf = requestAnimationFrame(() => requestAnimationFrame(onScroll));
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, left: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <button
      type="button"
      className={`back-top${visible ? ' is-visible' : ''}`}
      aria-label="回到顶部"
      title="回到顶部"
      onClick={toTop}
    >
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
        <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2.4"
              strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
