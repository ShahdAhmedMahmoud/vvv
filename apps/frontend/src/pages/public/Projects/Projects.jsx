import React from 'react'

import ProjectsHero from '../../../components/ProjectsHero/ProjectsHero'
import SectorFilterSection from '../../../components/SectorFilterSection/SectorFilterSection'

import FlowScroll, { FlowSection } from '../../../components/FlowScroll/FlowScroll'
import ProjectsCTASection from '../../../components/Projectsctasection/Projectsctasection'
import SawCutHeroSection from '../../../components/SawCutHeroSection/SawCutHeroSection'


export default function Projects() {
  return<>
    <FlowScroll aria-label="Our Projects" className="">
      <FlowSection aria-label="Hero" className="bg-[#FFFFFF]" >
        <ProjectsHero />
      </FlowSection>

      <FlowSection aria-label="Sectors" className="bg-[#F8F9FD]" >
        <SectorFilterSection />
      </FlowSection>
      <FlowSection aria-label="CTA" className="bg-[#FFFFFF]" >
        <ProjectsCTASection />
      </FlowSection>
    </FlowScroll>
  
  </>
}
