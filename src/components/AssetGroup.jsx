import { useLightbox } from '../hooks/useLightbox';
import Lightbox from './Lightbox';

const KIND_LABEL = {
  method: 'Methodology',
  character: 'Character',
  scene: 'Scene',
  frame: 'Keyframe',
  gallery: 'Gallery',
};

/** 单个角色：独立灯箱，浏览范围只含该角色的多视角图 */
function CharacterCard({ character }) {
  const lb = useLightbox();
  const imgs = character.images || [];
  return (
    <div className="asset-character">
      <div className="asset-character-head">
        <h4>{character.name}</h4>
        {character.desc && <p>{character.desc}</p>}
        <span className="asset-character-count">{imgs.length} 视图</span>
      </div>
      <div className="asset-grid asset-grid--character">
        {imgs.map((src, i) => (
          <button className="asset-cell" key={src} onClick={() => lb.open(imgs, i)}>
            <img src={src} alt={`${character.name} 视图 ${i + 1}`} loading="lazy" />
          </button>
        ))}
      </div>
      <Lightbox list={lb.list} index={lb.index} onClose={lb.close} onPrev={lb.prev} onNext={lb.next} />
    </div>
  );
}

/** 一个有序资产分区（平铺网格 或 角色分组） */
export default function AssetGroup({ group }) {
  const lb = useLightbox();
  const imgs = group.images || [];
  const charCount = (group.characters || []).reduce((n, c) => n + (c.images?.length || 0), 0);
  const total = imgs.length + charCount;

  return (
    <section className="asset-group" id={group.id}>
      <header className="asset-group-head">
        <span className="asset-group-kind">{KIND_LABEL[group.kind] || 'Gallery'}</span>
        <h3>{group.title}</h3>
        <span className="asset-group-count">{total} 张</span>
      </header>

      {imgs.length > 0 && (
        <div className="asset-grid">
          {imgs.map((src, i) => (
            <button className="asset-cell" key={src} onClick={() => lb.open(imgs, i)}>
              <img src={src} alt={`${group.title} ${i + 1}`} loading="lazy" />
            </button>
          ))}
        </div>
      )}

      {(group.characters || []).map((ch) => (
        <CharacterCard character={ch} key={ch.name} />
      ))}

      <Lightbox list={lb.list} index={lb.index} onClose={lb.close} onPrev={lb.prev} onNext={lb.next} />
    </section>
  );
}
