import { useRef, useEffect, useState, useCallback } from 'react';

/**
 * 点击播放/暂停的视频控制 hook
 *
 * 交互逻辑：
 * - 默认暂停，显示封面
 * - 点击 → 切换播放/暂停
 */
export default function useHoverPlay() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const play = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
    setIsPlaying(true);
  }, []);

  const pause = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    setIsPlaying(false);
  }, []);

  const handleClick = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  // 同步 video 元素的实际播放状态
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    return () => {
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
    };
  }, []);

  return {
    videoRef,
    isPlaying,
    isHovering: false,
    handleMouseEnter: () => {},
    handleMouseLeave: () => {},
    handleClick,
  };
}
