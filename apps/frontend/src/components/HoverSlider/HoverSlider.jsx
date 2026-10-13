// import { createContext, useContext, useState, forwardRef, useCallback } from "react";
// import { motion, MotionConfig } from "motion/react";

// // بديل بسيط لـ cn بتاعة shadcn - بس بتلزق الكلاسات مع بعض وتشيل أي قيمة فاضية
// function cn(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// function splitText(text) {
//   const words = text.split(" ").map((w) => w + " ");
//   const characters = words.map((w) => w.split("")).flat();
//   return { characters };
// }

// const HoverSliderContext = createContext(undefined);

// // hook بنستخدمه برّه الكومبوننت عشان نعرف احنا واقفين على أنهي slide حاليًا
// export function useHoverSlider() {
//   const ctx = useContext(HoverSliderContext);
//   if (!ctx) throw new Error("useHoverSlider لازم تتستخدم جوه HoverSlider");
//   return ctx;
// }

// export const HoverSlider = forwardRef(({ children, className, ...props }, ref) => {
//   const [activeSlide, setActiveSlide] = useState(0);
//   const changeSlide = useCallback((index) => setActiveSlide(index), []);
//   return (
//     <HoverSliderContext.Provider value={{ activeSlide, changeSlide }}>
//       <div ref={ref} className={className} {...props}>
//         {children}
//       </div>
//     </HoverSliderContext.Provider>
//   );
// });
// HoverSlider.displayName = "HoverSlider";

// export const TextStaggerHover = forwardRef(({ text, index, className, ...props }, ref) => {
//   const { activeSlide, changeSlide } = useHoverSlider();
//   const { characters } = splitText(text);
//   const isActive = activeSlide === index;
//   const handleActivate = () => changeSlide(index);

//   return (
//     <span
//       ref={ref}
//       className={cn("relative inline-block origin-bottom overflow-hidden", className)}
//       onMouseEnter={handleActivate}
//       onClick={handleActivate}
//       {...props}
//     >
//       {characters.map((char, i) => (
//         <span key={`${char}-${i}`} className="relative inline-block overflow-hidden">
//           <MotionConfig
//             transition={{ delay: i * 0.02, duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
//           >
//             <motion.span
//               className="inline-block opacity-30 text-[#1E2432]"
//               initial={{ y: "0%" }}
//               animate={isActive ? { y: "-110%" } : { y: "0%" }}
//             >
//               {char}
//               {char === " " && i < characters.length - 1 && <>&nbsp;</>}
//             </motion.span>
//             <motion.span
//               className="absolute left-0 top-0 inline-block text-[#1F3888]"
//               initial={{ y: "110%" }}
//               animate={isActive ? { y: "0%" } : { y: "110%" }}
//             >
//               {char}
//             </motion.span>
//           </MotionConfig>
//         </span>
//       ))}
//     </span>
//   );
// });
// TextStaggerHover.displayName = "TextStaggerHover";

// export const clipPathVariants = {
//   visible: { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" },
//   hidden: { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0px)" },
// };

// export const HoverSliderImageWrap = forwardRef(({ className, ...props }, ref) => (
//   <div
//     ref={ref}
//     className={cn(
//       "grid overflow-hidden [&>*]:col-start-1 [&>*]:col-end-1 [&>*]:row-start-1 [&>*]:row-end-1 [&>*]:size-full",
//       className
//     )}
//     {...props}
//   />
// ));
// HoverSliderImageWrap.displayName = "HoverSliderImageWrap";

// export const HoverSliderImage = forwardRef(({ index, className, ...props }, ref) => {
//   const { activeSlide } = useHoverSlider();
//   return (
//     <motion.img
//       ref={ref}
//       className={cn("inline-block align-middle", className)}
//       transition={{ ease: [0.33, 1, 0.68, 1], duration: 0.8 }}
//       variants={clipPathVariants}
//       animate={activeSlide === index ? "visible" : "hidden"}
//       {...props}
//     />
//   );
// });
// HoverSliderImage.displayName = "HoverSliderImage";




import {
  createContext,
  useContext,
  useState,
  forwardRef,
  useCallback,
} from "react";
import { motion, MotionConfig } from "motion/react";

// بديل بسيط لـ cn بتاعة shadcn
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function splitText(text) {
  const words = text.split(" ").map((w) => w + " ");
  const characters = words.map((w) => w.split("")).flat();
  return { characters };
}

// Detect Arabic text without changing the actual content.
function isArabicText(text) {
  return /[\u0600-\u06FF]/.test(text);
}

const HoverSliderContext = createContext(undefined);

