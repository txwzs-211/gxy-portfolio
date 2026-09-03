import { useEffect, useRef } from 'react';

/**
 * WarpTunnel — 穿越通道动效
 * 用 Canvas 2D 绘制从中心向外辐射的彩色射线隧道
 * 放在 Projects 和 Footer 之间，滚动到视口时触发
 */
export default function WarpTunnel() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let cx = 0;
    let cy = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      cx = width / 2;
      cy = height / 2;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    // 射线配置 — 统一为站点蓝紫主题色
    const RAY_COUNT = 180;
    const colors = ['#7c6aff', '#38bdf8', '#c084fc', '#a855f7'];
    const rays = [];
    for (let i = 0; i < RAY_COUNT; i++) {
      rays.push({
        angle: (i / RAY_COUNT) * Math.PI * 2,
        angleSpeed: 0.0002 + Math.random() * 0.0008,
        radius: 50 + Math.random() * 400,
        radiusSpeed: 0.5 + Math.random() * 2,
        length: 30 + Math.random() * 120,
        thickness: 0.5 + Math.random() * 1.5,
        colorIdx: i % colors.length,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // 浮动光环
    const rings = [];
    for (let i = 0; i < 6; i++) {
      rings.push({
        rx: 100 + i * 80,
        ry: 60 + i * 50,
        rotation: Math.random() * Math.PI,
        rotSpeed: 0.001 + Math.random() * 0.002,
        opacity: 0.08 + Math.random() * 0.15,
        colorIdx: i % colors.length,
      });
    }

    startTimeRef.current = performance.now();

    const draw = (now) => {
      const t = (now - startTimeRef.current) / 1000;

      // 背景渐变（深空感）
      const bgGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(width, height) * 0.7);
      bgGrad.addColorStop(0, '#0a0e27');
      bgGrad.addColorStop(0.5, '#050813');
      bgGrad.addColorStop(1, '#000000');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 绘制浮动椭圆光环
      rings.forEach((ring) => {
        ring.rotation += ring.rotSpeed;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(ring.rotation);
        ctx.strokeStyle = colors[ring.colorIdx];
        ctx.globalAlpha = ring.opacity * (0.6 + 0.4 * Math.sin(t * 0.8 + ring.rotation));
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(0, 0, ring.rx, ring.ry, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      });
      ctx.globalAlpha = 1;

      // 中心光晕
      const centerGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 80);
      centerGlow.addColorStop(0, 'rgba(0, 212, 255, 0.4)');
      centerGlow.addColorStop(0.5, 'rgba(168, 85, 247, 0.2)');
      centerGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = centerGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, 80, 0, Math.PI * 2);
      ctx.fill();

      // 绘制射线
      rays.forEach((ray) => {
        ray.angle += ray.angleSpeed;
        ray.radius += ray.radiusSpeed;
        // 循环：超出最大半径后重置到中心
        const maxR = Math.max(width, height) * 0.6;
        if (ray.radius > maxR) {
          ray.radius = 30 + Math.random() * 50;
        }

        const pulse = 0.5 + 0.5 * Math.sin(t * 2 + ray.phase);
        const x1 = cx + Math.cos(ray.angle) * ray.radius;
        const y1 = cy + Math.sin(ray.angle) * ray.radius;
        const x2 = cx + Math.cos(ray.angle) * (ray.radius + ray.length);
        const y2 = cy + Math.sin(ray.angle) * (ray.radius + ray.length);

        const grad = ctx.createLinearGradient(x1, y1, x2, y2);
        const color = colors[ray.colorIdx];
        grad.addColorStop(0, `${color}00`);
        grad.addColorStop(0.5, `${color}${Math.floor(pulse * 200).toString(16).padStart(2, '0')}`);
        grad.addColorStop(1, `${color}00`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = ray.thickness;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      });

      // 中心亮点脉冲
      const pulseR = 4 + 2 * Math.sin(t * 3);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.beginPath();
      ctx.arc(cx, cy, pulseR, 0, Math.PI * 2);
      ctx.fill();

      rafRef.current = requestAnimationFrame(draw);
    };

    // IntersectionObserver: 只在可见时运行
    let isVisible = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !rafRef.current) {
          rafRef.current = requestAnimationFrame(draw);
        } else if (!isVisible && rafRef.current) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
      },
      { threshold: 0.05 }
    );
    io.observe(canvas);

    return () => {
      window.removeEventListener('resize', resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      io.disconnect();
    };
  }, []);

  return (
    <section className="warp-tunnel section">
      <canvas ref={canvasRef}></canvas>
      <div className="warp-tunnel-text">
        <div className="warp-tunnel-text-main">EXPLORE</div>
        <div className="warp-tunnel-text-sub">Continue Scrolling</div>
      </div>
    </section>
  );
}
