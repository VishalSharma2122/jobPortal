import Navbar from '../shared/Navbar'
import React from 'react'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'

function Home() {
  return (
    <>
    <Navbar/>
    <HeroSection/>
    <CategoryCarousel/>
    </>
  )
}

export default Home