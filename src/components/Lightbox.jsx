import { useEffect, useRef } from 'react';

/**
 * 全屏大图浏览（受控）。
 * - 打开时锁定背景滚动；Esc 关闭、← → 切换；触屏左右滑动切换
 * - 点遮罩关闭，点图片不关闭；支持新标签查看原图
 * list 为 null 时不渲染。
 */
export default function Lightbox({ list, index, onClose, onPrev, onNext }) {
  const touchX = useRef(null);

  // 锁定背景滚动
  useEffect(() => {
    if (!list) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prevOverflow; };
  }, [list]);

  // 键盘
  useEffect(() => {
    if (!list) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') onNext();
      else if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [list, onClose, onPrev, onNext]);

  if (!list) return null;
  const src = list[index];

  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 44) (dx < 0 ? onNext() : onPrev());
    touchX.current = null;
  };

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <button className="lightbox-close" aria-label="关闭" onClick={onClose}>×</button>
      <button
        className="lightbox-nav lightbox-prev" aria-label="上一张"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
      >‹</button>

      <figure className="lightbox-stage" onClick={(e) => e.stopPropagation()}>
        <img src={src} alt={`资产图 ${index + 1}`} />
        <a className="lightbox-original" href={src} target="_blank" rel="noreferrer">
          查看原图 ↗
        </a>
      </figure>

      <button
        className="lightbox-nav lightbox-next" aria-label="下一张"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
      >›</button>

      <div className="lightbox-counter">{index + 1} / {list.length}</div>
    </div>
  );
}