// hook بنستخدمه برّه الكومبوننت عشان نعرف احنا واقفين على أنهي slide حاليًا
export function useHoverSlider() {
  const ctx = useContext(HoverSliderContext);

  if (!ctx) {
    throw new Error("useHoverSlider لازم تتستخدم جوه HoverSlider");
  }

  return ctx;
}

export const HoverSlider = forwardRef(
  ({ children, className, ...props }, ref) => {
    const [activeSlide, setActiveSlide] = useState(0);

    const changeSlide = useCallback((index) => {
      setActiveSlide(index);
    }, []);

    return (
      <HoverSliderContext.Provider value={{ activeSlide, changeSlide }}>
        <div ref={ref} className={className} {...props}>
          {children}
        </div>
      </HoverSliderContext.Provider>
    );
  }
);

HoverSlider.displayName = "HoverSlider";

export const TextStaggerHover = forwardRef(
  ({ text, index, className, ...props }, ref) => {
    const { activeSlide, changeSlide } = useHoverSlider();

    const isActive = activeSlide === index;
    const isArabic = isArabicText(text);

    const handleActivate = () => {
      changeSlide(index);
    };

    /*
     * Arabic:
     * Don't split the text into individual characters.
     * Arabic letters need to stay together so the browser can
     * correctly shape and connect them.
     */
    if (isArabic) {
      return (
        <span
          ref={ref}
          dir="rtl"
          lang="ar"
          className={cn(
            "relative inline-block origin-bottom overflow-hidden",
            className
          )}
          onMouseEnter={handleActivate}
          onClick={handleActivate}
          {...props}
        >
          <MotionConfig
            transition={{
              duration: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {/* Normal / inactive text */}
            <motion.span
              className="inline-block whitespace-pre-wrap text-[#1E2432]"
              initial={{ y: "0%", opacity: 0.3 }}
              animate={
                isActive
                  ? {
                      y: "-110%",
                      opacity: 0.3,
                    }
                  : {
                      y: "0%",
                      opacity: 0.3,
                    }
              }
            >
              {text}
            </motion.span>

            {/* Active text */}
            <motion.span
              dir="rtl"
              lang="ar"
              className="absolute inset-x-0 top-0 inline-block whitespace-pre-wrap text-[#1F3888]"
              initial={{ y: "110%" }}
              animate={
                isActive
                  ? {
                      y: "0%",
                    }
                  : {
                      y: "110%",
                    }
              }
            >
              {text}
            </motion.span>
          </MotionConfig>
        </span>
      );
    }

    /*
     * English / Latin:
     * Keep the original character-by-character stagger animation.
     */
    const { characters } = splitText(text);

    return (
      <span
        ref={ref}
        className={cn(
          "relative inline-block origin-bottom overflow-hidden",
          className
        )}
        onMouseEnter={handleActivate}
        onClick={handleActivate}
        {...props}
      >
        {characters.map((char, i) => (
          <span
            key={`${char}-${i}`}
            className="relative inline-block overflow-hidden"
          >
            <MotionConfig
              transition={{
                delay: i * 0.02,
                duration: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <motion.span
                className="inline-block opacity-30 text-[#1E2432]"
                initial={{ y: "0%" }}
                animate={isActive ? { y: "-110%" } : { y: "0%" }}
              >
                {char}
                {char === " " && i < characters.length - 1 && (
                  <>
                    &nbsp;
                  </>
                )}
              </motion.span>

              <motion.span
                className="absolute left-0 top-0 inline-block text-[#1F3888]"
                initial={{ y: "110%" }}
                animate={isActive ? { y: "0%" } : { y: "110%" }}
              >
                {char}
              </motion.span>
            </MotionConfig>
          </span>
        ))}
      </span>
    );
  }
);

TextStaggerHover.displayName = "TextStaggerHover";

export const clipPathVariants = {
  visible: {
    clipPath:
      "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
  },
  hidden: {
    clipPath:
      "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0px)",
  },
};

export const HoverSliderImageWrap = forwardRef(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "grid overflow-hidden [&>*]:col-start-1 [&>*]:col-end-1 [&>*]:row-start-1 [&>*]:row-end-1 [&>*]:size-full",
        className
      )}
      {...props}
    />
  )
);

HoverSliderImageWrap.displayName = "HoverSliderImageWrap";

export const HoverSliderImage = forwardRef(
  ({ index, className, ...props }, ref) => {
    const { activeSlide } = useHoverSlider();

    return (
      <motion.img
        ref={ref}
        className={cn("inline-block align-middle", className)}
        transition={{
          ease: [0.33, 1, 0.68, 1],
          duration: 0.8,
        }}
        variants={clipPathVariants}
        animate={activeSlide === index ? "visible" : "hidden"}
        {...props}
      />
    );
  }
);

HoverSliderImage.displayName = "HoverSliderImage";