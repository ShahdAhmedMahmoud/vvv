import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* =========================================================================
   BuildNext · Saw-Cut Hero (React port)
   -------------------------------------------------------------------------
   Ported from the vanilla "cut-scene" hero: a saw slides in, plunges down a
   jagged vertical line, and the section splits into two pieces that pull
   apart — with dust, sparks and concrete chips thrown as it cuts.

   Palette pulled from the project's CTA section:
     yellow  #FFBF00   accent / blade sparks
     navy    #1F3888   cool accent (guard, corner details)
     ink     #1E2432   section background
     paper   #F8F9FD   page background around the section

   Driven by GSAP + ScrollTrigger (matches the rest of the project) instead
   of a manual rAF loop — a single proxy tween drives `sample()` + `render()`
   exactly the way the vanilla controller's timeline did.
   ========================================================================= */

/* ---------- Config ---------- */

const COLORS = {
  yellow: "#FFBF00",
  yellowHi: "#ffd76a",
  navy: "#1F3888",
  ink: "#1E2432",
  paper: "#F8F9FD",
};

const HERO_PHOTO =
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2000&q=75";

const SAW = { anchorX: 110, anchorY: 500, bladeR: 90, boxH: 600, boxW: 300 };

const TIMING = {
  approach: 1.1, // seconds, saw slides in right -> left
  align: 0.25,
  plungePerPx: 0.0019,
  plungeMin: 1.4,
  plungeMax: 2.4,
  hold: 0.2,
  lift: 0.8,
  exitDelay: 0.5,
  exit: 0.85,
  separate: 1.2,
};

const FX = { maxParticles: 220 };

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const rand = (a, b) => a + Math.random() * (b - a);
const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
const easeInCubic = (t) => t * t * t;
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeInOutSine = (t) => -(Math.cos(Math.PI * t) - 1) / 2;
const easeOutBack = (t, k = 1) => 1 + (k + 1) * Math.pow(t - 1, 3) + k * Math.pow(t - 1, 2);

const mulberry32 = (seed) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const scopedStyles = `
  @keyframes bnBladeSpin { to { transform: rotate(360deg); } }
  @keyframes bnDustDrift {
    0%   { transform: translate(-50%,-50%) scale(.25); opacity: 0; }
    12%  { opacity: var(--o,.55); }
    100% { transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(var(--s,2)); opacity: 0; }
  }
  @keyframes bnSparkFly {
    0%   { transform: translate(0,0) rotate(var(--rot)) scaleY(1); opacity: 1; }
    55%  { transform: translate(var(--x1),var(--y1)) rotate(var(--rot)) scaleY(.8); opacity: 1; }
    100% { transform: translate(var(--x2),var(--y2)) rotate(var(--rot)) scaleY(.2); opacity: 0; }
  }
  @keyframes bnChipFly {
    0%   { transform: translate(0,0) rotate(0); opacity: 1; }
    45%  { transform: translate(var(--x1),var(--y1)) rotate(calc(var(--r) * .5)); opacity: 1; }
    100% { transform: translate(var(--x2),var(--y2)) rotate(var(--r)); opacity: 0; }
  }
  .bn-dust {
    position: absolute; border-radius: 50%; opacity: 0;
    background: radial-gradient(circle at 42% 40%, rgba(236,231,220,.9), rgba(196,190,178,.55) 42%, rgba(160,156,148,0) 72%);
    animation: bnDustDrift 1400ms cubic-bezier(.2,.65,.3,1) forwards;
  }
  .bn-spark {
    position: absolute; width: 2px; border-radius: 2px; opacity: 0; transform-origin: 50% 0;
    background: linear-gradient(to bottom, #fff 0%, ${COLORS.yellowHi} 28%, ${COLORS.yellow} 68%, rgba(255,120,0,0) 100%);
    box-shadow: 0 0 6px 1px rgba(255,191,0,.6);
    animation: bnSparkFly 600ms cubic-bezier(.15,.7,.35,1) forwards;
  }
  .bn-chip {
    position: absolute; opacity: 0; background: linear-gradient(135deg,#b9bcbf,#6a6e72);
    clip-path: polygon(10% 0,100% 30%,80% 100%,0 70%);
    animation: bnChipFly 900ms cubic-bezier(.2,.6,.4,1) forwards;
  }
  .bn-blade-svg { animation: bnBladeSpin .9s linear infinite; animation-play-state: paused; }
  .bn-saw.is-cutting .bn-blade-svg { animation-play-state: running; }
  .bn-saw.is-visible .bn-blade-svg { animation-play-state: running; }
  @media (prefers-reduced-motion: reduce) {
    .bn-fx { display: none !important; }
  }
`;

