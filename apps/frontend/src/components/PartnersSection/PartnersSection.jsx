import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import {
  getTextValue,
  usePartnersContent,
} from "../../features/marketing/MarketingProvider";
import { useLanguage } from "../../locales/LanguageContext/LanguageContext";

function MagneticLogo({ name, logo }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.2 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * 0.35);
    y.set(relY * 0.35);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className="group shrink-0 mx-4 flex items-center justify-center h-36 w-[240px]
                 rounded-2xl border-2 border-[#283A85]/15 bg-white
                 shadow-md transition-all duration-300 relative overflow-hidden p-6
                 hover:shadow-2xl hover:shadow-[#283A85]/25 hover:-translate-y-2
                 hover:border-[#283A85]/40"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: "radial-gradient(circle at center, rgba(40,58,133,0.1), transparent 70%)",
        }}
      />
      <img
        src={logo}
        alt={name}
        title={name}
        className="relative h-20 w-auto max-w-[190px] object-contain transition-all duration-300 group-hover:scale-110"
      />
    </motion.div>
  );
}

function MarqueeRow({ items, direction = "left", duration = 30 }) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee-row overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div
        className={`flex w-max ${direction === "left" ? "animate-marquee-left" : "animate-marquee-right"}`}
        style={{ animationDuration: `${duration}s` }}
      >
        {doubled.map((partner, i) => (
          <MagneticLogo key={`${partner.id || partner.name}-${i}`} name={partner.name} logo={partner.logo} />
        ))}
      </div>
    </div>
  );
}

export default function PartnersSection() {
  const { language } = useLanguage();
  const content = usePartnersContent();
  const partners = (content.items || []).map((item) => ({
    id: item.id,
    name: getTextValue(item.name, language) || (typeof item.name === "string" ? item.name : ""),
    logo: item.logo,
  }));
  const row1 = partners.slice(0, 6);
  const row2 = partners.slice(5, 11);

  return (
    <section className="bg-[#FFFFFF] py-24 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#283A85 0.6px, transparent 0.6px)",
          backgroundSize: "22px 22px",
          maskImage: "radial-gradient(ellipse 60% 50% at 50% 40%, black, transparent)",
        }}
      />
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: "#283A85" }}
      />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[560px] mx-auto mb-16"
        >
          <span
            className="py-1.5 px-4 rounded-full text-sm font-semibold tracking-wide"
            style={{
              color: "#283A85",
              border: "1px solid rgba(40,58,133,0.25)",
              background: "rgba(40,58,133,0.05)",
            }}
          >
            {getTextValue(content.badge, language)}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mt-5 text-center" style={{ color: "#404041" }}>
            {getTextValue(content.title, language)}
          </h2>
          <p className="text-center mt-5 text-base" style={{ color: "#404041", opacity: 0.7 }}>
            {getTextValue(content.subtitle, language)}
          </p>
        </motion.div>

        {partners.length > 0 && (
          <div className="flex flex-col gap-8">
            <MarqueeRow items={row1} direction="left" duration={34} />
            <MarqueeRow items={row2.length ? row2 : row1} direction="right" duration={38} />
          </div>
        )}
      </div>
    </section>
  );
}
