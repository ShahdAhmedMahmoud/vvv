import { useState, useEffect, useRef } from "react";
import {  useInView } from "motion/react";

// component بيستقبل: القيمة النهائية (target) والـ suffix (زي "+" أو "M")
export default function Counter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);

  // ref بنحطه على العنصر نفسه عشان نعرف امتى هو ظاهر على الشاشة
  const ref = useRef(null);

  // useInView بيرجع true/false حسب لو العنصر ده ظاهر في الشاشة دلوقتي
  // once: true معناها "اتفعلي مرة واحدة بس، ومترجعيش تاني لو الزائر عمل scroll لفوق وتحت"
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    // لو العنصر لسه مش ظاهر، متعمليش حاجة خالص
    if (!isInView) return;

    // بنحسب كل قد إيه نزوّد الرقم في كل "خطوة" عشان العدّ يخلص في حوالي 1.5 ثانية
    const duration = 1500; // بالميلي ثانية
    const steps = 60; // عدد مرات التحديث
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target); // نتأكد إننا بنوقف بالظبط على الرقم الصح، مش رقم عشري غريب
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    // cleanup: لو الكومبوننت اتشال من الشاشة قبل ما العد يخلص، نوقف الـ timer
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="text-3xl md:text-4xl font-bold text-[#1F3888]">
      {count}
      {suffix}
    </span>
  );
}