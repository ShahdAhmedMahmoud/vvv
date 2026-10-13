// // import { useState } from "react";
// // import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
// // import { motion, AnimatePresence } from "motion/react";
// // import L from "leaflet";
// // import "leaflet/dist/leaflet.css";
// // import { MapPin, Clock, X, Navigation } from "lucide-react";

// // const OFFICE = {
// //   name: "First Settlement Services Center",
// //   address: "35A, First Settlement Services Center, New Cairo, Cairo, Egypt",
// //   lat: 30.023, // TODO: استبدليها بالإحداثيات الدقيقة من Google Maps
// //   lng: 31.434,
// //   image: "/images/main-building.jpg",
// //   hours: "Sunday – Thursday, 9:00 AM – 5:00 PM",
// // };

// // const mapStyles = `
// // .contact-map .leaflet-container {
// //   background: #eef1f7;
// //   font-family: inherit;
// // }

// // .contact-map .leaflet-control-attribution {
// //   background: rgba(255, 255, 255, 0.88);
// //   color: #6C757D;
// //   font-size: 10px;
// //   border-radius: 6px 0 0 0;
// // }

// // .contact-map .leaflet-control-attribution a {
// //   color: #283A85;
// // }

// // .contact-map .leaflet-tooltip.office-tooltip {
// //   background: #1E2432;
// //   color: #ffffff;
// //   border: none;
// //   border-radius: 6px;
// //   padding: 4px 8px;
// //   font-size: 11px;
// //   font-weight: 600;
// //   box-shadow: 0 4px 12px rgba(30, 36, 50, 0.25);
// // }

// // .contact-map .leaflet-tooltip.office-tooltip::before {
// //   border-top-color: #1E2432;
// // }

// // .office-marker {
// //   position: relative;
// //   width: 34px;
// //   height: 44px;
// //   display: flex;
// //   align-items: center;
// //   justify-content: center;
// //   cursor: pointer;
// // }

// // .office-marker__pin {
// //   position: absolute;
// //   width: 32px;
// //   height: 32px;
// //   border-radius: 50% 50% 50% 0;
// //   background: #283A85;
// //   border: 3px solid #ffffff;
// //   box-shadow:
// //     0 2px 6px rgba(30, 36, 50, 0.35),
// //     0 5px 14px rgba(30, 36, 50, 0.25);
// //   transform: rotate(-45deg);
// //   animation: office-bounce 2.4s ease-in-out infinite;
// //   transition: transform 0.2s ease;
// // }

// // .office-marker__pin-inner {
// //   position: absolute;
// //   width: 10px;
// //   height: 10px;
// //   border-radius: 50%;
// //   background: #ffffff;
// //   z-index: 2;
// // }

// // .office-marker:hover .office-marker__pin {
// //   transform: rotate(-45deg) scale(1.12);
// // }

// // @keyframes office-bounce {
// //   0%, 100% { transform: rotate(-45deg) translateY(0); }
// //   50% { transform: rotate(-45deg) translateY(-6px); }
// // }

// // @media (prefers-reduced-motion: reduce) {
// //   .office-marker__pin {
// //     animation: none;
// //   }
// // }
// // `;

// // function createOfficeIcon() {
// //   return L.divIcon({
// //     className: "",
// //     html: `
// //       <div class="office-marker">
// //         <span class="office-marker__pin"></span>
// //         <span class="office-marker__pin-inner"></span>
// //       </div>
// //     `,
// //     iconSize: [34, 44],
// //     iconAnchor: [17, 42],
// //     tooltipAnchor: [0, -34],
// //   });
// // }

// // export default function ContactLocationMap() {
// //   const [showCard, setShowCard] = useState(false);

// //   const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
// //     OFFICE.address
// //   )}`;

// //   return (
// //     <div className="contact-map relative h-[380px] w-full overflow-hidden rounded-2xl border border-[#283A85]/10 shadow-[0_20px_50px_-20px_rgba(58,58,60,0.15)] sm:h-[440px] lg:h-[500px]">
// //       <style>{mapStyles}</style>

