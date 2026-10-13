

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { useHeroSlides } from "../../features/marketing/MarketingProvider";

const AUTOPLAY_MS = 10000;

export default function Hero() {
  const slides = useHeroSlides();
  const [activeIndex, setActiveIndex] = useState(0);
  const [panoramaFailed, setPanoramaFailed] = useState(false);
  const viewerRef = useRef(null);
  const panoramaInstance = useRef(null);
  const autoplayRef = useRef(null);

  const activeSlide = slides[activeIndex];

  // ✅ تشغيل/إعادة ضبط التايمر التلقائي - بينادى أول ما الصفحة تفتح
  // وكل مرة المستخدم يدوس على دوت يدوي (عشان الدورة تبدأ من جديد وميحصلش
  // قفزة غريبة في التوقيت)
  const restartAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    if (!slides.length) return;
    autoplayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, AUTOPLAY_MS);
  }, [slides.length]);

  useEffect(() => {
    restartAutoplay();
    return () => clearInterval(autoplayRef.current);
  }, [restartAutoplay]);

  useEffect(() => {
    if (!activeSlide || activeSlide.type !== "panorama") return;
    const container = viewerRef.current;
    if (!container) return;

    let disposed = false;
    let animationId = 0;
    const removeListeners = [];

    const start = () => {
      if (disposed) return;
      setPanoramaFailed(false);

      let renderer;
      try {
        renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: false,
          preserveDrawingBuffer: false,
          powerPreference: "default",
        });
      } catch {
        if (!disposed) setPanoramaFailed(true);
        return;
      }
      const gl = renderer.getContext();
      if (!gl) {
        renderer.dispose();
        if (!disposed) setPanoramaFailed(true);
        return;
      }

      const canvas = renderer.domElement;
      // Fixed to the hero rectangle so Firefox presents every WebGL frame.
      // An overflow or will-change ancestor keeps the first frame only.
      canvas.style.position = "fixed";
      canvas.style.zIndex = "0";
      canvas.style.display = "block";
      canvas.style.touchAction = "none";
      canvas.style.margin = "0";
      container.replaceChildren(canvas);

      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(70, 1, 0.1, 1100);
      const geometry = new THREE.SphereGeometry(500, 64, 40);
      geometry.scale(-1, 1, 1);
      const material = new THREE.MeshBasicMaterial({
        color: 0x404041,
        side: THREE.DoubleSide,
      });
      scene.add(new THREE.Mesh(geometry, material));

      const loader = new THREE.TextureLoader();
      loader.load(
        activeSlide.src,
        (texture) => {
          if (disposed) {
            texture.dispose();
            return;
          }
          const maxSize = renderer.capabilities.maxTextureSize || 4096;
          const image = texture.image;
          if (image && (image.width > maxSize || image.height > maxSize)) {
            const scale = Math.min(maxSize / image.width, maxSize / image.height);
            const copy = document.createElement("canvas");
            copy.width = Math.max(2, Math.floor(image.width * scale));
            copy.height = Math.max(2, Math.floor(image.height * scale));
            copy.getContext("2d").drawImage(image, 0, 0, copy.width, copy.height);
            texture.image = copy;
            texture.needsUpdate = true;
          }
          texture.colorSpace = THREE.SRGBColorSpace;
          texture.generateMipmaps = false;
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;
          texture.needsUpdate = true;
          material.map = texture;
          material.color.set(0xffffff);
          material.needsUpdate = true;
        },
        undefined,
        () => {
          if (!disposed) setPanoramaFailed(true);
        }
      );

      let lon = 180;
      let lat = 0;
      let dragging = false;
      let lastX = 0;
      let lastY = 0;
      let placedLeft = Number.NaN;
      let placedTop = Number.NaN;
      let placedWidth = 0;
      let placedHeight = 0;

      const syncCanvas = () => {
        const rect = container.getBoundingClientRect();
        const width = Math.round(rect.width);
        const height = Math.round(rect.height);
        const left = Math.round(rect.left);
        const top = Math.round(rect.top);
        if (width < 2 || height < 2) return false;
        if (left !== placedLeft || top !== placedTop) {
          placedLeft = left;
          placedTop = top;
          canvas.style.left = left + "px";
          canvas.style.top = top + "px";
        }
        if (width !== placedWidth || height !== placedHeight) {
          placedWidth = width;
          placedHeight = height;
          canvas.style.width = width + "px";
          canvas.style.height = height + "px";
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
          renderer.setSize(width, height, false);
        }
        return true;
      };

      const onPointerDown = (event) => {
        dragging = true;
        lastX = event.clientX;
        lastY = event.clientY;
      };
      const onPointerMove = (event) => {
        if (!dragging) return;
        lon -= (event.clientX - lastX) * 0.15;
        lat = Math.max(-85, Math.min(85, lat + (event.clientY - lastY) * 0.15));
        lastX = event.clientX;
        lastY = event.clientY;
      };
      const onPointerUp = () => {
        dragging = false;
      };

      canvas.addEventListener("pointerdown", onPointerDown);
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);
      window.addEventListener("resize", syncCanvas);
      removeListeners.push(() => {
        canvas.removeEventListener("pointerdown", onPointerDown);
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onPointerUp);
        window.removeEventListener("resize", syncCanvas);
      });

      const renderFrame = () => {
        animationId = requestAnimationFrame(renderFrame);
        if (!syncCanvas()) return;
        if (!dragging) lon += 0.04;
        const phi = THREE.MathUtils.degToRad(90 - lat);
        const theta = THREE.MathUtils.degToRad(lon);
        camera.lookAt(
          Math.sin(phi) * Math.cos(theta),
          Math.cos(phi),
          Math.sin(phi) * Math.sin(theta)
        );
        renderer.render(scene, camera);
        gl.flush();
      };
      renderFrame();

      panoramaInstance.current = {
        destroy() {
          cancelAnimationFrame(animationId);
          removeListeners.splice(0).forEach((fn) => fn());
          geometry.dispose();
          material.map?.dispose();
          material.dispose();
          renderer.dispose();
          canvas.remove();
        },
      };
    };

    const frame = requestAnimationFrame(start);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      panoramaInstance.current?.destroy();
      panoramaInstance.current = null;
    };
  }, [activeIndex, activeSlide?.src, activeSlide?.type]);

  const goToSlide = (i) => {
    setActiveIndex(i);
    restartAutoplay();
  };

  // ✅ السكرول لـ About section - بيدور على الـ FlowSection اللي عندها
  // aria-label="About" (زي ما هي متعرّفة في Home.jsx)
  const scrollToAbout = () => {
    const aboutEl = document.querySelector('[aria-label="About"]');
    if (aboutEl) {
      aboutEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!activeSlide) {
    return <section className="relative h-screen w-full bg-[#404041]" />;
  }

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#404041]">
      {/* ===== الميديا: بانوراما / فيديو / صورة - سلايد واحد بس شغال ===== */}
      <div
        key={activeSlide.id}
        className={`absolute inset-0 h-full w-full ${activeSlide.type === "panorama" ? "" : "animate-[heroFade_0.6s_ease]"}`}
      >
        {activeSlide.type === "panorama" && !panoramaFailed && (
          <div ref={viewerRef} className="absolute inset-0 h-full w-full" />
        )}

        {activeSlide.type === "panorama" && panoramaFailed && (
          <img
            src={activeSlide.src}
            alt={activeSlide.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        {activeSlide.type === "video" && (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={activeSlide.src}
            autoPlay
            muted
            loop
            playsInline
          />
        )}

        {activeSlide.type === "image" && (
          <img
            src={activeSlide.src}
            alt={activeSlide.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        {/* تظليل خفيف تحت بس عشان النص والـ dots يبانوا واضحين، من غير
            ما يغطي على الصورة/الفيديو نفسه */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[45%] bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
      </div>

      {/* ===== المحتوى فوق الميديا ===== */}
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col">
        {/* العنوان - في المنتصف تقريبًا */}
        <div className="flex flex-1 items-center justify-center px-6">
          <h1 className="max-w-3xl text-center text-[clamp(1.6rem,4.2vw,3.25rem)] font-bold leading-tight tracking-wide text-white drop-shadow-md">
            {activeSlide.title}
          </h1>
        </div>

        {/* ===== أسفل الشاشة: dots + سهم، بمسافات ثابتة ومريحة ===== */}
        <div className="pointer-events-auto flex flex-col items-center gap-6 pb-8">
          {/* Dots */}
          <div className="flex items-center gap-2.5">
            {slides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => goToSlide(i)}
                aria-label={`Go to ${s.title}`}
                aria-current={i === activeIndex}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === activeIndex ? "w-7 bg-white" : "w-2 bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          {/* سهم السكرول لـ About */}
          {/* <button
            onClick={scrollToAbout}
            aria-label="Scroll to About section"
            className="group flex flex-col items-center gap-1 text-white/80 transition-colors hover:text-white"
          >
            <span className="text-[10px] font-medium tracking-[0.2em]">SCROLL</span>
            <svg
              className="h-5 w-5 animate-bounce"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button> */}

          {/* مؤشر السكرول لـ About - شكل ماوس بدل السهم */}
<button
  onClick={scrollToAbout}
  aria-label="Scroll to About section"
  className="group flex flex-col items-center gap-2 text-white/80 transition-colors hover:text-white"
>
  <span className="text-[10px] font-medium tracking-[0.2em]">SCROLL</span>

  <span className="flex h-9 w-[22px] items-start justify-center rounded-full border-2 border-white/70 p-1.5 transition-colors group-hover:border-white">
    <span
      className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_6px_2px_rgba(40,58,133,0.65)]"
      style={{ animation: "scrollWheel 1.6s ease-in-out infinite" }}
    />
  </span>
</button>
        </div>
      </div>
    </section>
  );
}