/* ---------- Saw artwork, recolored to the project palette ---------- */

function SawSvg({ id }) {
  const grad = `bnGrad-${id}`;
  const hoodGrad = `bnHood-${id}`;
  const steelGrad = `bnSteel-${id}`;
  const flangeGrad = `bnFlange-${id}`;
  const clip = `bnClip-${id}`;

  return (
    <svg viewBox="0 0 300 600" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id={grad} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={COLORS.yellowHi} />
          <stop offset=".5" stopColor={COLORS.yellow} />
          <stop offset="1" stopColor="#9a6c00" />
        </linearGradient>
        <linearGradient id={hoodGrad} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={COLORS.yellowHi} />
          <stop offset=".55" stopColor={COLORS.yellow} />
          <stop offset="1" stopColor="#8a6100" />
        </linearGradient>
        <radialGradient id={steelGrad} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#e5e8eb" />
          <stop offset=".6" stopColor="#a3aab2" />
          <stop offset=".9" stopColor="#7f868d" />
          <stop offset="1" stopColor="#5a6067" />
        </radialGradient>
        <radialGradient id={flangeGrad} cx="40%" cy="35%" r="75%">
          <stop offset="0" stopColor={COLORS.navy} />
          <stop offset="1" stopColor="#101830" />
        </radialGradient>
        <clipPath id={clip}>
          <circle cx="110" cy="500" r="90" />
        </clipPath>
      </defs>

      {/* body */}
      <g>
        <path d="M150 376 L201 156" stroke="#0c0e10" strokeWidth="11" strokeLinecap="round" fill="none" />
        <path d="M150 376 L201 156" stroke="#6b737b" strokeWidth="7" strokeLinecap="round" fill="none" />
        <rect x="194" y="64" width="14" height="292" rx="7" fill="#6b737b" />
        <rect x="124" y="58" width="170" height="14" rx="7" fill="#6b737b" />
        <rect x="122" y="50" width="52" height="30" rx="14" fill="#0d0f11" />
        <rect x="246" y="50" width="52" height="30" rx="14" fill="#0d0f11" />
        <rect x="184" y="46" width="34" height="38" rx="8" fill={`url(#${grad})`} />
        <circle cx="201" cy="65" r="5" fill="#15171a" />
        <rect x="128" y="438" width="136" height="98" rx="24" fill={`url(#${grad})`} />
        <rect x="120" y="340" width="152" height="122" rx="24" fill={`url(#${grad})`} />
        <path d="M128 358 Q196 336 264 358" stroke="#fff" strokeOpacity=".45" strokeWidth="3" fill="none" />
        <g fill="#16110b" opacity=".85">
          <rect x="140" y="368" width="112" height="6" rx="3" />
          <rect x="140" y="380" width="112" height="6" rx="3" />
          <rect x="140" y="392" width="112" height="6" rx="3" />
          <rect x="140" y="404" width="112" height="6" rx="3" />
        </g>
        <rect x="188" y="418" width="78" height="17" rx="3" fill="#0f1114" />
        <text
          x="227"
          y="430"
          textAnchor="middle"
          fontFamily="Inter, Arial, sans-serif"
          fontWeight="800"
          fontSize="8"
          letterSpacing="1.4"
          fill={COLORS.yellow}
        >
          BUILDNEXT
        </text>
        <path d="M128 458h136a20 20 0 0 1-20 12h-96a20 20 0 0 1-20-12z" fill="#15171a" />
      </g>

      {/* front hood + hub, drawn in front of the blade */}
      <g>
        <path d="M13.4 474A100 100 0 0 1 206.6 474Z" fill={`url(#${hoodGrad})`} />
        <path d="M13.4 474A100 100 0 0 1 206.6 474" fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="2.5" />
        <g clipPath={`url(#${clip})`}>
          <rect x="10" y="474" width="200" height="18" fill="rgba(0,0,0,.45)" />
        </g>
        <rect x="13" y="471" width="194" height="6" rx="3" fill="#15171a" />
        <circle cx="110" cy="500" r="17" fill={`url(#${flangeGrad})`} stroke="#0a0b0d" strokeWidth="1.5" />
        <circle cx="110" cy="500" r="9" fill={COLORS.yellow} />
        <circle cx="110" cy="500" r="2.6" fill="#22190a" />
      </g>

      {/* blade, behind the hub cap, in front of the body */}
      <g transform="translate(20 410)">
        <g className="bn-blade-svg" style={{ transformOrigin: "90px 90px" }}>
          <circle cx="90" cy="90" r="83" fill="none" stroke="#2b3035" strokeWidth="14" strokeDasharray="21 5.07" />
          <circle cx="90" cy="90" r="88.5" fill="none" stroke={COLORS.yellow} strokeWidth="3" strokeDasharray="21 5.07" />
          <circle cx="90" cy="90" r="76" fill={`url(#${steelGrad})`} />
          <circle cx="90" cy="90" r="64" fill="none" stroke="#1d2125" strokeWidth="14" strokeDasharray="4.5 29.02" />
          <circle cx="90" cy="90" r="53" fill="none" stroke={COLORS.yellow} strokeOpacity=".85" strokeWidth="2.4" strokeDasharray="38 295" />
          <circle cx="90" cy="90" r="31" fill={`url(#${flangeGrad})`} />
          <circle cx="90" cy="90" r="30" fill="none" stroke={COLORS.yellow} strokeWidth="2" />
          <circle cx="90" cy="90" r="9" fill="#0d0f11" />
        </g>
      </g>
    </svg>
  );
}

