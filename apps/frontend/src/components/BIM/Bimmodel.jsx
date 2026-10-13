// const SKETCHFAB_URL =
//   "https://sketchfab.com/models/466184717bc6453dbd7b3732824ecbbe/embed?autostart=1&internal=1&tracking=0&ui_infos=0&ui_snapshots=1&ui_stop=0&ui_watermark=0";

// const corners = [
//   "left-0 top-0 border-l-2 border-t-2",
//   "right-0 top-0 border-r-2 border-t-2",
//   "bottom-0 left-0 border-b-2 border-l-2",
//   "bottom-0 right-0 border-b-2 border-r-2",
// ];

// export default function BIMModel({ className = "" }) {
//   return (
//     <div className={`flex flex-col ${className}`}>
//       <div className="flex items-center justify-between pb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
//         <span className="flex items-center gap-2">
//           <span className="h-1.5 w-1.5 rounded-full bg-white" /> BIM Model / Live View
//         </span>
//         <span>Model / 01</span>
//       </div>
//       <div className="relative min-h-0 flex-1">
//         <iframe
//           src={SKETCHFAB_URL}
//           title="BIM 3D Model"
//           allow="autoplay; fullscreen; xr-spatial-tracking"
//           loading="lazy"
//           className="h-full w-full border border-white/15 bg-black"
//         />
//         {corners.map((c) => (
//           <span key={c} className={`pointer-events-none absolute h-6 w-6 border-white ${c}`} />
//         ))}
//       </div>
//       <div className="flex justify-between pt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
//         <span>Digital Construction</span>
//         <span>Coordinated</span>
//       </div>
//     </div>
//   );
// }


const SKETCHFAB_URL =
  "https://sketchfab.com/models/466184717bc6453dbd7b3732824ecbbe/embed?autostart=1&internal=1&tracking=0&ui_infos=0&ui_snapshots=1&ui_stop=0&ui_watermark=0";

const corners = [
  "left-0 top-0 border-l-2 border-t-2",
  "right-0 top-0 border-r-2 border-t-2",
  "bottom-0 left-0 border-b-2 border-l-2",
  "bottom-0 right-0 border-b-2 border-r-2",
];

export default function BIMModel({ className = "" }) {
  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex items-center justify-between pb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-white" /> BIM Model / Live View
        </span>
        <span>Model / 01</span>
      </div>
      <div className="relative min-h-0 flex-1">
        <iframe
          src={SKETCHFAB_URL}
          title="BIM 3D Model"
          allow="autoplay; fullscreen; xr-spatial-tracking"
          loading="lazy"
          className="h-full w-full border border-white/15 bg-black"
        />
        {corners.map((c) => (
          <span key={c} className={`pointer-events-none absolute h-6 w-6 border-white ${c}`} />
        ))}
      </div>
      <div className="flex justify-between pt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
        <span>Digital Construction</span>
        <span>Coordinated</span>
      </div>
    </div>
  );
}