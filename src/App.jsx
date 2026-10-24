import { useEffect, useRef } from 'react';
import useHashRoute, { saveHomeScroll, getSavedHomeScroll } from './hooks/useHashRoute';
import Home from './components/Home';
import ProjectDetail from './components/ProjectDetail';
import BackToTop from './components/BackToTop';
import { getProjectBySlug } from './data/projects';
import { profile } from './data/profile';

export default function App() {
  const { route } = useHashRoute();
  const prevName = useRef(route.name);

  // 初始化：禁用浏览器自动滚动恢复；点击作品卡片的瞬间先记录首页滚动位置
  // （此时详情页还未挂载，不会被新页面高度钳位）
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    const onNav = (e) => {
      const t = e.target;
      const a = t && t.closest && t.closest('a[href^="#/work/"]');
      if (a) saveHomeScroll(window.scrollY);
    };
    document.addEventListener('click', onNav);
    return () => document.removeEventListener('click', onNav);
  }, []);

  // 路由切换：滚动位置记忆 / 详情回顶 / 标签标题同步
  useEffect(() => {
    if (route.name === 'work') window.scrollTo({ top: 0, left: 0 });
    // 从详情页返回首页：恢复到之前所在的滚动位置
    if (prevName.current === 'work' && route.name === 'home') {
      const y = getSavedHomeScroll();
      requestAnimationFrame(() => {
        window.scrollTo(0, y);
        setTimeout(() => window.scrollTo(0, y), 250);
        setTimeout(() => window.scrollTo(0, y), 600);
      });
    }

    const proj = route.slug ? getProjectBySlug(route.slug) : null;
    document.title = proj
      ? `${proj.title} · ${profile.name}作品集`
      : `${profile.name} · AI视频设计师作品集`;

    prevName.current = route.name;
  }, [route]);

  // 媒体防下载：拦截图片/视频上的右键菜单，禁止图片拖拽
  useEffect(() => {
    const onContextMenu = (e) => {
      const t = e.target;
      if (t && t.closest && t.closest('img, video, audio')) e.preventDefault();
    };
    const onDragStart = (e) => {
      if (e.target && e.target.tagName === 'IMG') e.preventDefault();
    };
    document.addEventListener('contextmenu', onContextMenu);
    document.addEventListener('dragstart', onDragStart);
    return () => {
      document.removeEventListener('contextmenu', onContextMenu);
      document.removeEventListener('dragstart', onDragStart);
    };
  }, []);

  const page = route.name === 'work'
    ? <ProjectDetail slug={route.slug} />
    : <Home />;
  return (
    <>
      {page}
      <BackToTop />
    </>
  );
}