// //       <MapContainer
// //         center={[OFFICE.lat, OFFICE.lng]}
// //         zoom={15}
// //         scrollWheelZoom={false}
// //         zoomControl={false}
// //         className="h-full w-full"
// //       >
// //         <TileLayer
// //           attribution="&copy; OpenStreetMap contributors"
// //           url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
// //         />

// //         <Marker
// //           position={[OFFICE.lat, OFFICE.lng]}
// //           icon={createOfficeIcon()}
// //           eventHandlers={{ click: () => setShowCard(true) }}
// //         >
// //           <Tooltip direction="top" offset={[0, -35]} className="office-tooltip">
// //             {OFFICE.name}
// //           </Tooltip>
// //         </Marker>
// //       </MapContainer>

// //       <AnimatePresence>
// //         {showCard && (
// //           <motion.div
// //             initial={{ opacity: 0, y: 30, scale: 0.95 }}
// //             animate={{ opacity: 1, y: 0, scale: 1 }}
// //             exit={{ opacity: 0, y: 20, scale: 0.95 }}
// //             transition={{ type: "spring", stiffness: 260, damping: 24 }}
// //             className="absolute bottom-3 left-3 right-3 z-[1000] max-h-[80%] overflow-y-auto rounded-xl bg-white shadow-2xl sm:bottom-4 sm:left-4 sm:right-auto sm:w-80"
// //           >
// //             <button
// //               onClick={() => setShowCard(false)}
// //               aria-label="Close building details"
// //               className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-[#1E2432] hover:bg-white"
// //             >
// //               <X className="h-4 w-4" />
// //             </button>

// //             <div className="relative aspect-[16/10] overflow-hidden rounded-t-xl">
// //               <img
// //                 src={OFFICE.image}
// //                 alt={OFFICE.name}
// //                 className="h-full w-full object-cover"
// //               />
// //               <span className="absolute bottom-2 left-2 rounded-full bg-[#283A85]/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
// //                 Main Office
// //               </span>
// //             </div>

// //             <div className="p-4">
// //               <h4 className="text-sm font-bold uppercase leading-snug text-[#1E2432]">
// //                 {OFFICE.name}
// //               </h4>

// //               <div className="mt-2 flex flex-col gap-1.5 text-xs text-[#6C757D]">
// //                 <span className="flex items-start gap-1.5">
// //                   <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#283A85]" />
// //                   {OFFICE.address}
// //                 </span>
// //                 <span className="flex items-center gap-1.5">
// //                   <Clock className="h-3.5 w-3.5 shrink-0 text-[#283A85]" />
// //                   {OFFICE.hours}
// //                 </span>
// //               </div>


// //              <a
              
// //                 href={directionsUrl}
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //                 className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#283A85] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#283A85]/90"
// //               >
// //                 <Navigation className="h-4 w-4" />
// //                 Get Directions
// //               </a>
// //             </div>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>
// //     </div>
// //   );
// // }

// import { forwardRef, useImperativeHandle, useRef, useState } from "react";
// import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
// import { motion, AnimatePresence } from "motion/react";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import { MapPin, Clock, X, Navigation } from "lucide-react";

// const OFFICE = {
//   name: "First Settlement Services Center",
//   address: "35A, First Settlement Services Center, New Cairo, Cairo, Egypt",
//   lat: 30.023, // TODO: استبدليها بالإحداثيات الدقيقة من Google Maps
//   lng: 31.434,
//   image: "/images/main-building.png",
//   hours: "Sunday – Thursday, 9:00 AM – 5:00 PM",
// };

