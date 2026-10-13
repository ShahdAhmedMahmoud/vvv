import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, X } from "lucide-react";

const projects = [
  {
    id: 1,
    name: "SALLUM LAND PORT",
    location: "Hadbat Alsulum - Egypt",
    top: "23%",
    left: "18%",
  },
  {
    id: 2,
    name: "THE GENERAL SITE OF BIN ZAYED AXIS",
    location: "The New Administrative Capital - Egypt",
    top: "36%",
    left: "60%",
  },
  {
    id: 3,
    name: "FUSTAT PARK",
    location: "Cairo - Egypt",
    top: "38%",
    left: "51%",
  },
  {
    id: 4,
    name: "MIDTOWN SOLO",
    location: "Ben Zayed, New Capital, Cairo Governorate",
    top: "35%",
    left: "61%",
  },
  {
    id: 5,
    name: "MIDTOWN CONDO",
    location: "New Administrative Capital - Egypt",
    top: "37%",
    left: "62%",
  },
  {
    id: 6,
    name: "THE GENERAL LOCATION OF THE FINANCIAL DISTRICT SQUARE",
    location: "The New Administrative Capital - Egypt",
    top: "34%",
    left: "59%",
  },
];

export default function MapSection() {
  const [activeId, setActiveId] = useState(null);
  const activeProject = projects.find((p) => p.id === activeId);

  const handlePinClick = (e, id) => {
    e.stopPropagation();
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="relative w-full py-20 bg-[#F8F9FD] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1E2432] text-center mb-4">
          مشاريعنا على الخريطة
        </h2>
        <p className="text-center text-[#6C757D] mb-12">
          دوسي على أي نقطة عشان تشوفي تفاصيل المشروع
        </p>

        <div
          onClick={() => setActiveId(null)}
          className="relative w-full max-w-xl md:max-w-2xl mx-auto aspect-[740/659] rounded-2xl overflow-hidden shadow-lg cursor-default"
        >
          {/* صورة الخريطة */}
          <img
            src="src\assets\images\map.png"
            alt="Egypt Map"
            className="w-full h-full object-contain pointer-events-none select-none"
          />

          {/* الطبقة اللي بتعمل الزوم على الـ pins */}
          <motion.div
            className="absolute inset-0"
        //     animate={{
        //       scale: activeProject ? 1.7 : 1,
        //       x: activeProject ? `${50 - parseFloat(activeProject.left)}%` : 0,
        //       y: activeProject ? `${50 - parseFloat(activeProject.top)}%` : 0,
        //     }}
        //     transition={{ type: "spring", stiffness: 80, damping: 18 }}
        //   >
          style={{
    transformOrigin: activeProject
      ? `${activeProject.left} ${activeProject.top}`
      : "50% 50%",
  }}
  animate={{ scale: activeProject ? 2.3 : 1 }}
  transition={{ type: "spring", stiffness: 70, damping: 16 }}
>
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={(e) => handlePinClick(e, project.id)}
                style={{ top: project.top, left: project.left }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
              >
                {/* دائرة نبض حوالين الـ pin النشط */}
                {activeId === project.id && (
                  <motion.span
                    className="absolute inset-0 rounded-full bg-[#D98A2B]"
                    animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                  />
                )}
                <motion.div
                  animate={{ scale: activeId === project.id ? 1.4 : 1 }}
                  className={`relative flex items-center justify-center w-7 h-7 rounded-full shadow-md border-2 border-white ${
                    activeId === project.id ? "bg-[#D98A2B]" : "bg-white"
                  }`}
                >
                  <MapPin
                    size={14}
                    className={
                      activeId === project.id
                        ? "text-[#1E2432]"
                        : "text-[#1F3888]"
                    }
                  />
                </motion.div>
              </button>
            ))}
          </motion.div>
        </div>

        {/* الكارت (الـ alert) بتاع المشروع */}
        <AnimatePresence mode="wait">
          {activeProject && (
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="mt-6 mx-auto max-w-md bg-white rounded-xl shadow-xl border border-[#6C757D]/20 p-5 relative"
            >
              <button
                onClick={() => setActiveId(null)}
                className="absolute top-3 right-3 text-[#6C757D] hover:text-[#1E2432]"
              >
                <X size={18} />
              </button>
              <h3 className="text-lg font-bold text-[#1F3888]">
                {activeProject.name}
              </h3>
              <p className="text-sm text-[#6C757D] mt-1">
                {activeProject.location}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}