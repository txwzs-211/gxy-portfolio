/**
 * 项目数据（内容唯一数据源）
 * ------------------------------------------------------------------
 * 分类 / 项目清单以飞书《AIGC全链路Portfolio | 吴坤焱》为准。
 * 成片视频均取自飞书知识库原片（1080p/720p 流转码版），封面为视频抽帧。
 *
 * 每个项目：
 * {
 *   category  大类 id（见 categories）
 *   slug      路由 #/work/:slug
 *   num/title/eyebrow/desc/year/role/tools/meta
 *   cover     列表封面；null = 素材待补（前端渲染占位，不显示破图）
 *   videos    成片列表 [{label,duration,src,poster,portrait}]；src 为 null 表示视频待补
 *   steps     制作流程文字（可空）
 *   assetGroups 有序资产分区：
 *     平铺 {id,kind,title,images:[url]}
 *     角色 {id,kind:'character',title,characters:[{name,desc,images}]}
 * }
 */

const drama = (i) => `/assets/gallery/drama/drama-${String(i).padStart(2, '0')}.webp`;
const ball = (i) => `/assets/gallery/basketball/basketball-${String(i).padStart(2, '0')}.webp`;
const frame = (i) => `/assets/gallery/design/frame-${String(i).padStart(2, '0')}.webp`;
const poster = (n) => `/assets/posters/${n}.webp`;
const seq = (a, b, fn) => Array.from({ length: b - a + 1 }, (_, k) => fn(a + k));

/* 大类（列表按此顺序分组） */
export const categories = [
  { id: 'game', label: 'AI 游戏动画 PV', en: 'Game Animation PV' },
  { id: 'gacha', label: '游戏抽卡动画', en: 'Game Gacha Reveal' },
  { id: 'drama', label: 'AI 影视 / 短剧', en: 'Film & Short Drama' },
  { id: 'ui', label: 'UI 视觉设计', en: 'UI / Visual Design' },
];