// const mapStyles = `
// .contact-map .leaflet-container {
//   background: #eef1f7;
//   font-family: inherit;
// }
// .contact-map .leaflet-control-attribution {
//   background: rgba(255, 255, 255, 0.88);
//   color: #6C757D;
//   font-size: 10px;
//   border-radius: 6px 0 0 0;
// }
// .contact-map .leaflet-control-attribution a {
//   color: #283A85;
// }
// .contact-map .leaflet-tooltip.office-tooltip {
//   background: #1E2432;
//   color: #ffffff;
//   border: none;
//   border-radius: 6px;
//   padding: 4px 8px;
//   font-size: 11px;
//   font-weight: 600;
//   box-shadow: 0 4px 12px rgba(30, 36, 50, 0.25);
// }
// .contact-map .leaflet-tooltip.office-tooltip::before {
//   border-top-color: #1E2432;
// }
// .office-marker {
//   position: relative;
//   width: 34px;
//   height: 44px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
// }
// .office-marker__pin {
//   position: absolute;
//   width: 32px;
//   height: 32px;
//   border-radius: 50% 50% 50% 0;
//   background: #283A85;
//   border: 3px solid #ffffff;
//   box-shadow:
//     0 2px 6px rgba(30, 36, 50, 0.35),
//     0 5px 14px rgba(30, 36, 50, 0.25);
//   transform: rotate(-45deg);
//   animation: office-bounce 2.4s ease-in-out infinite;
//   transition: transform 0.2s ease;
// }
// .office-marker__pin-inner {
//   position: absolute;
//   width: 10px;
//   height: 10px;
//   border-radius: 50%;
//   background: #ffffff;
//   z-index: 2;
// }
// .office-marker:hover .office-marker__pin {
//   transform: rotate(-45deg) scale(1.12);
// }
// @keyframes office-bounce {
//   0%, 100% { transform: rotate(-45deg) translateY(0); }
//   50% { transform: rotate(-45deg) translateY(-6px); }
// }
// @media (prefers-reduced-motion: reduce) {
//   .office-marker__pin { animation: none; }
// }
// `;

// function createOfficeIcon() {
//   return L.divIcon({
//     className: "",
//     html: `
//       <div class="office-marker">
//         <span class="office-marker__pin"></span>
//         <span class="office-marker__pin-inner"></span>
//       </div>
//     `,
//     iconSize: [34, 44],
//     iconAnchor: [17, 42],
//     tooltipAnchor: [0, -34],
//   });
// }

// const ContactLocationMap = forwardRef(function ContactLocationMap(_, ref) {
//   const [showCard, setShowCard] = useState(false);
//   const wrapperRef = useRef(null);

//   useImperativeHandle(ref, () => ({
//     openLocation: () => {
//       wrapperRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
//       // تأخير بسيط عشان الـ scroll يخلص الأول وبعدين تفتح الكارت
//       setTimeout(() => setShowCard(true), 400);
//     },
//   }));

//   const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
//     OFFICE.address
//   )}`;

//   return (
//     <div
//       ref={wrapperRef}
//       className="contact-map relative h-[380px] w-full overflow-hidden rounded-2xl border border-black/10 shadow-[0_20px_50px_-20px_rgba(58,58,60,0.15)] sm:h-[440px] lg:h-[500px]"
//     >
//       <style>{mapStyles}</style>

//       <MapContainer
//         center={[OFFICE.lat, OFFICE.lng]}
//         zoom={15}
//         scrollWheelZoom={false}
//         zoomControl={false}
//         className="h-full w-full"
//       >
//         <TileLayer
//           attribution="&copy; OpenStreetMap contributors"
//           url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />

//         <Marker
//           position={[OFFICE.lat, OFFICE.lng]}
//           icon={createOfficeIcon()}
//           eventHandlers={{ click: () => setShowCard(true) }}
//         >
//           <Tooltip direction="top" offset={[0, -35]} className="office-tooltip">
//             {OFFICE.name}
//           </Tooltip>
//         </Marker>
//       </MapContainer>

