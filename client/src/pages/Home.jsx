import React from 'react'
import Hero from '../components/Hero'

import BelowHero from '../components/BelowHero'
import InfoCard from '../components/InfoCard'
import Accordian from "../components/Accordian/Accordian"

function Home() {
  return (
    <div className='flex-grow mt-20'>
        <Hero />
        <BelowHero />
        <InfoCard />
        <Accordian/>
    </div>
  )
}

export default Home