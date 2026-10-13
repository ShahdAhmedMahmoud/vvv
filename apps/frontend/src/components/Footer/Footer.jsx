import { motion } from "motion/react";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
} from "react-icons/fa6";
import KineticGrid from "../KineticGrid/KineticGrid";
import {
  getTextValue,
  useFooterContent,
} from "../../features/marketing/MarketingProvider";
import { useLanguage } from "../../locales/LanguageContext/LanguageContext";

const SOCIAL_ICONS = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  tiktok: FaTiktok,
};

export default function Footer() {
  const { language } = useLanguage();
  const content = useFooterContent();
  const quickLinks = content.quickLinks || [];
  const socialLinks = content.socialLinks || [];
  const hours = content.hours || [];

  return (
    <footer className="relative overflow-hidden bg-[#3C3C3B]" id="contact">
      <KineticGrid className="!h-auto w-full">
        <div className="relative z-10 mx-auto max-w-6xl px-4 pb-8 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-12 flex flex-col items-center justify-between gap-6 border-white/10 pb-12 md:flex-row"
          >
            <h3 className="text-center text-2xl font-bold text-white md:text-left md:text-4xl">
              {getTextValue(content.ctaTitle, language)}
              <br className="hidden md:block" />
              <span className="text-white">{getTextValue(content.ctaHighlight, language)}</span>
            </h3>
            <a
              href={content.ctaButtonHref || "/contact"}
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-[#2A317A] px-7 py-3.5 font-semibold text-white transition-opacity hover:opacity-90"
            >
              {getTextValue(content.ctaButtonLabel, language)}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>

          <div className="mb-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h4 className="mb-3 text-xl font-bold text-white">{content.companyName}</h4>
              <p className="mb-5 text-sm leading-relaxed text-white/60">
                {getTextValue(content.companyBlurb, language)}
              </p>
              <div className="flex gap-3">
                {socialLinks.map((link) => {
                  const Icon = SOCIAL_ICONS[link.network] || FaFacebookF;
                  return (
                    <a
                      key={link.id || link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.name}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-300 hover:bg-[#2A317A] hover:text-white"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
                {language === "ar" ? "روابط سريعة" : "Quick Links"}
              </h4>
              <ul className="space-y-2.5">
                {quickLinks.map((link) => (
                  <li key={link.id || getTextValue(link.label, language)}>
                    <a href={link.href} className="text-sm text-white/60 transition-colors duration-300 hover:text-white">
                      {getTextValue(link.label, language)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
                {language === "ar" ? "تواصل معنا" : "Get In Touch"}
              </h4>
              <ul className="space-y-3.5">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#FFFFFF]" />
                  <span className="text-sm text-white/60">{getTextValue(content.address, language)}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 shrink-0 text-[#FFFFFF]" />
                  <a href={content.phoneHref || `tel:${content.phone}`} className="text-sm text-white/60 transition-colors hover:text-white">
                    {content.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 shrink-0 text-[#FFFFFF]" />
                  <a href={`mailto:${content.email}`} className="text-sm text-white/60 transition-colors hover:text-white">
                    {content.email}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
                {language === "ar" ? "ساعات العمل" : "Working Hours"}
              </h4>
              <ul className="space-y-2.5 text-sm text-white/60">
                {hours.map((row) => (
                  <li key={row.id || getTextValue(row.days, language)} className="flex justify-between gap-4">
                    <span>{getTextValue(row.days, language)}</span>
                    <span>{getTextValue(row.time, language)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-4 border-white/10 pt-6 text-xs text-white/40 md:flex-row">
            <p>
              © {new Date().getFullYear()} {content.copyrightName}.{" "}
              {language === "ar" ? "جميع الحقوق محفوظة." : "All rights reserved."}
            </p>
            <div className="flex gap-5">
              <a href={content.privacyHref || "/privacy-policy"} className="transition-colors hover:text-white">
                {language === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}
              </a>
              <a href={content.termsHref || "/terms"} className="transition-colors hover:text-white">
                {language === "ar" ? "الشروط والأحكام" : "Terms & Conditions"}
              </a>
            </div>
          </div>
        </div>
      </KineticGrid>
    </footer>
  );
}
