import { skills } from '../data/skills';
import { useScrollReveal } from '../hooks/useScrollReveal';

/* 优势卡片：内容均提炼自真实经历与技能数据 */
const CARDS = [
  {
    no: '01', tag: 'CORE', title: '全链路 AIGC 视频生产', hot: true,
    desc: '从剧本拆解、分镜设计、AI 视频生成到后期剪辑音效适配独立闭环，直接输出商用级成片，而非停留在单张图、单条片段。',
    bubbles: ['剧本 / 分镜', 'AI 生成', '后期包装', '商用成片'],
  },
  {
    no: '02', tag: 'SYSTEM', title: '工程化 SOP 与管线搭建',
    desc: '把碎片化的 AIGC 工具整合为标准化生产管线，已在网易、传音控股、腾讯控股等企业落地，可复制、可交付、可量化提效。',
  },
  {
    no: '03', tag: 'CORE', title: '多镜头角色一致性控制',
    desc: '沉淀 3×3 九宫格生图法与双垫图规范，配合 Prompt 精准控制镜头参数，保障跨镜头角色、风格统一，显著降低无效废片率。',
  },
  {
    no: '04', tag: 'SYSTEM', title: '本地工作流与模型精控',
    desc: '精通 Stable Diffusion / ComfyUI 本地部署与工作流搭建，掌握 LoRA 训练、ControlNet 精控、Flux 精调与风格转绘。',
  },
  {
    no: '05', tag: 'CORE', title: '可验证的商业落地产能',
    desc: '批处理管线日均处理视觉素材 500+，多项流程效率提升 35%–80%，兼顾产能、画质与品牌一致性的平衡。',
  },
];

export default function Strengths() {
  const ref = useScrollReveal();
  return (
    <section id="strengths" className="strengths-x section" ref={ref}>
      <div className="sec-head">
        <h2 className="sec-title">CORE STRENGTHS<span className="sec-arrow">↘</span></h2>
        <p className="sec-sub">个人优势</p>
      </div>

      <div className="str-grid">
        {CARDS.map((c) => (
          <article
            key={c.no}
            className={`str-card${c.hot ? ' str-card--hot' : ''} str-card--${c.no}`}
          >
            <div className="str-card-top">
              <span className="str-no">{c.no}</span>
              <span className="str-tag">{c.tag}</span>
            </div>
            <h3 className="str-title">{c.title}<i className="str-dot"></i></h3>
            <p className="str-desc">{c.desc}</p>
            {c.bubbles && (
              <div className="str-bubbles">
                {c.bubbles.map((b, i) => <span key={i} className={`str-bubble str-bubble--${i % 3}`}>{b}</span>)}
              </div>
            )}
            {!c.hot && <span className="str-blob" aria-hidden="true"></span>}
          </article>
        ))}
      </div>

      {/* 工具熟练度 */}
      <div className="str-tools">
        <span className="mini-kicker">TOOLKIT</span>
        <div className="str-tools-grid">
          {skills.map((s, i) => (
            <div className="str-tool" key={i}>
              <div className="str-tool-head"><span>{s.label}</span><em>{s.pct}</em></div>
              <div className="str-bar"><i style={{ width: s.pct }}></i></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
