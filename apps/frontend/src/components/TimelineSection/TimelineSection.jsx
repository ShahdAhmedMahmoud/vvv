import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// غيّري السنين والعناوين والصور دي بتاريخ الشركة الحقيقي
const milestones = [
  {
    year: "2010",
    title: "The Beginning",
    description:
      "alshorouk Construction & Supply was founded with a vision to build Egypt's future, starting with residential projects.",
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1600&auto=format&fit=crop",
  },
  {
    year: "2015",
    title: "First Major Project",
    description:
      "Delivered our first large-scale commercial development, establishing our reputation for quality and reliability.",
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=1600&auto=format&fit=crop",
  },
  {
    year: "2019",
    title: "Regional Expansion",
    description:
      "Expanded operations to cover infrastructure and industrial projects across multiple governorates.",
    image:
      "https://images.unsplash.com/photo-1541976590-713941681591?q=80&w=1600&auto=format&fit=crop",
  },
  {
    year: "2022",
    title: "New Capital Ventures",
    description:
      "Broke ground on flagship projects in the New Administrative Capital, marking a new era of growth.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
  },
  {
    year: "2025",
    title: "Today",
    description:
      "A trusted name in Egyptian construction, with dozens of active and delivered projects nationwide.",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1600&auto=format&fit=crop",
  },
];

const AUTO_ADVANCE_MS = 6000;

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture1, uTexture2;
  uniform float uProgress;
  uniform vec2 uResolution, uTexture1Size, uTexture2Size;
  varying vec2 vUv;

  vec2 getCoverUV(vec2 uv, vec2 textureSize) {
    vec2 s = uResolution / textureSize;
    float scale = max(s.x, s.y);
    vec2 scaledSize = textureSize * scale;
    vec2 offset = (uResolution - scaledSize) * 0.5;
    return (uv * uResolution - offset) / scaledSize;
  }

  void main() {
    vec2 uv1 = getCoverUV(vUv, uTexture1Size);
    vec2 uv2 = getCoverUV(vUv, uTexture2Size);

    float maxR = length(uResolution) * 0.85;
    float br = uProgress * maxR;
    vec2 p = vUv * uResolution;
    vec2 c = uResolution * 0.5;
    float d = length(p - c);
    float nd = d / max(br, 0.001);
    float param = smoothstep(br + 3.0, br - 3.0, d);

    vec4 img;
    if (param > 0.0) {
      float ro = 0.08 * pow(smoothstep(0.3, 1.0, nd), 1.5);
      vec2 dir = (d > 0.0) ? (p - c) / d : vec2(0.0);
      vec2 distUV = uv2 - dir * ro;
      distUV += vec2(sin(uProgress * 5.0 + nd * 10.0), cos(uProgress * 4.0 + nd * 8.0)) * 0.015 * nd * param;
      float ca = 0.02 * pow(smoothstep(0.3, 1.0, nd), 1.2);
      img = vec4(
        texture2D(uTexture2, distUV + dir * ca * 1.2).r,
        texture2D(uTexture2, distUV + dir * ca * 0.2).g,
        texture2D(uTexture2, distUV - dir * ca * 0.8).b,
        1.0
      );
      float rim = smoothstep(0.95, 1.0, nd) * (1.0 - smoothstep(1.0, 1.01, nd));
      img.rgb += rim * 0.08;
    } else {
      img = texture2D(uTexture2, uv2);
    }

    vec4 oldImg = texture2D(uTexture1, uv1);
    gl_FragColor = mix(oldImg, img, param);
  }
