import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";
import {
  getTextValue,
  useTestimonialsContent,
} from "../../features/marketing/MarketingProvider";
import { useLanguage } from "../../locales/LanguageContext/LanguageContext";

const headingContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const wordVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

function TestimonialCard({ text, image, name, role }) {
  return (
    <div className="w-full max-w-xs rounded-2xl border border-[#3C3C3B]/15 bg-white p-8 shadow-md shadow-black/5">
      <Quote className="mb-3 h-6 w-6 text-[#2A317A]" />
      <div className="mb-3 flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-3.5 w-3.5 fill-[#2A317A] text-[#2A317A]" />
        ))}
      </div>
      <p className="text-sm leading-relaxed text-black">{text}</p>
      <div className="mt-5 flex items-center gap-3">
        <img width={40} height={40} src={image} alt={name} className="h-10 w-10 rounded-full object-cover" />
        <div className="flex flex-col">
          <div className="text-sm font-semibold leading-5 tracking-tight text-black">{name}</div>
          <div className="text-xs leading-5 tracking-tight text-[#3C3C3B]">{role}</div>
        </div>
      </div>
    </div>
  );
}

function TestimonialsColumn({ testimonials, duration = 15, className = "" }) {
  return (
    <div className={className}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{ duration, repeat: Infinity, ease: "linear", repeatType: "loop" }}
        className="flex flex-col gap-6 pb-6"
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex flex-col gap-6">
            {testimonials.map((item, i) => (
              <TestimonialCard key={`${copy}-${item.id || i}`} {...item} />
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function TestimonialsSection() {
  const { language } = useLanguage();
  const content = useTestimonialsContent();
  const items = (content.items || []).map((item) => ({
    id: item.id,
    text: getTextValue(item.text, language),
    image: item.image,
    name: item.name,
    role: getTextValue(item.role, language),
  }));
  const firstColumn = items.slice(0, 3);
  const secondColumn = items.slice(3, 6);
  const thirdColumn = items.slice(6, 9);

  return (
    <section className="relative bg-white py-20" id="testimonials">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={headingContainer}
          className="mx-auto flex max-w-[540px] flex-col items-center justify-center"
        >
          <motion.div variants={wordVariant} className="flex justify-center">
            <span className="rounded-full border border-[#2A317A]/30 px-4 py-1 text-sm font-medium text-[#2A317A]">
              {getTextValue(content.badge, language)}
            </span>
          </motion.div>
          <h2 className="mt-5 overflow-hidden text-center text-3xl font-bold tracking-tight text-black sm:text-4xl md:text-5xl">
            <motion.span variants={wordVariant} className="mr-2 inline-block">
              {getTextValue(content.titleBefore, language)}
            </motion.span>
            <motion.span variants={wordVariant} className="inline-block text-[#2A317A]">
              {getTextValue(content.titleHighlight, language)}
            </motion.span>
          </h2>
          <motion.p variants={wordVariant} className="mt-5 text-center text-[#3C3C3B]">
            {getTextValue(content.subtitle, language)}
          </motion.p>
        </motion.div>

        {items.length > 0 && (
          <div className="mt-12 flex max-h-[740px] justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]">
            <TestimonialsColumn testimonials={firstColumn} duration={15} />
            <TestimonialsColumn testimonials={secondColumn} duration={19} className="hidden md:block" />
            <TestimonialsColumn testimonials={thirdColumn} duration={17} className="hidden lg:block" />
          </div>
        )}
      </div>
    </section>
  );
}
