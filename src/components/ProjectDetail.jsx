import { useEffect, useMemo, useState } from 'react';
import { getProjectBySlug, getAdjacentProjects } from '../data/projects';
import AssetGroup from './AssetGroup';
import ScrollProgress from './ScrollProgress';

export default function ProjectDetail({ slug }) {
  const project = getProjectBySlug(slug);
  const { prev, next } = getAdjacentProjects(slug);

  const sections = useMemo(() => {
    if (!project) return [];
    const arr = [{ id: 'overview', label: '概述' }];
    if ((project.videos || []).length) arr.push({ id: 'film', label: '成片' });
    if (project.steps && project.steps.length) arr.push({ id: 'process', label: '制作流程' });
    (project.assetGroups || []).forEach((g) => arr.push({ id: g.id, label: g.title }));
    return arr;
  }, [project]);

  const [active, setActive] = useState('overview');

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => { if (en.isIntersecting) setActive(en.target.id); });
      },
      { rootMargin: '-25% 0px -65% 0px', threshold: 0 }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [sections]);

  const jumpTo = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!project) {
    return (
      <div className="detail-notfound">
        <p>未找到该项目。</p>
        <a href="#/" className="detail-back-link">← 返回全部作品</a>
      </div>
    );
  }

  const hasAssets = (project.assetGroups || []).length > 0;
  const videos = project.videos || [];
  const processNum = videos.length ? '02' : '01';
  const dash = (v) => (v && String(v).trim() ? v : '—');

  return (
    <div className="detail-page">
      <ScrollProgress />

      <header className="detail-nav">
        <a href="#/" className="detail-nav-back">← 全部作品</a>
        <nav className="detail-nav-sections" aria-label="本页目录">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={active === s.id ? 'is-active' : ''}
              onClick={(e) => jumpTo(e, s.id)}
            >
              {s.label}
            </a>
          ))}
        </nav>
      </header>

      <article className="detail-container">
        {/* 概述 */}
        <section id="overview" className="detail-hero">
          <p className="detail-eyebrow">
            <span>{project.num}</span> · {project.eyebrow}
          </p>
          <h1 className="detail-title">{project.title}</h1>
          <p className="detail-desc">{project.desc || '项目介绍整理中，稍后补充。'}</p>

          <dl className="detail-facts">
            <div><dt>年份</dt><dd>{dash(project.year)}</dd></div>
            <div><dt>角色</dt><dd>{dash(project.role)}</dd></div>
            <div><dt>工具栈</dt><dd>{project.tools && project.tools.length ? project.tools.join(' / ') : '—'}</dd></div>
          </dl>
          <div className="detail-tags">
            {(project.meta || []).map((m, i) => <span key={i}>{m}</span>)}
          </div>
        </section>

        {/* 成片（支持多支；缺素材显示待补占位） */}
        {videos.length > 0 && (
          <section id="film" className="detail-section">
            <h2 className="detail-section-title"><span>01</span>成片视频</h2>
            <div className="detail-films">
              {videos.map((v, i) => (
                v.src ? (
                  <figure className={`detail-film-wrap${v.portrait ? ' is-portrait' : ''}`} key={i}>
                    {videos.length > 1 && (
                      <figcaption>{v.label}{v.duration ? ` · ${v.duration}` : ''}</figcaption>
                    )}
                    <video
                      className={`detail-film${v.portrait ? ' detail-film--portrait' : ''}`}
                      controls playsInline preload="none"
                      poster={v.poster || undefined}
                    >
                      <source src={v.src} type="video/mp4" />
                      您的浏览器不支持视频播放。
                    </video>
                  </figure>
                ) : (
                  <div className="detail-film-todo" key={i}>
                    <div className="detail-film-todo-icon" aria-hidden="true">▶</div>
                    <div>
                      <b>{v.label || '成片'}</b>
                      <span>{v.duration ? `时长 ${v.duration} · ` : ''}成片素材待补（导出 Web 压缩版后接入）</span>
                    </div>
                  </div>
                )
              ))}
            </div>
          </section>
        )}

        {/* 制作流程 */}
        {project.steps && project.steps.length > 0 && (
          <section id="process" className="detail-section">
            <h2 className="detail-section-title"><span>{processNum}</span>制作流程</h2>
            <ol className="detail-steps">
              {project.steps.map((s, i) => (
                <li className="detail-step" key={i}>
                  <div className="detail-step-index">{String(i + 1).padStart(2, '0')}</div>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* 资产分区 */}
        {hasAssets ? (
          project.assetGroups.map((g) => <AssetGroup group={g} key={g.id} />)
        ) : (
          <section className="detail-section detail-empty-assets">
            <h2 className="detail-section-title"><span>—</span>角色与场景资产</h2>
            <p className="detail-empty-note">该项目的角色 / 场景资产图正在整理补充中，敬请期待。</p>
          </section>
        )}

        {/* 上一 / 下一 */}
        <nav className="detail-pager">
          {prev ? (
            <a className="detail-pager-item" href={`#/work/${prev.slug}`}>
              <span className="detail-pager-dir">← 上一项目</span>
              <span className="detail-pager-name">{prev.title}</span>
            </a>
          ) : <span className="detail-pager-item is-disabled"><span className="detail-pager-dir">已是第一个</span></span>}

          <a className="detail-pager-all" href="#/">全部作品</a>

          {next ? (
            <a className="detail-pager-item detail-pager-item--right" href={`#/work/${next.slug}`}>
              <span className="detail-pager-dir">下一项目 →</span>
              <span className="detail-pager-name">{next.title}</span>
            </a>
          ) : <span className="detail-pager-item is-disabled detail-pager-item--right"><span className="detail-pager-dir">已是最后一个</span></span>}
        </nav>
      </article>
    </div>
  );
}
