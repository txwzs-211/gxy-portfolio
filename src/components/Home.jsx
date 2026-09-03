import { useEffect } from 'react';
import Header from './Header';
import Hero from './Hero';
import About from './About';
import Projects from './Projects';
import Strengths from './Strengths';
import Footer from './Footer';
import ScrollProgress from './ScrollProgress';
import { takePendingAnchor, getSavedHomeScroll } from '../hooks/useHashRoute';

/**
 * 首页：纵向叙事  Hero → About → Projects → Strengths → Footer(Contact)
 * 从详情页返回时恢复之前的滚动位置；带锚点指令时定位到对应区块。
 */
export default function Home() {
  useEffect(() => {
    const anchor = takePendingAnchor();
    if (anchor) {
      requestAnimationFrame(() => {
        const el = document.getElementById(anchor);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      });
    } else {
      const y = getSavedHomeScroll();
      if (y > 0) window.scrollTo({ top: y, left: 0, behavior: 'instant' });
    }
  }, []);

  return (
    <>
      {/* 背景氛围层 */}
      <div className="bg-grid"></div>
      <div className="bg-glow"></div>
      <div className="bg-noise"></div>

      <ScrollProgress />
      <Header />

      <main>
        <Hero />
        <About />
        <Projects />
        <Strengths />
      </main>

      <Footer />
    </>
  );
}
