import React from 'react'
import Hero from '../components/Hero'

import BelowHero from '../components/BelowHero'
import InfoCard from '../components/InfoCard'
import Accordian from "../components/Accordian/Accordian"
import Testimodel from '../components/Testimodel'

function Home() {
  return (
    <div className='flex-grow'>
        <Hero />
        <BelowHero />
        <InfoCard />
        <Accordian/>
        <Testimodel/>
    </div>
  )
}

export default Home