//       <AnimatePresence>
//         {showCard && (
//           <motion.div
//             initial={{ opacity: 0, y: 30, scale: 0.95 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: 20, scale: 0.95 }}
//             transition={{ type: "spring", stiffness: 260, damping: 24 }}
//             className="absolute bottom-3 left-3 right-3 z-[1000] max-h-[80%] overflow-y-auto rounded-xl bg-white shadow-2xl sm:bottom-4 sm:left-4 sm:right-auto sm:w-80"
//           >
//             <button
//               onClick={() => setShowCard(false)}
//               aria-label="Close building details"
//               className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-[#1E2432] hover:bg-white"
//             >
//               <X className="h-4 w-4" />
//             </button>

//             <div className="relative aspect-[16/10] overflow-hidden rounded-t-xl">
//               <img
//                 src={OFFICE.image}
//                 alt={OFFICE.name}
//                 className="h-full w-full object-cover"
//               />
//               <span className="absolute bottom-2 left-2 rounded-full bg-[#283A85]/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
//                 Main Office
//               </span>
//             </div>

//             <div className="p-4">
//               <h4 className="text-sm font-bold uppercase leading-snug text-[#1E2432]">
//                 {OFFICE.name}
//               </h4>

//               <div className="mt-2 flex flex-col gap-1.5 text-xs text-[#6C757D]">
//                 <span className="flex items-start gap-1.5">
//                   <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#283A85]" />
//                   {OFFICE.address}
//                 </span>
//                 <span className="flex items-center gap-1.5">
//                   <Clock className="h-3.5 w-3.5 shrink-0 text-[#283A85]" />
//                   {OFFICE.hours}
//                 </span>
//               </div>

//               <a
//                 href={directionsUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#283A85] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#283A85]/90"
//               >
//                 <Navigation className="h-4 w-4" />
//                 Get Directions
//               </a>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// });

// export default ContactLocationMap;


import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from "react-leaflet";
import { motion, AnimatePresence } from "motion/react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin, Clock, X, Navigation, Plus, Minus, Crosshair } from "lucide-react";

const OFFICE = {
  name: "First Settlement Services Center",
  address: "35A, First Settlement Services Center, New Cairo, Cairo, Egypt",
  lat: 30.061323052429078,
  lng: 31.446035594628917,
  image: "/images/main-building.png",
  hours: "Sunday – Thursday, 9:00 AM – 5:00 PM",
};

const DEFAULT_ZOOM = 17;

const mapStyles = `
.contact-map .leaflet-container {
  background: #eef1f7;
  font-family: inherit;
}
.contact-map .leaflet-control-attribution {
  background: rgba(255, 255, 255, 0.88);
  color: #6C757D;
  font-size: 10px;
  border-radius: 6px 0 0 0;
}
.contact-map .leaflet-control-attribution a {
  color: #283A85;
}
.contact-map .leaflet-tooltip.office-tooltip {
  background: #1E2432;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 4px 8px;
  font-size: 11px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(30, 36, 50, 0.25);
}
.contact-map .leaflet-tooltip.office-tooltip::before {
  border-top-color: #1E2432;
}
.office-marker {
  position: relative;
  width: 34px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.office-marker__pin {
  position: absolute;
  width: 32px;
  height: 32px;
  border-radius: 50% 50% 50% 0;
  background: #283A85;
  border: 3px solid #ffffff;
  box-shadow:
    0 2px 6px rgba(30, 36, 50, 0.35),
    0 5px 14px rgba(30, 36, 50, 0.25);
  transform: rotate(-45deg);
  animation: office-bounce 2.4s ease-in-out infinite;
  transition: transform 0.2s ease;
}
.office-marker__pin-inner {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ffffff;
  z-index: 2;
}
.office-marker:hover .office-marker__pin {
  transform: rotate(-45deg) scale(1.12);
}
@keyframes office-bounce {
  0%, 100% { transform: rotate(-45deg) translateY(0); }
  50% { transform: rotate(-45deg) translateY(-6px); }
}
@media (prefers-reduced-motion: reduce) {
  .office-marker__pin { animation: none; }
}
`;