/* ---------- Hero content (rendered 3x: source + inside each cut piece) ---------- */

function HeroCopy({ interactive = true }) {
  return (
    <div className="absolute left-6 top-[35%] w-[min(500px,86%)] sm:left-12 md:left-20">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: COLORS.yellow }}>
        البناء والتشييد
      </p>
      <h1 dir="rtl" lang="ar" className="text-right text-[clamp(2rem,4.3vw,4rem)] font-extrabold leading-[1.12] text-white">
        <span className="block">بناء اليوم ..</span>
        <span className="block" style={{ color: COLORS.yellow }}>
          لمستقبل أقوى
        </span>
      </h1>
      <p dir="rtl" lang="ar" className="mt-4 max-w-[20em] text-right text-sm leading-[1.85] text-white/85 sm:text-base">
        نقدم لك حلولاً متكاملة في مجال الإنشاءات والتشييد، بجودة عالية وخبرة تمتد لسنوات.
      </p>
      <a
        href="#contact"
        tabIndex={interactive ? 0 : -1}
        dir="ltr"
        className="mt-6 inline-flex items-center gap-3 rounded-lg px-6 py-3 text-sm font-bold text-[#1E2432] transition-transform duration-200 hover:-translate-y-0.5 sm:text-base"
        style={{ backgroundColor: COLORS.yellow }}
      >
        <span dir="rtl" lang="ar">
          تواصل معنا
        </span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </a>
    </div>
  );
}

/* ---------- Component ---------- */

