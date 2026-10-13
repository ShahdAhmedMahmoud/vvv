import React, { useRef } from "react";
import FullScreenScrollFX from "../FullScreenScrollFX/FullScreenScrollFX";

const projects = [
  {
    id: "financial-district",
    leftLabel: "Commercial",
    rightLabel: "Commercial",
    title: "FINANCIAL DISTRICT SQUARE",
    background:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "sallum-port",
    leftLabel: "Infrastructure",
    rightLabel: "Infrastructure",
    title: "SALLUM LAND PORT",
    background:
      "https://images.unsplash.com/photo-1541976590-713941681591?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "bin-zayed-axis",
    leftLabel: "Infrastructure",
    rightLabel: "Infrastructure",
    title: "BIN ZAYED AXIS",
    background:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "midtown-condo",
    leftLabel: "Residential",
    rightLabel: "Residential",
    title: "MIDTOWN CONDO",
    background:
      "https://images.unsplash.com/photo-1590496793929-36417d3117de?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "midtown-solo",
    leftLabel: "Residential",
    rightLabel: "Residential",
    title: "MIDTOWN SOLO",
    background:
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "fustat-park",
    leftLabel: "Urban Development",
    rightLabel: "Urban Development",
    title: "FUSTAT PARK",
    background:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=1600&auto=format&fit=crop",
  },
];

export default function HeroScrollStory() {
  const apiRef = useRef(null);

  return (
    <FullScreenScrollFX
      apiRef={apiRef}
      sections={projects}
      // ✅ غيّري الرقم ده لارتفاع النافبار الحقيقي عندك بالبكسل
      navbarHeight={80}
      header={
        <>
          <div>Our Projects</div>
          <div>From Concept to Execution</div>
        </>
      }
      footer={<div>Al-Shurok</div>}
      showProgress
      durations={{ change: 0.9, snap: 900 }}
      colors={{
        text: "#F5F6FA",
        // ✅ overlay خفيف جدًا دلوقتي عشان الصور تبان واضحة
        overlay: "rgba(40, 58, 133, 0.15)",
        pageBg: "#F8F9FD",
        stageBg: "#404041",
      }}
    />
  );
}