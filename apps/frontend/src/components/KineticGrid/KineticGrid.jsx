


import { useEffect, useRef, useCallback } from "react";

const LERP_SPEED = 0.08;
const LINE_BASE = { r: 255, g: 255, b: 255, a: 0.07 };

// إعدادات الشبكة حسب عرض الشاشة: على الموبايل خلايا أكبر ونقط أقل = أداء أحسن
function getGridConfig(width) {
  if (width < 640) {
    return { cell: 78, influence: 130, maxWarp: 12, dotSpacing: 44 };
  }
  if (width < 1024) {
    return { cell: 65, influence: 180, maxWarp: 15, dotSpacing: 36 };
  }
  return { cell: 55, influence: 220, maxWarp: 18, dotSpacing: 30 };
}

function lerpN(a, b, t) {
  return a + (b - a) * t;
}
function lerpColor(base, active, t) {
  const r = Math.round(lerpN(base.r, active.r, t));
  const g = Math.round(lerpN(base.g, active.g, t));
  const b = Math.round(lerpN(base.b, active.b, t));
  const a = lerpN(base.a, active.a, t);
  return `rgba(${r},${g},${b},${a.toFixed(3)})`;
}



const THEME = {
  lineActive: { r: 42, g: 49, b: 122, a: 0.5 },
  nodeActive: { r: 42, g: 49, b: 122, a: 1 },
  glow: "42,49,122",
  ripple: "42,49,122",
};

