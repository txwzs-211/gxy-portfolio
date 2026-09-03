import { useState, useEffect, useCallback } from 'react';

/**
 * 零依赖 Hash 路由
 * ------------------------------------------------------------------
 * 路由表：
 *   #/                 首页（可带待滚动锚点，由 goHome 写入 pendingAnchor）
 *   #/work/:slug       项目详情页
 *
 * 用 hash 而非 History API 的原因：作品集是纯静态产物（dist 直接丢托管
 * 或双击打开），hash 路由刷新不会 404、无需服务端 rewrite 配置。
 */

// 解析当前 location.hash -> 路由状态
function parseHash() {
  const raw = (window.location.hash || '').replace(/^#/, '');
  const path = raw || '/';
  const workMatch = path.match(/^\/work\/([\w-]+)\/?$/);
  if (workMatch) {
    return { name: 'work', slug: decodeURIComponent(workMatch[1]) };
  }
  return { name: 'home', slug: null };
}

// 模块级状态：从详情页回首页时，需要恢复的滚动位置 / 待定位锚点
let savedHomeScrollY = 0;
let pendingAnchor = null;

export function saveHomeScroll(y) {
  savedHomeScrollY = typeof y === 'number' ? y : window.scrollY;
}
export function getSavedHomeScroll() {
  return savedHomeScrollY;
}
export function setPendingAnchor(id) {
  pendingAnchor = id;
}
export function takePendingAnchor() {
  const a = pendingAnchor;
  pendingAnchor = null;
  return a;
}

export function routeHome() {
  if ((window.location.hash || '').replace(/^#/, '') === '/') {
    window.scrollTo({ top: 0 });
  } else {
    window.location.hash = '/';
  }
}

export function routeWork(slug) {
  window.location.hash = `/work/${slug}`;
}

/** 详情页点击首页锚点导航：先回首页，挂载后再平滑定位到对应区块 */
export function goHomeToAnchor(anchorId) {
  setPendingAnchor(anchorId);
  const cur = parseHash();
  if (cur.name === 'home') {
    // 已在首页：直接定位
    const el = document.getElementById(anchorId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setPendingAnchor(null);
  } else {
    saveHomeScroll(window.scrollY);
    window.location.hash = '/';
  }
}

export default function useHashRoute() {
  const [route, setRoute] = useState(parseHash);

  useEffect(() => {
    const onChange = () => setRoute(parseHash());
    window.addEventListener('hashchange', onChange);
    // 挂载时也同步一次（处理直接以 #/work/xxx 打开的情况）
    setRoute(parseHash());
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  const isHome = route.name === 'home';
  const goWork = useCallback((slug) => routeWork(slug), []);
  const goHome = useCallback(() => routeHome(), []);

  return { route, isHome, slug: route.slug, goWork, goHome };
}
