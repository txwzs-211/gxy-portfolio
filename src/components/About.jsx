import { useState } from 'react';
import { profile, stats, education, certs, award } from '../data/profile';
import { experience } from '../data/experience';
import { tags } from '../data/skills';
import { useScrollReveal } from '../hooks/useScrollReveal';

const RESUME_HREF = encodeURI('/AI视频设计师-Kerwin.pdf');

function PointText({ pt }) {
  if (typeof pt === 'string') return <>{pt}</>;
  return <>{pt.text}<mark>{pt.highlight}</mark></>;
}

export default function About() {
  const ref = useScrollReveal();
  const [active, setActive] = useState(0); // 默认展开最近一段

  const facts = [
    { k: '姓名 / NAME', v: `${profile.name} · Kerwin` },
    { k: '方向 / FOCUS', v: profile.title },
    { k: '电话 / PHONE', v: profile.phone },
    { k: '邮箱 / EMAIL', v: profile.email },
  ];

  return (
    <section id="about" className="about-x section" ref={ref}>
      <div className="sec-head">
        <h2 className="sec-title">WORK EXPERIENCE<span className="sec-arrow">↘</span></h2>
        <p className="sec-sub">个人经历</p>
      </div>

      <div className="about-top">
        {/* 左：形象卡 */}
        <aside className="about-portrait">
          <div className="about-portrait-img">
            <img src={profile.avatar} alt={profile.name} />
            <span className="about-portrait-status"><i></i>Open to work</span>
          </div>
          <div className="about-portrait-foot">
            <div>
              <strong>{profile.name}</strong>
              <span>{profile.title}</span>
            </div>
            <a className="btn-pill btn-pill--solid about-resume" href={RESUME_HREF} target="_blank" rel="noreferrer">
              简历 / CV ↓
            </a>
          </div>
        </aside>

        {/* 右：介绍 */}
        <div className="about-main">
          <h3 className="about-hi">Hi, I am <span className="hl">Kerwin</span>!</h3>
          <p className="about-bio">{profile.bio}</p>

          <dl className="about-facts">
            {facts.map((f) => (
              <div className="about-fact" key={f.k}>
                <dt>{f.k}</dt>
                <dd>{f.v}</dd>
              </div>
            ))}
          </dl>

          <div className="about-stats-x">
            {stats.map((s, i) => (
              <div className="about-stat-x" key={i}>
                <div className="v">{s.value}</div>
                <div className="l">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="about-now">
            <span className="mini-kicker">NOW BUILDING</span>
            <div className="about-tags">
              {tags.map((t, i) => (
                <span className={`chip${t.highlight ? ' chip--hot' : ''}`} key={i}>{t.label}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 横向职业时间轴 */}
      <div className="career">
        <div className="career-head">
          <span className="mini-kicker">CAREER PATH</span>
          <h4>职业经历 · 点击节点查看成果</h4>
        </div>
        <div className="career-track">
          {experience.map((e, i) => (
            <article
              className={`career-node${i === active ? ' is-active' : ''}`}
              key={i}
              role="button"
              tabIndex={0}
              aria-expanded={i === active}
              aria-label={`${e.company}，${e.role}`}
              onClick={() => setActive(i)}
              onKeyDown={(ev) => {
                if (ev.key === 'Enter' || ev.key === ' ') {
                  ev.preventDefault();
                  setActive(i);
                }
              }}
            >
              <span className="career-dot" aria-hidden="true">✦</span>
              <span className="career-period">{e.period}</span>
              <h5 className="career-company">{e.company}</h5>
              <span className="career-role">{e.role}</span>
              <p className="career-project">{e.project.replace(/^▌\s*核心项目：/, '')}</p>
              {i === active && (
                <ul className="career-points">
                  {e.points.map((pt, j) => <li key={j}><PointText pt={pt} /></li>)}
                </ul>
              )}
            </article>
          ))}
        </div>
      </div>

      {/* 教育 / 证书 / 获奖 */}
      <div className="about-cred">
        <div className="cred-card">
          <span className="mini-kicker">EDUCATION</span>
          <h5>{education.school}</h5>
          <p>{education.major}</p>
          <p className="cred-sub">主修：{education.courses}</p>
          <div className="cred-tags">{education.awards.map((a, i) => <span className="chip" key={i}>{a}</span>)}</div>
        </div>
        <div className="cred-card">
          <span className="mini-kicker">CERTIFICATES</span>
          <ul className="cred-list">
            {certs.map((c, i) => <li key={i}><span>{c.icon}</span>{c.text}</li>)}
          </ul>
        </div>
        <div className="cred-card cred-card--hot">
          <span className="mini-kicker">AWARD</span>
          <div className="cred-award-tags">{award.tags.map((t, i) => <span className="chip chip--hot" key={i}>{t}</span>)}</div>
          <h5>{award.title}</h5>
          <p>{award.desc}</p>
        </div>
      </div>
    </section>
  );
}
