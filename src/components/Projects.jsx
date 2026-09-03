import { projects, categories, countAssets, readyVideoCount } from '../data/projects';
import { useScrollReveal } from '../hooks/useScrollReveal';

/* bento 卡型循环：大横 / 高卡 / 中横，形成错落节奏 */
const SIZE = ['lg', 'tall', 'md'];

function BentoCell({ p, i }) {
  const total = (p.videos || []).length;
  const ready = readyVideoCount(p);
  const assetN = countAssets(p);
  const sub = [
    total ? `成片 ${ready}/${total}` : `${assetN} 张视觉资产`,
    assetN && total ? `${assetN} 项资产` : null,
  ].filter(Boolean).join(' · ');

  return (
    <a
      className={`bento-cell bento-cell--${SIZE[i % SIZE.length]}`}
      href={`#/work/${p.slug}`}
    >
      <img className="bento-img" src={p.cover} alt={p.title} loading="lazy" />
      <div className="bento-veil"></div>
      <span className="bento-tag">{p.eyebrow.split(' / ')[0]}</span>
      <span className="bento-num">{p.num}</span>
      <div className="bento-body">
        <h3>{p.title}</h3>
        <p>{(p.meta || []).slice(0, 3).join(' · ')} · {sub}</p>
      </div>
      <span className="bento-go" aria-hidden="true">↗</span>
    </a>
  );
}

export default function Projects() {
  const ref = useScrollReveal();

  return (
    <section id="projects" className="works-x section" ref={ref}>
      <div className="sec-head">
        <h2 className="sec-title">SELECTED WORKS<span className="sec-arrow">↘</span></h2>
        <p className="sec-sub">精选作品</p>
        <p className="sec-note">按方向分类 · 点击进入项目详情（成片 / 角色 / 场景 / 关键帧）</p>
      </div>

      {categories.map((cat) => {
        const list = projects.filter((p) => p.category === cat.id);
        if (!list.length) return null;
        return (
          <div className="bento-group" key={cat.id}>
            <div className="bento-group-label">
              <span className="bento-group-bar"></span>
              <h4>{cat.label}</h4>
              <span className="bento-group-en">{cat.en}</span>
              <span className="bento-group-n">{list.length}</span>
            </div>
            <div className="bento-grid">
              {list.map((p, i) => <BentoCell p={p} i={i} key={p.slug} />)}
            </div>
          </div>
        );
      })}
    </section>
  );
}
