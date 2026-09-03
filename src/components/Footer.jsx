import { profile } from '../data/profile';

const RESUME_HREF = encodeURI('/AI视频设计师-Kerwin.pdf');

export default function Footer() {
  const toTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const rows = [
    { k: 'PHONE / 电话', v: profile.phone, href: `tel:${profile.phone}` },
    { k: 'EMAIL / 邮箱', v: profile.email, href: `mailto:${profile.email}` },
    { k: 'BASED / 城市', v: '中国 · 深圳', href: null },
  ];

  return (
    <footer id="contact" className="contact-x section">
      <div className="contact-grid">
        <div className="contact-left">
          <span className="mini-kicker">CONTACT</span>
          <h2 className="contact-slogan">
            LET&apos;S BUILD<br />
            BETTER <span className="hl">V</span>ISUAL<br />
            SYSTEMS<span className="sec-arrow">↘</span>
          </h2>
          <p className="contact-lead">期待用 AI 与你一起，打造更有视觉冲击力的动态内容。</p>
          <div className="contact-actions">
            <a className="btn-pill btn-pill--solid" href={`mailto:${profile.email}`}>发送邮件 →</a>
            <a className="btn-pill btn-pill--ghost" href={RESUME_HREF} target="_blank" rel="noreferrer">下载简历 / CV</a>
          </div>
        </div>

        <aside className="contact-card">
          <span className="mini-kicker contact-card-label">GET IN TOUCH</span>
          {rows.map((r) => (
            r.href ? (
              <a className="contact-row" href={r.href} key={r.k}>
                <dt>{r.k}</dt><dd>{r.v}</dd><span className="contact-row-go">↗</span>
              </a>
            ) : (
              <div className="contact-row" key={r.k}>
                <dt>{r.k}</dt><dd>{r.v}</dd>
              </div>
            )
          ))}
          <div className="contact-card-foot">
            <span className="chip chip--hot">AI Video Designer</span>
            <span className="chip">Open to work</span>
          </div>
        </aside>
      </div>

      <div className="contact-foot">
        <span>© 2026 {profile.name} · AI Video Designer · 深圳</span>
        <a href="#top" onClick={toTop}>Back to top ↑</a>
      </div>
    </footer>
  );
}