function createOfficeIcon() {
  return L.divIcon({
    className: "",
    html: `
      <div class="office-marker">
        <span class="office-marker__pin"></span>
        <span class="office-marker__pin-inner"></span>
      </div>
    `,
    iconSize: [34, 44],
    iconAnchor: [17, 42],
    tooltipAnchor: [0, -34],
  });
}

function MapControls() {
  const map = useMap();
  const ref = useRef(null);

  const btn =
    "flex h-8 w-8 items-center justify-center rounded-lg border border-black/10 bg-white/95 text-[#1E2432] shadow-md transition-colors hover:bg-[#283A85] hover:text-white sm:h-9 sm:w-9";

  return (
    <div
      ref={ref}
      className="absolute right-3 top-3 z-[1000] flex flex-col gap-1.5 sm:right-4 sm:top-4 sm:gap-2"
    >
      <button onClick={() => map.zoomIn()} aria-label="Zoom in" className={btn}>
        <Plus className="h-4 w-4" />
      </button>
      <button onClick={() => map.zoomOut()} aria-label="Zoom out" className={btn}>
        <Minus className="h-4 w-4" />
      </button>
      <button
        onClick={() => map.setView([OFFICE.lat, OFFICE.lng], DEFAULT_ZOOM, { animate: true })}
        aria-label="Reset the map view"
        className={btn}
      >
        <Crosshair className="h-4 w-4" />
      </button>
    </div>
  );
}

const ContactLocationMap = forwardRef(function ContactLocationMap(_, ref) {
  const [showCard, setShowCard] = useState(false);
  const wrapperRef = useRef(null);

  useImperativeHandle(ref, () => ({
    openLocation: () => {
      wrapperRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => setShowCard(true), 400);
    },
  }));

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    OFFICE.address
  )}`;

  return (
    <div
      ref={wrapperRef}
      className="contact-map relative h-[380px] w-full overflow-hidden rounded-2xl border border-black/10 shadow-[0_20px_50px_-20px_rgba(58,58,60,0.15)] sm:h-[440px] lg:h-[500px]"
    >
      <style>{mapStyles}</style>

      <MapContainer
        center={[OFFICE.lat, OFFICE.lng]}
        zoom={DEFAULT_ZOOM}
        minZoom={12}
        maxZoom={19}
        scrollWheelZoom
        doubleClickZoom
        dragging
        zoomControl={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapControls />

        <Marker
          position={[OFFICE.lat, OFFICE.lng]}
          icon={createOfficeIcon()}
          eventHandlers={{ click: () => setShowCard(true) }}
        >
          <Tooltip direction="top" offset={[0, -35]} className="office-tooltip">
            {OFFICE.name}
          </Tooltip>
        </Marker>
      </MapContainer>

      <AnimatePresence>
        {showCard && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="absolute bottom-3 left-3 right-3 z-[1000] max-h-[80%] overflow-y-auto rounded-xl bg-white shadow-2xl sm:bottom-4 sm:left-4 sm:right-auto sm:w-80"
          >
            <button
              onClick={() => setShowCard(false)}
              aria-label="Close building details"
              className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-[#1E2432] hover:bg-white"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative aspect-[16/10] overflow-hidden rounded-t-xl">
              <img
                src={OFFICE.image}
                alt={OFFICE.name}
                className="h-full w-full object-cover"
              />
              <span className="absolute bottom-2 left-2 rounded-full bg-[#283A85]/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
                Main Office
              </span>
            </div>

            <div className="p-4">
              <h4 className="text-sm font-bold uppercase leading-snug text-[#1E2432]">
                {OFFICE.name}
              </h4>

              <div className="mt-2 flex flex-col gap-1.5 text-xs text-[#6C757D]">
                <span className="flex items-start gap-1.5">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#283A85]" />
                  {OFFICE.address}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 shrink-0 text-[#283A85]" />
                  {OFFICE.hours}
                </span>
              </div>



               <a
              
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#283A85] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#283A85]/90"
              >
                <Navigation className="h-4 w-4" />
                Get Directions
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default ContactLocationMap;