export default function SawCutHeroSection() {
  const sectionRef = useRef(null);
  const sourceRef = useRef(null);

  const fxRef = useRef(null);
  const sawRef = useRef(null);
  const sawShadowRef = useRef(null);

  const glowRef = useRef(null);
  const cutLineRef = useRef(null);
  const cutGapRef = useRef(null);

  const pieceLeftRef = useRef(null);
  const pieceRightRef = useRef(null);
  const clipLeftRef = useRef(null);
  const clipRightRef = useRef(null);

  const dustLayerRef = useRef(null);
  const sparkLayerRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const geo = { W: 0, H: 0, cutX: 0, scale: 1, R: SAW.bladeR, kerf: 6, HR: 640, sepX: 40 };
    const Edges = { L: [], R: [] };
    const pt = (p) => `${p[0].toFixed(1)}px ${p[1].toFixed(1)}px`;

    function measure() {
      geo.W = section.clientWidth;
      geo.H = section.clientHeight;
      const cutPct = geo.W < 640 ? 0.74 : geo.W < 1024 ? 0.66 : 0.62;
      geo.cutX = Math.round(geo.W * cutPct);
      geo.scale = clamp(geo.W / 1450, 0.58, 1.05);
      geo.R = SAW.bladeR * geo.scale;
      geo.kerf = Math.max(5, Math.round(6 * geo.scale));
      geo.HR = Math.ceil(SAW.boxH * geo.scale + 40);
      geo.sepX = clamp(geo.W * 0.045, 14, 90);
      if (fxRef.current) {
        fxRef.current.style.top = `${-geo.HR}px`;
        fxRef.current.style.bottom = `-150px`;
      }
    }

    function buildEdges() {
      const { H, cutX, kerf, scale } = geo;
      const step = clamp(Math.round(H / 44), 12, 26);
      const rnd = mulberry32(20260921);
      const amp = Math.min(kerf / 2 - 0.6, 1.1 + 1.3 * scale);
      Edges.L = [];
      Edges.R = [];
      for (let y = 0; ; y += step) {
        const yy = Math.min(y, H);
        Edges.L.push([cutX - kerf / 2 + (rnd() * 2 - 1) * amp, yy]);
        Edges.R.push([cutX + kerf / 2 + (rnd() * 2 - 1) * amp, yy]);
        if (yy >= H) break;
      }
    }

    function shapePieces() {
      const { W, H } = geo;
      if (clipLeftRef.current) {
        clipLeftRef.current.style.clipPath = `polygon(0px 0px, ${Edges.L.map(pt).join(", ")}, 0px ${H}px)`;
      }
      if (clipRightRef.current) {
        clipRightRef.current.style.clipPath = `polygon(${Edges.R.map(pt).join(", ")}, ${W}px ${H}px, ${W}px 0px)`;
      }
      if (cutGapRef.current) {
        cutGapRef.current.style.clipPath = `polygon(${Edges.L.map(pt).join(", ")}, ${Edges.R.slice().reverse().map(pt).join(", ")})`;
      }
    }

    function drawCut(px) {
      if (!cutLineRef.current) return;
      cutLineRef.current.style.clipPath = `inset(0 0 ${Math.max(0, geo.H - clamp(px, 0, geo.H)).toFixed(1)}px 0)`;
    }

    function separatePieces(p) {
      const dx = geo.sepX * easeOutBack(p, 0.9);
      const e = easeOutCubic(p);
      const lean = 0.32 * e;
      if (pieceLeftRef.current) {
        pieceLeftRef.current.style.transform = `translate3d(${(-dx).toFixed(2)}px, ${(6 * geo.scale * e).toFixed(2)}px, 0) rotate(${(-lean).toFixed(3)}deg)`;
      }
      if (pieceRightRef.current) {
        pieceRightRef.current.style.transform = `translate3d(${dx.toFixed(2)}px, ${(-3 * geo.scale * e).toFixed(2)}px, 0) rotate(${lean.toFixed(3)}deg)`;
      }
      if (glowRef.current) glowRef.current.style.opacity = clamp(p * 1.6).toFixed(3);
    }

    function placeSaw(f) {
      if (!sawRef.current) return;
      const cy = f.tip - geo.R + geo.HR;
      const tx = f.x + f.jx - SAW.anchorX;
      const ty = cy + f.jy - SAW.anchorY;
      sawRef.current.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0) rotate(${(f.rot + f.jr).toFixed(3)}deg) scale(${geo.scale.toFixed(3)})`;
      sawRef.current.classList.add("is-visible");
      sawRef.current.classList.toggle("is-cutting", f.contact);
      if (sawShadowRef.current) {
        const off = lerp(8, 44, f.depth);
        sawShadowRef.current.style.transform = `translate3d(${(off * 0.7).toFixed(1)}px, ${off.toFixed(1)}px, 0)`;
        sawShadowRef.current.style.opacity = lerp(0.55, 0.32, f.depth).toFixed(2);
      }
    }

    function hideSaw() {
      if (!sawRef.current) return;
      sawRef.current.classList.remove("is-visible", "is-cutting");
      sawRef.current.style.transform = "";
    }

    /* particles */
    const particleCount = () =>
      (dustLayerRef.current?.childElementCount || 0) + (sparkLayerRef.current?.childElementCount || 0);
    const spawnInto = (layer, el, life) => {
      if (!layer) return;
      layer.appendChild(el);
      setTimeout(() => el.remove(), life + 120);
    };
    function spawnDust(x, y, boost = 1, rise = false) {
      const s = geo.scale;
      const size = rand(34, 92) * s * boost;
      const life = rand(1000, 1900);
      const dy = (rise ? rand(-120, -30) : rand(-60, 150)) * s;
      const el = document.createElement("i");
      el.className = "bn-dust";
      el.style.cssText = `left:${x.toFixed(1)}px;top:${y.toFixed(1)}px;width:${size.toFixed(0)}px;height:${size.toFixed(0)}px;--dx:${(rand(-150, 70) * s).toFixed(0)}px;--dy:${dy.toFixed(0)}px;--s:${rand(1.6, 2.9).toFixed(2)};--o:${rand(0.28, 0.62).toFixed(2)};animation-duration:${life.toFixed(0)}ms`;
      spawnInto(dustLayerRef.current, el, life);
    }
    function spawnChip(x, y) {
      const s = geo.scale;
      const life = rand(700, 1100);
      const ang = (rand(-30, 210) * Math.PI) / 180;
      const d = rand(30, 120) * s;
      const el = document.createElement("i");
      el.className = "bn-chip";
      el.style.cssText = `left:${x.toFixed(1)}px;top:${y.toFixed(1)}px;width:${(rand(3, 7) * s).toFixed(1)}px;height:${(rand(3, 6) * s).toFixed(1)}px;--x1:${(Math.cos(ang) * d * 0.6).toFixed(0)}px;--y1:${(Math.sin(ang) * d * 0.6 - 10 * s).toFixed(0)}px;--x2:${(Math.cos(ang) * d).toFixed(0)}px;--y2:${(Math.sin(ang) * d + rand(80, 220) * s).toFixed(0)}px;--r:${rand(-540, 540).toFixed(0)}deg;animation-duration:${life.toFixed(0)}ms`;
      spawnInto(dustLayerRef.current, el, life);
    }
    function spawnSpark(x, y) {
      const s = geo.scale;
      const life = rand(380, 820);
      const a = ((Math.random() < 0.78 ? rand(160, 275) : rand(-40, 30)) * Math.PI) / 180;
      const dist = rand(70, 230) * s;
      const g = rand(60, 190) * s;
      const x1 = Math.cos(a) * dist * 0.55;
      const y1 = Math.sin(a) * dist * 0.55 + g * 0.08;
      const x2 = Math.cos(a) * dist;
      const y2 = Math.sin(a) * dist + g;
      const rot = (Math.atan2(x1, -y1) * 180) / Math.PI;
      const el = document.createElement("i");
      el.className = "bn-spark";
      el.style.cssText = `left:${x.toFixed(1)}px;top:${y.toFixed(1)}px;height:${(rand(9, 22) * s).toFixed(1)}px;--x1:${x1.toFixed(0)}px;--y1:${y1.toFixed(0)}px;--x2:${x2.toFixed(0)}px;--y2:${y2.toFixed(0)}px;--rot:${rot.toFixed(1)}deg;animation-duration:${life.toFixed(0)}ms`;
      spawnInto(sparkLayerRef.current, el, life);
    }
    function clearParticles() {
      if (dustLayerRef.current) dustLayerRef.current.textContent = "";
      if (sparkLayerRef.current) sparkLayerRef.current.textContent = "";
    }

    /* sample(t): pure function of seconds -> saw pose, mirrors the vanilla controller */
    let T = null;
    function timings() {
      const plunge = clamp(geo.H * TIMING.plungePerPx + 0.2, TIMING.plungeMin, TIMING.plungeMax);
      const approachEnd = TIMING.approach;
      const plungeStart = approachEnd + TIMING.align;
      const plungeEnd = plungeStart + plunge;
      const splitStart = plungeEnd + TIMING.hold;
      const exitStart = splitStart + TIMING.exitDelay;
      return {
        approachEnd,
        plungeStart,
        plungeEnd,
        splitStart,
        exitStart,
        end: Math.max(exitStart + TIMING.exit, splitStart + TIMING.separate),
      };
    }

    function sample(t) {
      const { W, H, cutX, scale } = geo;
      const hover = 34 * scale;
      const over = 10 * scale;
      const xIn = W + 230 * scale;
      const xOut = -320 * scale;
      const bob = Math.sin(t * 6.5) * 2.2 * scale;

      let x = cutX;
      let tip = -hover;
      let lean = 0;
      let contact = false;
      let idle = 0.14;

      if (t < T.approachEnd) {
        const p = t / T.approachEnd;
        x = lerp(xIn, cutX, easeOutQuart(p));
        lean = -3.4 * Math.pow(1 - p, 3) + Math.sin(p * 20) * 0.5 * Math.pow(1 - p, 2);
        tip = -hover + bob;
      } else if (t < T.plungeStart) {
        tip = -hover + bob;
      } else if (t < T.splitStart) {
        const p = clamp((t - T.plungeStart) / (T.plungeEnd - T.plungeStart));
        tip = lerp(-hover, H + over, easeInOutSine(p));
        contact = tip > -2 * scale;
        idle = 0;
      } else {
        const lp = clamp((t - T.splitStart) / TIMING.lift);
        tip = lerp(H + over, -hover, easeInOutCubic(lp));
        if (lp >= 1) tip += bob;
        const ep = clamp((t - T.exitStart) / TIMING.exit);
        x = lerp(cutX, xOut, easeInCubic(ep));
        lean = -3.6 * ep;
      }

      const bite = contact ? clamp((tip + 2 * scale) / (26 * scale)) : 0;
      const vib = contact ? 0.3 + 0.7 * bite : idle;
      const jx = (Math.sin(t * 93) + 0.6 * Math.sin(t * 217 + 1.3) + 0.4 * Math.sin(t * 510)) * 1.2 * vib * scale;
      const jy = (Math.sin(t * 117 + 0.6) + 0.5 * Math.sin(t * 290)) * 0.9 * vib * scale;
      const jr = (Math.sin(t * 131 + 2.1) + 0.5 * Math.sin(t * 370)) * 0.28 * vib;

      return { x, tip, rot: lean, jx, jy, jr, contact, depth: clamp(1 - (tip + 4 * scale) / (46 * scale)) };
    }

    let maxTip = -1e9;
    let split = false;
    let wasContact = false;
    let bottomBurst = false;
    let dustAcc = 0;
    let sparkAcc = 0;
    let chipAcc = 0;
    let mouthAcc = 0;
    let splitAcc = 0;
    let lastEmitT = 0;

    function emit(f, dt, sepP) {
      const { H, HR, cutX, scale } = geo;
      const busy = particleCount() > FX.maxParticles;
      const step = (acc, perSec) => acc + (dt * perSec) / 1000;

      if (f.contact && !busy) {
        const tipY = clamp(f.tip, 0, H + 6 * scale) + HR;
        const px = () => cutX + rand(-5, 5) * scale;

        if (!wasContact) {
          for (let i = 0; i < 14; i++) spawnDust(cutX + rand(-10, 10) * scale, tipY, 1.15);
          for (let i = 0; i < 12; i++) spawnSpark(cutX, tipY);
        }
        if (!bottomBurst && f.tip >= H) {
          bottomBurst = true;
          for (let i = 0; i < 16; i++) spawnDust(cutX + rand(-14, 14) * scale, tipY, 1.3);
          for (let i = 0; i < 14; i++) spawnSpark(cutX, tipY);
        }

        dustAcc = step(dustAcc, 78);
        while (dustAcc >= 1) {
          spawnDust(px(), tipY, 1);
          dustAcc--;
        }
        sparkAcc = step(sparkAcc, 62);
        while (sparkAcc >= 1) {
          spawnSpark(cutX + rand(-3, 3) * scale, tipY);
          sparkAcc--;
        }
        chipAcc = step(chipAcc, 16);
        while (chipAcc >= 1) {
          spawnChip(px(), tipY);
          chipAcc--;
        }
        if (f.tip > 60 * scale) {
          mouthAcc = step(mouthAcc, 10);
          while (mouthAcc >= 1) {
            spawnDust(px(), HR + rand(-2, 6), 0.7, true);
            mouthAcc--;
          }
        }
      }
      wasContact = f.contact;

      if (split && sepP < 0.4 && !busy) {
        splitAcc = step(splitAcc, 46);
        while (splitAcc >= 1) {
          spawnDust(cutX + rand(-10, 10) * scale, HR + rand(0.05, 0.95) * H, 0.8);
          splitAcc--;
        }
      }
    }

    function render(t) {
      const f = sample(t);
      const dt = Math.max(0, (t - lastEmitT) * 1000);
      lastEmitT = t;

      placeSaw(f);

      maxTip = Math.max(maxTip, f.tip);
      if (t >= T.splitStart) maxTip = Math.max(maxTip, geo.H);
      drawCut(maxTip);

      if (!split && t >= T.splitStart) {
        split = true;
        section.classList.add("bn-is-split");
        for (let i = 0; i < 18; i++) spawnDust(geo.cutX + rand(-8, 8) * geo.scale, geo.HR + rand(0.04, 0.96) * geo.H, 0.9);
      }
      const sepP = split ? clamp((t - T.splitStart) / TIMING.separate) : 0;
      if (split) separatePieces(sepP);

      emit(f, dt, sepP);
    }

    function resetScene() {
      maxTip = -1e9;
      split = false;
      wasContact = false;
      bottomBurst = false;
      dustAcc = sparkAcc = chipAcc = mouthAcc = splitAcc = 0;
      lastEmitT = 0;
      section.classList.remove("bn-is-split", "bn-is-armed");
      hideSaw();
      if (pieceLeftRef.current) pieceLeftRef.current.style.transform = "";
      if (pieceRightRef.current) pieceRightRef.current.style.transform = "";
      if (glowRef.current) glowRef.current.style.opacity = "0";
      drawCut(0);
      clearParticles();
    }

    function layout() {
      measure();
      buildEdges();
      shapePieces();
    }

    const ctx = gsap.context(() => {
      layout();
      resetScene();

      if (reduceMotion) {
        // static fallback: no cut, just show the intact hero
        return;
      }

      section.classList.add("bn-is-armed");
      T = timings();

      const proxy = { t: 0 };
      const tween = gsap.to(proxy, {
        t: T.end,
        duration: T.end,
        ease: "none",
        paused: true,
        onUpdate: () => render(proxy.t),
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top 78%",
        once: true,
        onEnter: () => tween.play(0),
      });

      const onResize = () => {
        // Keep the piece geometry correct on resize; the animation itself
        // only ever plays once, so we just re-shape whatever state we're in.
        layout();
        if (split) separatePieces(1);
        drawCut(split ? geo.H : maxTip);
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate h-[max(640px,100svh)] w-full overflow-hidden"
      style={{ backgroundColor: COLORS.ink }}
      aria-labelledby="bnHeroTitle"
    >
      <style>{scopedStyles}</style>

      {/* glow seen through the gap before/while the pieces part */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-y-0 z-0 w-[min(46vw,520px)] opacity-0"
        style={{
          left: "calc(62% - min(23vw,260px))",
          background: `radial-gradient(ellipse 34% 62% at 50% 56%, rgba(255,191,0,.75), rgba(255,140,20,.24) 46%, transparent 74%)`,
        }}
      />

      {/* (1) intact source content — hidden once the scene splits */}
      <div ref={sourceRef} className="absolute inset-0 z-[1] [.bn-is-split_&]:opacity-0">
        <SectionBackground />
        <HeroCopy />
        <h1 id="bnHeroTitle" className="sr-only">
          بناء اليوم .. لمستقبل أقوى
        </h1>
      </div>

      {/* (2)/(3) left + right pieces */}
      <div
        ref={pieceLeftRef}
        className="pointer-events-none invisible absolute inset-0 z-[2] [.bn-is-armed_&]:visible [.bn-is-armed_&]:opacity-[.01] [.bn-is-split_&]:visible [.bn-is-split_&]:opacity-100"
        style={{ transformOrigin: "0 100%", filter: "drop-shadow(0 0 16px rgba(0,0,0,.65))" }}
      >
        <div ref={clipLeftRef} className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0">
            <SectionBackground />
            <HeroCopy interactive={false} />
          </div>
        </div>
      </div>
      <div
        ref={pieceRightRef}
        className="pointer-events-none invisible absolute inset-0 z-[2] [.bn-is-armed_&]:visible [.bn-is-armed_&]:opacity-[.01] [.bn-is-split_&]:visible [.bn-is-split_&]:opacity-100"
        style={{ transformOrigin: "100% 100%", filter: "drop-shadow(0 0 16px rgba(0,0,0,.65))" }}
      >
        <div ref={clipRightRef} className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0">
            <SectionBackground />
            <HeroCopy interactive={false} />
          </div>
        </div>
      </div>

      {/* (8) cut line / kerf */}
      <div
        ref={cutLineRef}
        className="pointer-events-none absolute inset-0 z-[4]"
        style={{ clipPath: "inset(0 0 100% 0)" }}
      >
        <div ref={cutGapRef} className="absolute inset-0" style={{ backgroundColor: "#030405" }} />
      </div>

      {/* fx layer: saw + particles, taller than the section */}
      <div ref={fxRef} className="bn-fx pointer-events-none absolute left-0 right-0 z-[5] overflow-hidden">
        <div
          ref={sawRef}
          className="bn-saw invisible absolute left-0 top-0 h-[600px] w-[300px] will-change-transform"
          style={{ transformOrigin: `${SAW.anchorX}px ${SAW.anchorY}px` }}
        >
          <div ref={sawShadowRef} className="absolute inset-0 opacity-40 blur-[7px]" style={{ filter: "brightness(0)" }}>
            <SawSvg id="shadow" />
          </div>
          <SawSvg id="main" />
        </div>

        <div ref={dustLayerRef} className="absolute inset-0" />
        <div ref={sparkLayerRef} className="absolute inset-0" />
      </div>
    </section>
  );
}

/* ---------- Background: photo + palette-matched shading ---------- */

function SectionBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-[center_42%]"
        style={{
          backgroundImage: `url(${HERO_PHOTO})`,
          filter: "grayscale(.25) contrast(1.05) brightness(.68) saturate(.9)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(to bottom, rgba(30,36,50,.65) 0%, rgba(30,36,50,0) 24%),
            linear-gradient(to right, rgba(30,36,50,.82) 0%, rgba(30,36,50,.46) 42%, rgba(30,36,50,.05) 72%),
            linear-gradient(to top, rgba(30,36,50,.9) 0%, rgba(30,36,50,0) 26%),
            radial-gradient(120% 90% at 60% 55%, transparent 55%, rgba(15,18,26,.55))
          `,
        }}
      />
    </div>
  );
}