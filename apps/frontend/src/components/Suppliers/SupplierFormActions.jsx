import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button, Spinner } from "./SupplierUI";

// status: "idle" | "saving" | "saved"
export default function SupplierFormActions({ onBack, onNext, isReview, status = "idle" }) {
  const busy = status !== "idle";
  return (
    <div className="sticky bottom-0 z-20 -mx-4 mt-8 flex items-center justify-between gap-3 border-t border-[#3C3C3B]/10 bg-white/90 px-4 py-3 backdrop-blur sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:backdrop-blur-none">
      <Button variant="secondary" onClick={onBack} disabled={busy}>
        <ArrowLeft size={16} aria-hidden="true" />
        Back
      </Button>
      <Button onClick={onNext} disabled={busy} className="min-w-36" aria-live="polite">
        {status === "saving" ? (<><Spinner />Saving…</>)
          : status === "saved" ? (<><Check size={16} aria-hidden="true" />Saved</>)
          : isReview ? "Save supplier"
          : (<>Continue<ArrowRight size={16} aria-hidden="true" /></>)}
      </Button>
    </div>
  );
}