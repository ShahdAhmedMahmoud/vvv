
import { useRef } from "react";
import { motion } from "motion/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// قاموس بيحوّل اسم الاتجاه لقيم x/y/rotate ابتدائية - كل اتجاه له نوع دوران مختلف يناسبه
const directionVariants = {
  top: { y: -100, rotateX: 90 },
  bottom: { y: 100, rotateX: -90 },
  left: { x: -100, rotateY: -90 },
  right: { x: 100, rotateY: 90 },
};

// component بيستقبل: الأيقونة، العنوان، الوصف، رقم الترتيب، واتجاه الدخول
export default function ServiceCard({ Icon, title, description, index, direction = "bottom", image }) {
  const cardRef = useRef(null);
  const iconRef = useRef(null);

  // بنجيب قيم x/y المناسبة للاتجاه اللي اتبعت لينا، ولو مش موجود نرجع لـ bottom كقيمة افتراضية
  const initialOffset = directionVariants[direction] || directionVariants.bottom;

  useGSAP(
    () => {
      const shapes = iconRef.current.querySelectorAll(
        "path, circle, line, rect, polyline, polygon"
      );
      shapes.forEach((shape) => {
        const length = shape.getTotalLength();
        gsap.set(shape, { strokeDasharray: length, strokeDashoffset: length });
      });
      gsap.to(shapes, {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: "power2.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: cardRef }
  );

  return (
    <motion.div
      ref={cardRef}
      className="group relative overflow-hidden bg-white rounded-2xl shadow-md p-8 cursor-pointer border border-transparent hover:border-[#D98A2B]/30"
      style={{ transformStyle: "preserve-3d" }}
      // ==== دخول الكارت: تقلّب 3D + تكبير تدريجي من الاتجاه المحدد ====
      initial={{ opacity: 0, scale: 0.4, ...initialOffset }}
      whileInView={{ opacity: 1, scale: 1, x: 0, y: 0, rotateX: 0, rotateY: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.9,
        delay: index * 0.12,
        type: "spring",
        stiffness: 90,
        damping: 12,
      }}
      // ==== Hover Lift/Tilt ====
      whileHover={{ y: -10, rotate: -2, scale: 1.03 }}
    >
      {/* ==== طبقة الصورة (Hover Reveal) ====
          مخفية تمامًا في البداية (opacity-0)، وبتظهر بس لما الماوس يبقى فوق الكارت (group-hover) */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-0 scale-110 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-100"
        style={{ backgroundImage: `url(${image})` }}
      />
      {/* طبقة غامقة فوق الصورة عشان النص يفضل واضح فوقها */}
      <div className="absolute inset-0 bg-[#1E2432]/0 transition-colors duration-500 group-hover:bg-[#1E2432]/70" />

      {/* المحتوى - لازم يكون فوق الطبقتين دول (relative + z-10) */}
      <div className="relative z-10">
        <div className="w-20 h-20 rounded-full bg-[#F8F9FD] group-hover:bg-white/10 transition-colors duration-500 flex items-center justify-center mb-5">
          <Icon
            ref={iconRef}
            strokeWidth={1.3}
            className="w-11 h-11 text-[#1F3888] transition-all duration-500 ease-in-out group-hover:scale-150 group-hover:rotate-[25deg] group-hover:text-[#D98A2B]"
          />
        </div>

        <h3 className="text-xl font-bold text-[#1E2432] group-hover:text-white transition-colors duration-500 mb-2">
          {title}
        </h3>
        <p className="text-[#6C757D] group-hover:text-gray-200 transition-colors duration-500 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}