export const projects = [
  /* ===================== AI 游戏动画 PV ===================== */
  {
    num: '01', category: 'game', slug: 'nba-duel',
    eyebrow: 'Sports / Motion Key Visual',
    title: 'NBA 巅峰对决 · 动画 PV',
    desc: '以赛事入场、球队精神和高能灯光为核心，构建具备冲击力的体育视觉包装，覆盖球员角色设定、球馆舞台场景到分镜关键帧，适合游戏、短视频与活动大屏场景。含主动画 PV 与球员出场包装两支成片。',
    year: '2025 — 2026', role: 'AI 视频 / 动态视觉包装',
    tools: ['Midjourney', 'AI 视频生成', 'After Effects', 'Premiere'],
    meta: ['体育视觉', '出场包装', '动态分镜'],
    cover: '/assets/covers/nba-duel.webp',
    videos: [
      { label: 'NBA 巅峰对决动画 PV', duration: '00:44', src: '/videos/hero-reel.mp4', poster: '/assets/covers/nba-duel.webp' },
    ],
    steps: null,
    assetGroups: [
      { id: 'method', kind: 'method', title: '策略拆解与制作规范', images: [ball(2), ball(3), ball(4), ball(5), ball(6), ball(19)] },
      {
        id: 'characters', kind: 'character', title: '角色资产 · 球员设定',
        characters: [
          { name: '德里克·罗斯', desc: '角色定装 / 四视图 / 表情动作设定表', images: [ball(7), ball(8), ball(9)] },
        ],
      },
      { id: 'scenes', kind: 'scene', title: '场景资产 · 球馆舞台', images: seq(10, 18, ball) },
      { id: 'frames', kind: 'frame', title: '主视觉与分镜关键帧', images: [ball(1), ball(20), ball(21)] },
    ],
  },
  {
    num: '02', category: 'game', slug: 'football-manager',
    eyebrow: 'Game PV',
    title: '足球经理人 2 · PV',
    desc: '足球经营类游戏的动画宣传 PV，以赛事氛围、球员高光与节奏剪辑呈现游戏卖点。',
    year: '2025 — 2026', role: 'AI 视频 / 动态视觉包装', tools: ['AI 视频生成', 'After Effects', 'Premiere'],
    meta: ['游戏 PV'],
    cover: '/assets/covers/football-manager.webp',
    videos: [{ label: '足球经理人 PV', duration: '01:25', src: '/videos/football-manager.mp4', poster: '/assets/covers/football-manager.webp' }],
    steps: null,
    assetGroups: [
      {
        id: 'manager', kind: 'character', title: '人物设定 · 经理人',
        characters: [
          { name: '经理人', desc: '正式设定 / 原始参考', images: ['/assets/gallery/football-manager-pv/manager-1.webp', '/assets/gallery/football-manager-pv/manager-2.webp'] },
        ],
      },
      {
        id: 'stars', kind: 'character', title: '人物设定 · 球星阵容',
        characters: [
          { name: '利物浦球星', desc: '萨拉赫 / 格拉文伯奇 / 范戴克 / 麦卡利斯特', images: ['/assets/gallery/football-manager-pv/star-liv-1.webp', '/assets/gallery/football-manager-pv/star-liv-2.webp', '/assets/gallery/football-manager-pv/star-liv-3.webp', '/assets/gallery/football-manager-pv/star-liv-4.webp'] },
          { name: '埃弗顿球星', desc: '皮纳尔 / 贾吉尔卡 / 贝恩斯 / 耶拉维奇', images: ['/assets/gallery/football-manager-pv/star-evo-1.webp', '/assets/gallery/football-manager-pv/star-evo-2.webp', '/assets/gallery/football-manager-pv/star-evo-3.webp', '/assets/gallery/football-manager-pv/star-evo-4.webp'] },
          { name: '1960 测试渲染', desc: '球星造型测试稿', images: ['/assets/gallery/football-manager-pv/star-1960-a.webp', '/assets/gallery/football-manager-pv/star-1960-b.webp'] },
        ],
      },
      {
        id: 'scenes', kind: 'scene', title: '场景资产',
        images: ['/assets/gallery/football-manager-pv/scene-1.webp', '/assets/gallery/football-manager-pv/scene-2.webp', '/assets/gallery/football-manager-pv/scene-3.webp', '/assets/gallery/football-manager-pv/scene-4.webp', '/assets/gallery/football-manager-pv/scene-5.webp', '/assets/gallery/football-manager-pv/scene-6.webp'],
      },
      {
        id: 'props', kind: 'gallery', title: '道具资产 · 球员卡 / LOGO',
        images: ['/assets/gallery/football-manager-pv/prop.webp', '/assets/gallery/football-manager-pv/logo.webp'],
      },
    ],
  },
  {
    num: '03', category: 'game', slug: 'seven-days',
    eyebrow: 'Game PV',
    title: '七日世界 · PV',
    desc: '末日开放世界题材游戏宣传 PV，强调氛围营造、世界观铺陈与高能镜头节奏。',
    year: '2025 — 2026', role: 'AI 视频 / 动态视觉包装', tools: ['AI 视频生成', 'After Effects', 'Premiere'],
    meta: ['游戏 PV'],
    cover: '/assets/covers/seven-days.webp',
    videos: [{ label: '七日世界 PV', duration: '06:51', src: 'https://portfolio-videos-1341078655.cos.ap-guangzhou.myqcloud.com/seven-days.mp4', poster: '/assets/covers/seven-days.webp' }],
    steps: null, assetGroups: [],
  },

  /* ===================== AI 影视 / 短剧 ===================== */
  {
    num: '04', category: 'drama', slug: 'mermaid',
    eyebrow: 'Short Drama / AI Production',
    title: '海外真人短剧 · 美人鱼',
    desc: '围绕短剧角色、场景氛围与标题视觉进行创作，探索 AI 辅助影视前期、角色设定和宣传物料生产。从剧本拆解到成片输出，全流程展示 AI 真人短剧的工业化制作方法。',
    year: '2025 — 2026',
    role: '剧本拆解 / 角色场景资产 / AI 视频 / 后期',
    tools: ['ComfyUI', '多参考图视频', 'After Effects', 'Premiere'],
    meta: ['短剧制作', '角色设定', '海报视觉', 'AI视频生成'],
    cover: '/assets/covers/mermaid.webp',
    videos: [{ label: '海外美人鱼短剧（成片 · 竖屏）', duration: '10:41', src: 'https://portfolio-videos-1341078655.cos.ap-guangzhou.myqcloud.com/drama-mermaid.mp4', poster: '/assets/covers/mermaid.webp', portrait: true }],
    steps: [
      { title: '剧本拆解与分镜设计', desc: '将完整剧本按场景拆解为分镜脚本，标注镜头类型、运镜方式、角色情绪和关键动作，形成可执行的生成清单。' },
      { title: '角色设定与 AI 资产产出', desc: '使用 AI 图像生成工具进行角色形象设计，输出多角度、多表情的角色参考图，确保前后镜头角色一致性。' },
      { title: '场景氛围与道具资产', desc: '根据剧本场景需求，生成环境氛围图和关键道具资产，统一视觉风格与色调，为视频生成提供参考基础。' },
      { title: 'AI 视频生成与迭代优化', desc: '使用多参考图生成视频的方法，将角色和场景资产转化为动态片段，边生成边优化提示词，控制画面质量和一致性。' },
      { title: '后期剪辑与成片输出', desc: '将生成的视频素材进行剪辑、调色、转场，配合配乐、音效和字幕，输出最终的商用级短剧成片。' },
    ],
    assetGroups: [
      { id: 'method', kind: 'method', title: '制作规范与流程方法论', images: seq(2, 8, drama).concat([drama(22)]) },
      {
        id: 'characters', kind: 'character', title: '角色资产 · 多视角一致性',
        characters: [
          { name: '男主角', desc: '定装参考 + 标准四视图', images: [drama(9), drama(10)] },
          { name: '女主角', desc: '定装参考 + 标准四视图', images: [drama(11), drama(12)] },
          { name: '红裙女配角', desc: '定装参考 + 标准四视图', images: [drama(13), drama(14)] },
          { name: '护士', desc: '定装参考 + 标准四视图', images: [drama(15), drama(16)] },
        ],
      },
      { id: 'scenes', kind: 'scene', title: '场景资产 · 病房空间', images: seq(17, 21, drama) },
      { id: 'frames', kind: 'frame', title: '标题视觉与分镜关键帧', images: [drama(1), drama(23)] },
    ],
  },
  {
    num: '05', category: 'drama', slug: 'comic-drama',
    eyebrow: 'Comic Drama / AI Production',
    title: 'AI 漫剧 PV · 新算法之外',
    desc: '从故事构思、资产制作到 AI 视频生成与后期剪辑，完整展示 AI 辅助漫剧制作的全流程方法论。',
    year: '2025 — 2026',
    role: '编剧 / 资产 / AI 视频 / 后期全流程',
    tools: ['LLM 剧本', 'AI 生图', '多参考图视频', 'Premiere'],
    meta: ['漫剧制作', 'AI生图', '多参视频'],
    cover: '/assets/covers/comic-drama.webp',
    videos: [{ label: '新算法之外 PV', duration: '05:52', src: 'https://portfolio-videos-1341078655.cos.ap-guangzhou.myqcloud.com/comic-drama.mp4', poster: '/assets/covers/comic-drama.webp' }],
    steps: [
      { title: '故事剧本构思与 LLM 优化', desc: '有一个故事剧本的思路，让 LLM 进行优化，完善剧情结构、角色对话和场景描述，形成可用于分镜的完整剧本。' },
      { title: '资产制作（角色 / 场景 / 道具）', desc: '根据故事内容制作所需资产：角色形象、场景环境、道具物品，使用 AI 图像生成工具快速产出初版视觉资产。' },
      { title: '资产高清化与纯色背景处理', desc: '将生成的资产进行高清放大处理，并去除背景替换为纯色，使其成为可复用的标准化资产素材。' },
      { title: '剧本转分镜提示词 + 多参视频生成', desc: '将剧本拆解为分镜提示词，使用多参考图生成视频的方法，将静态资产转化为动态视频片段。' },
      { title: '边生成边优化提示词', desc: '在视频生成过程中持续迭代优化提示词，根据生成效果调整参数，逐步提升画面质量和一致性。' },
      { title: '后期剪辑、配乐与音效', desc: '将所有生成的视频素材进行后期剪辑，添加配乐、音效和字幕，完成最终的漫剧成片输出。' },
    ],
    assetGroups: [],
  },
  {
    num: '06', category: 'drama', slug: 'ue5-short',
    eyebrow: 'Short Drama / UE5 Style',
    title: 'UE5 渲染风格短剧',
    desc: '以 UE5 级实时渲染质感为目标的风格化短剧片段，探索 AI 生成高保真游戏引擎画面风格的可行性。',
    year: '2025 — 2026', role: 'AI 视频 / 风格化渲染', tools: ['AI 视频生成', 'After Effects'],
    meta: ['风格化短剧'],
    cover: '/assets/covers/ue5-short.webp',
    videos: [{ label: 'UE5 渲染风格短剧', duration: '02:23', src: 'https://portfolio-videos-1341078655.cos.ap-guangzhou.myqcloud.com/ue5-short.mp4', poster: '/assets/covers/ue5-short.webp' }],
    steps: null, assetGroups: [],
  },
  {
    num: '07', category: 'drama', slug: 'comic-ops',
    eyebrow: 'Comic Drama / Operation',
    title: 'AI 漫剧运营视频',
    desc: '面向运营投放的多支短内容片段，覆盖剧情切片、场景展示与道具转场等形式，含横屏剧情切片与两支竖屏内容。',
    year: '2025 — 2026', role: 'AI 视频 / 运营内容', tools: ['AI 视频生成', 'Premiere'], meta: ['运营视频', '竖屏内容'],
    cover: '/assets/covers/comic-ops.webp',
    videos: [
      { label: '剧情切片', duration: '00:28', src: '/videos/comic-ops-clip.mp4', poster: '/assets/covers/comic-ops.webp' },
      { label: '航船展示（竖屏）', duration: '00:40', src: '/videos/comic-ops-scene.mp4', poster: poster('comic-ops-scene'), portrait: true },
      { label: '道具转场（竖屏）', duration: '00:34', src: '/videos/comic-ops-transition.mp4', poster: poster('comic-ops-transition'), portrait: true },
    ],
    steps: null, assetGroups: [],
  },

  /* ===================== UI 视觉设计 ===================== */
  {
    num: '08', category: 'ui', slug: 'design-showcase',
    eyebrow: 'AIGC / Visual Design',
    title: 'UI 视觉设计作品集',
    desc: '覆盖 AIGC 营销活动设计、小程序体验设计、IP LoRA 资产、游戏美术图标与品牌内容延展，强调从概念到可落地视觉系统的完整表达。',
    year: '2024 — 2026', role: 'AIGC 视觉 / 体验设计 / 游戏美术',
    tools: ['ComfyUI / LoRA', 'Figma', 'Photoshop', 'AI 生图'],
    meta: ['AI视觉', '品牌延展', 'UI资产'],
    cover: '/assets/covers/design-showcase.webp',
    videos: [],
    steps: null,
    assetGroups: [
      { id: 'ui', kind: 'gallery', title: '体验设计案例 · 礼在小程序', images: seq(1, 23, frame) },
      {
        id: 'ip', kind: 'character', title: 'IP 资产 · 驯鹿 LoRA 模型',
        characters: [
          { name: '驯鹿 IP', desc: '数字资产库 / 情景适配 / 模型炼制与实战', images: seq(24, 27, frame) },
        ],
      },
      { id: 'marketing', kind: 'gallery', title: 'AIGC 营销与硬件渠道视觉', images: seq(28, 41, frame).concat([frame(43), frame(52), frame(53)]) },
      { id: 'gameart', kind: 'gallery', title: '游戏美术 · 图标 / 界面 / 插画', images: [frame(42), ...seq(44, 51, frame)] },
    ],
  },

  /* ===================== 游戏抽卡演出（新增） ===================== */
  {
    num: '09', category: 'gacha', slug: 'fm2-gacha',
    eyebrow: 'Game Gacha Reveal',
    title: '足球经理人2 · 球星抽卡登场',
    desc: '游戏抽卡演出动画，以「出金预告 → 通道身份揭秘 → 球星亮相」三幕结构推进：球员通道内按荷兰国旗 → POSITION/CB → Liverpool 队徽的顺序自然解锁身份，最终舞台聚光定格，完成从神秘背影到完整球星的情绪释放。',
    year: '2026', role: 'AI 视频 / 抽卡演出与后期包装', tools: ['AI 视频生成', 'ComfyUI', 'Premiere', 'After Effects'],
    meta: ['游戏抽卡', '身份解锁', '电影化运镜'],
    cover: '/assets/covers/fm-gacha.webp',
    videos: [{ label: '球星抽卡登场', duration: '00:31', src: '/videos/fm2-gacha.mp4', poster: '/assets/covers/fm-gacha.webp' }],
    steps: [
      { title: '前期定调 · 三幕情绪结构', desc: '明确「出金预告 → 通道揭秘 → 亮相定格」的情绪曲线，先锁主参考图（MRI）与环境光板，统一跨镜头的服装、材质与光影基调。' },
      { title: '资产工程 · 分镜脚本', desc: '产出角色正 / 侧 / 表情三视角、关键道具与场景板；按景别、主体动作、运镜、情绪、时长、上屏文字六要素写分镜，遵循一镜一动作一运镜。' },
      { title: 'Draft 验证 · 两遍渲染', desc: '先用低分辨率草稿验证叙事逻辑、角色一致性与情绪到位；锁定 prompt 与 seed 后用 1080P 重新推理终渲，高潮镜头可上 4K，而非直接把低清拉高清。' },
      { title: '剪辑合成 · 音效调色', desc: '粗剪拼合后按情绪曲线精调节奏，抽卡音与角色登场音卡在情绪点；角色名、稀有度、Logo 一律后期叠加，统一调色后按投放平台规格导出。' },
    ],
    assetGroups: [
      {
        id: 'char', kind: 'character', title: '角色资产 · 神秘球员（通用球衣）',
        characters: [
          { name: '神秘球员', desc: '通用球衣设定 / 人物主参考 / 多视角一致性', images: ['/assets/gallery/fm-gacha/char-1.webp', '/assets/gallery/fm-gacha/char-2.webp', '/assets/gallery/fm-gacha/char-3.webp'] },
        ],
      },
      {
        id: 'scenes', kind: 'scene', title: '场景资产 · 球场 / 球员通道 / 亮相舞台 / 更衣室',
        images: [
          '/assets/gallery/fm-gacha/scene-stadium-1.webp',
          '/assets/gallery/fm-gacha/scene-stadium-2.webp',
          '/assets/gallery/fm-gacha/scene-stadium-3.webp',
          '/assets/gallery/fm-gacha/scene-tunnel.webp',
          '/assets/gallery/fm-gacha/stage-drone.webp',
          '/assets/gallery/fm-gacha/locker-1.webp',
          '/assets/gallery/fm-gacha/locker-2.webp',
          '/assets/gallery/fm-gacha/locker-3.webp',
        ],
      },
      {
        id: 'props', kind: 'gallery', title: '道具资产 · 球员卡剪影',
        images: ['/assets/gallery/fm-gacha/prop-card.webp'],
      },
    ],
  },
  {
    num: '10', category: 'gacha', slug: 'bm2-gacha',
    eyebrow: 'Game Gacha Reveal · Basketball',
    title: '篮球大师2 · 球星抽卡登场',
    desc: '篮球题材游戏抽卡演出动画，以「卡牌亮相 → 球馆斗屏造势 → 球员通道揭秘 → 科技感展台聚光定格」推进：罗斯球员卡从翻牌到立绘，配合球馆全景与火花氛围，最终在科技舞台完成球星登场的情绪释放。',
    year: '2026', role: 'AI 视频 / 抽卡演出与后期包装', tools: ['AI 视频生成', 'ComfyUI', 'Premiere', 'After Effects'],
    meta: ['游戏抽卡', '球星亮相', '科技感舞台'],
    cover: '/assets/covers/bm2-gacha.webp',
    videos: [{ label: '球星抽卡登场', duration: '00:21', src: '/videos/bm2-gacha.mp4', poster: '/assets/covers/bm2-gacha.webp' }],
    steps: [
      { title: '前期定调 · 三幕情绪结构', desc: '明确「卡牌预告 → 通道揭秘 → 亮相定格」的情绪曲线，先锁主参考图（MRI）与环境光板，统一跨镜头的球衣、材质与光影基调。' },
      { title: '资产工程 · 分镜脚本', desc: '产出角色参考、斗屏 / 球馆 / 通道 / 展台场景板与球星卡道具；按景别、主体动作、运镜、情绪、时长、上屏文字写分镜，遵循一镜一动作一运镜。' },
      { title: 'Draft 验证 · 两遍渲染', desc: '先用低分辨率草稿验证叙事逻辑、角色一致性与情绪到位；锁定 prompt 与 seed 后用 1080P 重新推理终渲，高潮镜头可上 4K，而非直接把低清拉高清。' },
      { title: '剪辑合成 · 音效调色', desc: '粗剪拼合后按情绪曲线精调节奏，翻牌音与登场音卡在情绪点；球员名、稀有度、Logo 一律后期叠加，统一调色后按投放平台规格导出。' },
    ],
    assetGroups: [
      {
        id: 'char', kind: 'character', title: '角色资产 · 罗斯球员设定',
        characters: [
          { name: '罗斯', desc: '人物主参考 / AI 生成设定 / 多视角一致性', images: ['/assets/gallery/bm2-gacha/char-1.webp', '/assets/gallery/bm2-gacha/char-2.webp', '/assets/gallery/bm2-gacha/char-3.webp'] },
        ],
      },
      {
        id: 'scenes', kind: 'scene', title: '场景资产 · 球馆全景 / 球员通道 / 科技展台',
        images: [
          '/assets/gallery/bm2-gacha/scene-arena-1.webp',
          '/assets/gallery/bm2-gacha/scene-arena-spark.webp',
          '/assets/gallery/bm2-gacha/scene-tunnel.webp',
          '/assets/gallery/bm2-gacha/scene-stage-4.webp',
          '/assets/gallery/bm2-gacha/scene-stage-platform.webp',
          '/assets/gallery/bm2-gacha/scene-stage-0722.webp',
        ],
      },
      {
        id: 'props', kind: 'gallery', title: '道具资产 · 罗斯卡牌 / 球馆斗屏',
        images: [
          '/assets/gallery/bm2-gacha/prop-card-rose.webp',
          '/assets/gallery/bm2-gacha/prop-dipin-3.webp',
          '/assets/gallery/bm2-gacha/prop-dipin-ok.webp',
          '/assets/gallery/bm2-gacha/prop-dipin-closeup.webp',
        ],
      },
      {
        id: 'frames', kind: 'frame', title: '分镜关键帧',
        images: [
          '/assets/gallery/bm2-gacha/frame-8.webp',
          '/assets/gallery/bm2-gacha/frame-0217.webp',
          '/assets/gallery/bm2-gacha/frame-4.webp',
        ],
      },
    ],
  },

];

/* ---- 查询工具 ---- */
export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug) || null;
}
export function getProjectIndex(slug) {
  return projects.findIndex((p) => p.slug === slug);
}
export function getAdjacentProjects(slug) {
  const i = getProjectIndex(slug);
  if (i < 0) return { prev: null, next: null };
  return {
    prev: i > 0 ? projects[i - 1] : null,
    next: i < projects.length - 1 ? projects[i + 1] : null,
  };
}
export function countAssets(project) {
  let n = 0;
  (project.assetGroups || []).forEach((g) => {
    if (g.images) n += g.images.length;
    if (g.characters) g.characters.forEach((c) => { n += (c.images || []).length; });
  });
  return n;
}
/* 是否还有待补素材（封面或任一可用成片缺失） */
export function isProjectPending(project) {
  if (!project.cover) return true;
  const vids = project.videos || [];
  return vids.length > 0 && vids.every((v) => !v.src);
}
export function readyVideoCount(project) {
  return (project.videos || []).filter((v) => v.src).length;
}
