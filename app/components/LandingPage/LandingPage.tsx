import React from 'react'
import LandingNavbar from './LandingNavbar'
import HeroSection from './HeroSection'
import LevelUp from './LevelUp'
import MoreFeature from './MoreFeature'

function LandingPage() {
  return (
    <div className='bg-[#fafaf2] h-full'>
        <LandingNavbar/>
        <HeroSection/>
        <LevelUp/>
        <MoreFeature/>
    </div>
  )
}

export default LandingPage