`;

export default function TimelineSection() {
  const canvasRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const sceneRef = useRef({});
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // تهيئة WebGL مرة واحدة بس
  useEffect(() => {
    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false });

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTexture1: { value: null },
        uTexture2: { value: null },
        uProgress: { value: 0 },
        uResolution: { value: new THREE.Vector2(1, 1) },
        uTexture1Size: { value: new THREE.Vector2(1, 1) },
        uTexture2Size: { value: new THREE.Vector2(1, 1) },
      },
      vertexShader,
      fragmentShader,
    });
    scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material));

    const setSize = () => {
      const { clientWidth: w, clientHeight: h } = canvas.parentElement;
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      material.uniforms.uResolution.value.set(w, h);
    };
    setSize();
    window.addEventListener("resize", setSize);

    const loader = new THREE.TextureLoader();
    const textures = [];
    milestones.forEach((m, i) => {
      loader.load(m.image, (tex) => {
        tex.minFilter = tex.magFilter = THREE.LinearFilter;
        tex.userData = { size: new THREE.Vector2(tex.image.width, tex.image.height) };
        textures[i] = tex;
        if (i === 0) {
          material.uniforms.uTexture1.value = tex;
          material.uniforms.uTexture1Size.value = tex.userData.size;
          material.uniforms.uTexture2.value = tex;
          material.uniforms.uTexture2Size.value = tex.userData.size;
        }
      });
    });

    let frameId;
    const renderLoop = () => {
      frameId = requestAnimationFrame(renderLoop);
      renderer.render(scene, camera);
    };
    renderLoop();

    sceneRef.current = { material, textures };

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", setSize);
      renderer.dispose();
    };
  }, []);

  // انيميشن النص كل ما الـ index يتغيّر
  useGSAP(() => {
    gsap.fromTo(titleRef.current, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" });
    gsap.fromTo(descRef.current, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, delay: 0.1, ease: "power3.out" });
  }, [activeIndex]);

  const goTo = (index) => {
    const { material, textures } = sceneRef.current;
    if (!material || isTransitioning || index === activeIndex || !textures[index]) return;

    setIsTransitioning(true);
    material.uniforms.uTexture1.value = material.uniforms.uTexture2.value;
    material.uniforms.uTexture1Size.value = material.uniforms.uTexture2Size.value;
    material.uniforms.uTexture2.value = textures[index];
    material.uniforms.uTexture2Size.value = textures[index].userData.size;

    gsap.fromTo(
      material.uniforms.uProgress,
      { value: 0 },
      {
        value: 1,
        duration: 2,
        ease: "power2.inOut",
        onComplete: () => {
          material.uniforms.uProgress.value = 0;
          material.uniforms.uTexture1.value = textures[index];
          material.uniforms.uTexture1Size.value = textures[index].userData.size;
          setIsTransitioning(false);
        },
      }
    );
    setActiveIndex(index);
  };

  // تقدّم تلقائي كل 6 ثواني
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isTransitioning) goTo((activeIndex + 1) % milestones.length);
    }, AUTO_ADVANCE_MS);
    return () => clearTimeout(timer);
  }, [activeIndex, isTransitioning]);

  return (

    
    <section className="relative w-full h-[600px] md:h-[700px] overflow-hidden rounded-2xl bg-[#1E2432]" id ="timeline">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1E2432]/90 via-[#1E2432]/40 to-transparent pointer-events-none" />

      <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-14">
        <span className="text-[#D98A2B] font-semibold tracking-wide mb-2">
          {milestones[activeIndex].year}
        </span>
        <h3 ref={titleRef} className="text-3xl md:text-5xl font-bold text-white mb-3">
          {milestones[activeIndex].title}
        </h3>
        <p ref={descRef} className="text-white/80 max-w-lg mb-8">
          {milestones[activeIndex].description}
        </p>

        <div className="flex gap-3 overflow-x-auto pb-1">
          {milestones.map((m, i) => (
            <button
              key={m.year}
              onClick={() => goTo(i)}
              className={`flex-shrink-0 text-left px-4 py-2 rounded-lg border transition-colors ${
                i === activeIndex ? "border-[#D98A2B] bg-white/10" : "border-white/20 hover:border-white/40"
              }`}
            >
              <div className="h-0.5 bg-white/20 w-16 mb-2 relative overflow-hidden rounded-full">
                {i === activeIndex && (
                  <div
                    key={activeIndex}
                    className="absolute inset-y-0 left-0 bg-[#D98A2B] animate-progress-fill"
                  />
                )}
              </div>
              <span className="text-white text-sm font-medium whitespace-nowrap">{m.year}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}