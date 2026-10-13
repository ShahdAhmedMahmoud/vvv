import { X, MapPin, Clock, Navigation } from "lucide-react";

export default function LocationInfoCard({ onClose }) {
  const address = "35A, First Settlement Services Center, New Cairo, Cairo, Egypt";
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    address
  )}`;

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-black shadow-md transition hover:bg-white"
        >
          <X className="h-4 w-4" />
        </button>

        {/* غيّري المسار ده بصورة المبنى الرئيسي الحقيقية */}
        <img
          src="/images/main-building.jpg"
          alt="Main building"
          className="h-44 w-full object-cover"
        />

        <div className="p-5">
          <h3 className="mb-2 text-lg font-bold text-black">
            First Settlement Services Center
          </h3>

          <div className="mb-2 flex items-start gap-2 text-sm text-[#3A3A3C]/80">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#283A85]" />
            <span>{address}</span>
          </div>

          <div className="mb-4 flex items-center gap-2 text-sm text-[#3A3A3C]/80">
            <Clock className="h-4 w-4 shrink-0 text-[#283A85]" />
            <span>Sunday – Thursday, 9:00 AM – 5:00 PM</span>
          </div>

          <a
          
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#283A85] px-4 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5"
          >
            <Navigation className="h-4 w-4" />
            Get Directions
          </a>
        </div>
      </div>
    </div>
  );
}