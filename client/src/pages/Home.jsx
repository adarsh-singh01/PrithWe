import React from 'react'
import Hero from '../components/Hero'

import BelowHero from '../components/BelowHero'
import InfoCard from '../components/InfoCard'



function Home() {
  return (
    <div className='flex-grow'>
        <Hero />
        <BelowHero />
        <InfoCard />
    </div>
  )
}

export default Home