export default function KineticGrid({ children, className = "", contentClassName = "" }) {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const targetMouseRef = useRef({ x: -9999, y: -9999 });
  const ripplesRef = useRef([]);
  const rafRef = useRef(0);
  const sizeRef = useRef({ w: 0, h: 0 });
  const configRef = useRef(getGridConfig(typeof window === "undefined" ? 1280 : window.innerWidth));

  const getWarpedPoint = useCallback(
    (gx, gy, col, row, mouse, ripples, cols, rows) => {
      const { influence, maxWarp } = configRef.current;
      const edgeMargin = 1.5;
      const colPin = Math.min(col / edgeMargin, (cols - 1 - col) / edgeMargin, 1);
      const rowPin = Math.min(row / edgeMargin, (rows - 1 - row) / edgeMargin, 1);
      const pinFactor = colPin * colPin * rowPin * rowPin;

      const dx = gx - mouse.x;
      const dy = gy - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const proximity = Math.max(0, 1 - dist / influence) * pinFactor;

      let rx = 0,
        ry = 0;
      for (const r of ripples) {
        const rdx = gx - r.x;
        const rdy = gy - r.y;
        const rdist = Math.sqrt(rdx * rdx + rdy * rdy);
        const waveWidth = 55;
        const diff = rdist - r.radius;
        if (Math.abs(diff) < waveWidth) {
          const strength = (1 - Math.abs(diff) / waveWidth) * r.opacity * 18 * pinFactor;
          const angle = Math.atan2(rdy, rdx);
          const sign = diff < 0 ? -1 : 1;
          rx += Math.cos(angle) * strength * sign * -1;
          ry += Math.sin(angle) * strength * sign * -1;
        }
      }

      if (dist < influence && dist > 0 && pinFactor > 0) {
        const t = dist / influence;
        const eased = t < 0.01 ? 0 : (1 - t) * (1 - t) * Math.min(1, dist / 60);
        const warpAmt = eased * maxWarp * pinFactor;
        const angle = Math.atan2(dy, dx);
        return {
          pt: {
            x: gx - Math.cos(angle) * warpAmt + rx,
            y: gy - Math.sin(angle) * warpAmt + ry,
          },
          proximity,
        };
      }
      return { pt: { x: gx + rx, y: gy + ry }, proximity };
    },
    []
  );

  const draw = useCallback(
    (now) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const { w: W, h: H } = sizeRef.current;
      if (!W || !H) return;
      const { cell, dotSpacing } = configRef.current;
      const mouse = mouseRef.current;
      const ripples = ripplesRef.current;

      ctx.clearRect(0, 0, W, H);

      ctx.fillStyle = "rgba(255,255,255,0.035)";
      for (let x = dotSpacing / 2; x < W; x += dotSpacing) {
        for (let y = dotSpacing / 2; y < H; y += dotSpacing) {
          ctx.beginPath();
          ctx.arc(x, y, 0.7, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        const age = (now - r.born) / 1000;
        r.radius = Math.max(0, age * 400);
        r.opacity = Math.max(0, 1 - age * 1.2);
        if (r.opacity <= 0) ripples.splice(i, 1);
      }

      const cols = Math.max(2, Math.ceil(W / cell)) + 1;
      const rows = Math.max(2, Math.ceil(H / cell)) + 1;
      const cellW = W / (cols - 1);
      const cellH = H / (rows - 1);

      const pts = [];
      const prox = [];
      for (let row = 0; row < rows; row++) {
        pts[row] = [];
        prox[row] = [];
        for (let col = 0; col < cols; col++) {
          const { pt, proximity } = getWarpedPoint(
            col * cellW,
            row * cellH,
            col,
            row,
            mouse,
            ripples,
            cols,
            rows
          );
          pts[row][col] = pt;
          prox[row][col] = proximity;
        }
      }

      const drawSeg = (p1, p2, pr1, pr2) => {
        const avg = (pr1 + pr2) / 2;
        const t = avg * avg * (3 - 2 * avg);
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = lerpColor(LINE_BASE, THEME.lineActive, t);
        ctx.lineWidth = lerpN(0.8, 1.5, t);
        ctx.stroke();
      };

      ctx.lineCap = "butt";
      for (let row = 0; row < rows; row++)
        for (let col = 0; col < cols - 1; col++)
          drawSeg(pts[row][col], pts[row][col + 1], prox[row][col], prox[row][col + 1]);
      for (let col = 0; col < cols; col++)
        for (let row = 0; row < rows - 1; row++)
          drawSeg(pts[row][col], pts[row + 1][col], prox[row][col], prox[row + 1][col]);

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const p = pts[row][col];
          const pr = prox[row][col];
          const t = pr * pr * (3 - 2 * pr);
          const r = lerpN(1.8, 3.2, t);

          if (t > 0.3) {
            const glowR = r + lerpN(0, 6, (t - 0.3) / 0.7);
            const grd = ctx.createRadialGradient(p.x, p.y, r * 0.5, p.x, p.y, glowR);
            grd.addColorStop(0, `rgba(${THEME.glow},${(t * 0.3).toFixed(3)})`);
            grd.addColorStop(1, `rgba(${THEME.glow},0)`);
            ctx.beginPath();
            ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2);
            ctx.fillStyle = grd;
            ctx.fill();
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
          ctx.fillStyle = lerpColor({ r: 255, g: 255, b: 255, a: 0.12 }, THEME.nodeActive, t);
          ctx.fill();
        }
      }

      for (const r of ripples) {
        const safeRadius = Math.max(0, r.radius);
        ctx.beginPath();
        ctx.arc(r.x, r.y, safeRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${THEME.ripple},${(r.opacity * 0.25).toFixed(3)})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    },
    [getWarpedPoint]
  );

  const animate = useCallback(
    (now) => {
      const m = mouseRef.current;
      const t = targetMouseRef.current;
      m.x = lerpN(m.x, t.x, LERP_SPEED);
      m.y = lerpN(m.y, t.y, LERP_SPEED);
      draw(now);
      rafRef.current = requestAnimationFrame(animate);
    },
    [draw]
  );

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    const setSize = () => {
      const rect = wrapper.getBoundingClientRect();
      // على الموبايل نقلّل الـ DPR شوية عشان الأداء
      const dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 640 ? 1.5 : 2);

      configRef.current = getGridConfig(window.innerWidth);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      const ctx = canvas.getContext("2d");
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      sizeRef.current = { w: rect.width, h: rect.height };
    };

    setSize();

    // بيراقب حجم الـ wrapper نفسه (السيكشن) مش الشاشة كلها
    const resizeObserver = new ResizeObserver(setSize);
    resizeObserver.observe(wrapper);

    if (reduceMotion) {
      draw(performance.now());
      return () => resizeObserver.disconnect();
    }

    const onPointerMove = (e) => {
      // اللمس بيتجاهل الـ warp عشان ما يتعارضش مع السحب والسكرول
      if (e.pointerType === "touch") return;
      const rect = wrapper.getBoundingClientRect();
      targetMouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onPointerLeave = () => {
      targetMouseRef.current = { x: -9999, y: -9999 };
    };
    const addRipple = (clientX, clientY) => {
      const rect = wrapper.getBoundingClientRect();
      ripplesRef.current.push({
        x: clientX - rect.left,
        y: clientY - rect.top,
        radius: 0,
        opacity: 1,
        born: performance.now(),
      });
    };
    const onClick = (e) => addRipple(e.clientX, e.clientY);
    const onTouchStart = (e) => {
      const touch = e.touches[0];
      if (touch) addRipple(touch.clientX, touch.clientY);
    };

    wrapper.addEventListener("pointermove", onPointerMove);
    wrapper.addEventListener("pointerleave", onPointerLeave);
    wrapper.addEventListener("click", onClick);
    wrapper.addEventListener("touchstart", onTouchStart, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      resizeObserver.disconnect();
      wrapper.removeEventListener("pointermove", onPointerMove);
      wrapper.removeEventListener("pointerleave", onPointerLeave);
      wrapper.removeEventListener("click", onClick);
      wrapper.removeEventListener("touchstart", onTouchStart);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [animate, draw]);

return (
  <div ref={wrapperRef} className={`relative w-full h-full overflow-hidden ${className}`}>
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
    <div className={`relative z-10 w-full h-full ${contentClassName}`}>{children}</div>
  </div>
);
}

