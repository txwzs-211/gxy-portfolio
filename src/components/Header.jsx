import { useEffect, useState } from 'react';
import { goHomeToAnchor } from '../hooks/useHashRoute';

const LINKS = [
  { id: 'about', label: '关于我' },
  { id: 'projects', label: '精选作品' },
  { id: 'contact', label: '联系我' },
];
const RESUME_HREF = encodeURI('/AI视频设计师-Kevin.pdf');

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // 首页内平滑定位；若当前在详情页则先回首页再定位。
  // 延后两帧：移动抽屉打开时 body 处于锁滚动状态，需等 setOpen(false)
  // 提交并解除 overflow:hidden 之后再滚动，否则会“关了抽屉却没定位”。
  const goAnchor = (e, id) => {
    e.preventDefault();
    setOpen(false);
    // 立即解除移动抽屉对 body 的滚动锁定，再延时定位，确保滚动一定可用
    document.body.style.overflow = '';
    window.setTimeout(() => goHomeToAnchor(id), 90);
  };

  return (
    <header className="hud-nav-wrap">
      <nav className={`hud-nav${open ? ' is-open' : ''}`}>
        <a href="#/" className="hud-logo" onClick={(e) => goAnchor(e, 'top')}>
          <img src="/assets/brand-logo.webp" alt="品牌 LOGO" className="hud-logo-avatar" />
          <span>My Portfolio</span>
        </a>

        <ul className="hud-links">
          {LINKS.map((l) => (
            <li key={l.id}>
              <a href="#/" onClick={(e) => goAnchor(e, l.id)}>{l.label}</a>
            </li>
          ))}
        </ul>

        <div className="hud-right">
          <a className="hud-cta" href={RESUME_HREF} target="_blank" rel="noreferrer">
            简历 / CV
          </a>
          <button
            className={`hud-burger${open ? ' is-open' : ''}`}
            aria-label="切换菜单"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <i></i><i></i><i></i>
          </button>
        </div>
      </nav>

      {/* 移动端抽屉 */}
      <div className={`hud-drawer${open ? ' is-open' : ''}`}>
        {LINKS.map((l) => (
          <a key={l.id} href="#/" className="hud-drawer-link" onClick={(e) => goAnchor(e, l.id)}>
            {l.label}
          </a>
        ))}
        <a className="hud-drawer-cta" href={RESUME_HREF} target="_blank" rel="noreferrer">下载简历 / CV</a>
      </div>
    </header>
  );
}
