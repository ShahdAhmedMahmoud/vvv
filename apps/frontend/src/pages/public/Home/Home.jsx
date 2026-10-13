
import AboutSection from "../../../components/AboutSection/AboutSection";
import BricksAccentBackground from "../../../components/BricksAccentBackground/BricksAccentBackground";
import FlowScroll, { FlowSection } from "../../../components/FlowScroll/FlowScroll";
import Hero from "../../../components/Hero/Hero";
import PartnersSection from "../../../components/PartnersSection/PartnersSection";
import ProjectsSection from "../../../components/ProjectsSection/ProjectsSection";

import ServicesSection from "../../../components/ServiceSection/ServiceSection";
import TestimonialsSection from "../../../components/TestimonialsSection/TestimonialsSection";
import TimelineHeader from "../../../components/TimelineHeader/TimelineHeader";
import TimelineSection from "../../../components/TimelineSection/TimelineSection";

export default function Home() {
  return (
    <FlowScroll aria-label="Home Sections">
     
      <FlowSection aria-label="Hero" className="bg-[#404041]" flat skipPin>
        <Hero />
      </FlowSection>

      {/* ABOUT */}
      <FlowSection aria-label="About" className="bg-[#F8F9FD]">
        {/* <BricksAccentBackground
          backgroundColor="#F8F9FD"
          showMortar={false}
          opacity={1}
          rows={5}
          edgeWidth={250}
        > */}
          <AboutSection />
        {/* </BricksAccentBackground> */}
      </FlowSection>

      {/* SERVICES */}
      <FlowSection aria-label="Services" className="bg-[#3C3C3B]">
        <ServicesSection />
      </FlowSection>

      {/* PROJECTS */}
      <FlowSection aria-label="Projects" className="bg-[#F8F9FD]">
        <ProjectsSection />
      </FlowSection>

      {/* TIMELINE */}
      {/* <FlowSection aria-label="Timeline" className="bg-[#1E2432]">
        <TimelineHeader />
        <TimelineSection />
      </FlowSection> */}

      {/* TESTIMONIALS */}
      <FlowSection aria-label="Testimonials" className="bg-[#1E2432]">
        <TestimonialsSection />
      </FlowSection>

      {/* PARTNERS */}
      <FlowSection aria-label="Partners" className="bg-[#F8F9FD]">
        <PartnersSection />
      </FlowSection>
    </FlowScroll>
  );
}
