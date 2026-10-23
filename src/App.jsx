import { useEffect, useRef } from 'react';
import useHashRoute, { saveHomeScroll } from './hooks/useHashRoute';
import Home from './components/Home';
import ProjectDetail from './components/ProjectDetail';
import BackToTop from './components/BackToTop';
import { getProjectBySlug } from './data/projects';
import { profile } from './data/profile';

export default function App() {
  const { route } = useHashRoute();
  const prevName = useRef(route.name);

  // 路由切换：滚动位置记忆 / 详情回顶 / 标签标题同步
  useEffect(() => {
    const wasHome = prevName.current === 'home';
    if (wasHome && route.name === 'work') saveHomeScroll(window.scrollY);
    if (route.name === 'work') window.scrollTo({ top: 0, left: 0 });

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
