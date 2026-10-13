// // import { lazy, Suspense } from "react";
// // import BIMHero from "../../../components/BIM/BIMHero";

// // // الأقسام اللي تحت الـ hero بتتحمّل lazy عشان الـ iframe الأول ياخد الأولوية
// // const BIMIntro = lazy(() => import("../../../components/BIM/BIMIntro"));
// // const BIMClashDetection = lazy(() => import("../../../components/BIM/BIMClashDetection"));
// // const BIMDimensions = lazy(() => import("../../../components/BIM/BIMDimensions"));
// // const BIMDataInspector = lazy(() => import("../../../components/BIM/BIMDataInspector"));
// // const BIMServices = lazy(() => import("../../../components/BIM/BIMServices"));
// // const BIMCTA = lazy(() => import("../../../components/BIM/BIMCTA"));

// // export default function BIM() {
// //   return (
// //     <main className="overflow-x-hidden">
// //       <BIMHero />
// //       <Suspense fallback={null}>
// //         <BIMIntro />
// //         <BIMClashDetection />
// //         <BIMDimensions />
// //         <BIMDataInspector />
// //         <BIMServices />
// //         <BIMCTA />
// //       </Suspense>
// //     </main>
// //   );
// // }


// import { lazy, Suspense } from "react";
// import BIMHero from "../../../components/BIM/Bimhero";

// // الأقسام اللي تحت الـ hero بتتحمّل lazy عشان الـ iframe ياخد الأولوية
// const sections = [
// //   lazy(() => import("../../../components/BIM/Bimhero")),
//   lazy(() => import("../../../components/BIM/BIMBenefits")),
//   lazy(() => import("../../../components/BIM/BIMDisciplines")),
//   lazy(() => import("../../../components/BIM/Bimclashdetection")),
//   lazy(() => import("../../../components/BIM/BIMWorkflow")),
//   lazy(() => import("../../../components/BIM/BIMElements")),
//   lazy(() => import("../../../components/BIM/Bimservices")),
//   lazy(() => import("../../../components/BIM/Bimcta")),
// ];

// export default function BIM() {
//   return (
//     <main className="overflow-x-hidden">
//       <BIMHero />
//       <Suspense fallback={null}>
//         {sections.map((Section, i) => (
//           <Section key={i} />
//         ))}
//       </Suspense>
//     </main>
//   );
// }


import { lazy, Suspense } from "react";
import BIMHero from "../../../components/BIM/Bimhero";

// بيطبعلك اسم الملف اللي ناقصه default export، وبيستخدم أول named export كـ fallback
const lazyDefault = (loader, name) =>
  lazy(() =>
    loader().then((m) => {
      if (m.default) return m;
      const keys = Object.keys(m);
      console.error(`[${name}] مفيهوش default export. الموجود:`, keys);
      return { default: keys.length ? m[keys[0]] : () => null };
    })
  );

const sections = [
//   lazyDefault(() => import("../../../components/BIM/Bimhero"), "Bimhero"),
  lazyDefault(() => import("../../../components/BIM/Bimbenefits"), "BIMBenefits"),
  lazyDefault(() => import("../../../components/BIM/Bimdisciplines"), "BIMDisciplines"),
//   lazyDefault(() => import("../../../components/BIM/Bimclashdetection"), "Bimclashdetection"),
  lazyDefault(() => import("../../../components/BIM/Bimworkflow"), "BIMWorkflow"),
//   lazyDefault(() => import("../../../components/BIM/Bimelements"), "BIMElements"),
  lazyDefault(() => import("../../../components/BIM/Bimservices"), "Bimservices"),
//   lazyDefault(() => import("../../../components/BIM/Bimcta"), "Bimcta"),
];

export default function BIM() {
  return (
    <main className="overflow-x-hidden">
      <BIMHero />
      <Suspense fallback={null}>
        {sections.map((Section, i) => (
          <Section key={i} />
        ))}
      </Suspense>
    </main>
  );
}