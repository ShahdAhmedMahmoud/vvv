import { useEffect, useRef, useState } from "react";

/**
 * CursorSpotlight
 * سبوت لايت عالمي بيتبع الماوس في الصفحة كلها بدل شكل الكيرسر العادي.
 * مبني على brand colors: Navy #283A85 و Dark Gray #3A3A3C
 *
 * ليه استخدمنا useRef مش useState للـ position؟
 * لو استخدمنا useState هيحصل re-render لكل الكومبوننت مع كل حركة موس
 * (يعني ممكن مئات المرات في الثانية) وده هيهنّج الصفحة.
 * بدل كده، بنحرّك الـ DOM element مباشرة عن طريق ref.current.style
 * وده أسرع بكتير لأنه بيتجاوز دورة الـ React render كلها.
 */
export default function CursorSpotlight({
  size = 450,
  primaryColor = "40, 58, 133", // #283A85 بصيغة RGB عشان نقدر نتحكم في الشفافية
  secondaryColor = "58, 58, 60", // #3A3A3C
  opacity = 0.28,
  hideNativeCursor = false,
  disableOnTouch = true,
}) {
  const spotRef = useRef(null);
  const posRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // على الموبايل/التاتش مفيش "ماوس" أصلاً، فبنعطّل الإيفكت
    if (disableOnTouch) {
      const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
      if (isTouchDevice) return;
    }

    const updatePosition = () => {
      if (spotRef.current) {
        spotRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`;
      }
      rafRef.current = null;
    };

    const handleMouseMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
      // requestAnimationFrame بيمنع تكرار التحديث أكتر من مرة في نفس الفريم
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(updatePosition);
      }
    };

    const handleMouseLeave = () => setVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    if (hideNativeCursor) {
      document.body.style.cursor = "none";
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (hideNativeCursor) {
        document.body.style.cursor = "";
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hideNativeCursor, disableOnTouch]);

  return (
    <div
      ref={spotRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[9999] transition-opacity duration-300 ease-out"
      style={{
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
        opacity: visible ? 1 : 0,
        background: `radial-gradient(circle, rgba(${primaryColor}, ${opacity}) 0%, rgba(${secondaryColor}, ${opacity * 0.4}) 40%, transparent 70%)`,
        mixBlendMode: "normal",
        willChange: "transform",
      }}
    />
  );
}