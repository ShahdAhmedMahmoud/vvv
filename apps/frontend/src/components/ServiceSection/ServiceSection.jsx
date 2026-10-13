import { AnimatePresence, motion } from "motion/react";
import {
  HoverSlider,
  TextStaggerHover,
  HoverSliderImageWrap,
  HoverSliderImage,
  useHoverSlider,
} from "../HoverSlider/HoverSlider";
import {
  getTextValue,
  useServicesContent,
} from "../../features/marketing/MarketingProvider";
import { resolveMarketingIcon } from "../../features/marketing/marketingIcons";
import { useLanguage } from "../../locales/LanguageContext/LanguageContext";

function ServiceDescription({ items, language }) {
  const { activeSlide } = useHoverSlider();
  const active = items[activeSlide] || items[0];
  if (!active) return null;
  return (
    <AnimatePresence mode="wait">
      <motion.p
        key={active.id || activeSlide}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="text-[#6C757D] max-w-md mt-6"
      >
        {getTextValue(active.description, language)}
      </motion.p>
    </AnimatePresence>
  );
}

export default function ServicesSection() {
  const { language } = useLanguage();
  const content = useServicesContent();
  const services = Array.isArray(content.items) ? content.items : [];

  return (
    <section className="relative w-full py-24 px-4 overflow-hidden bg-[#F8F9FD]" id="services">
      <div className="relative z-10 container m-auto px-4 md:px-8 lg:px-16">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-[#1E2432]">
            {getTextValue(content.title, language)}{" "}
            <span className="text-[#1F3888]">{getTextValue(content.titleHighlight, language)}</span>
          </h2>
          <p className="text-[#6C757D] mt-2">{getTextValue(content.subtitle, language)}</p>
        </div>

        {services.length > 0 && (
          <HoverSlider className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-16">
            <div className="order-2 lg:order-1 w-full lg:w-1/2 flex flex-col gap-3">
              {services.map((service, index) => {
                const Icon = resolveMarketingIcon(service.icon);
                const title = getTextValue(service.title, language);
                return (
                  <div key={service.id || title} className="flex items-center gap-4 cursor-pointer">
                    <Icon className="w-5 h-5 text-[#1F3888] shrink-0" />
                    <TextStaggerHover
                      index={index}
                      text={title}
                      className="text-xl md:text-2xl font-bold uppercase tracking-tight"
                    />
                  </div>
                );
              })}
              <ServiceDescription items={services} language={language} />
            </div>

            <HoverSliderImageWrap className="order-1 lg:order-2 w-full lg:w-1/2 aspect-[4/3] rounded-2xl shadow-xl">
              {services.map((service, index) => (
                <HoverSliderImage
                  key={service.id || index}
                  index={index}
                  src={service.image}
                  alt={getTextValue(service.title, language)}
                  className="w-full h-full object-cover"
                  loading="eager"
                  decoding="async"
                />
              ))}
            </HoverSliderImageWrap>
          </HoverSlider>
        )}
      </div>
    </section>
  );
}
