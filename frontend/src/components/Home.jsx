import Navbar from '../shared/Navbar'
import React from 'react'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from '../shared/Footer'
import useGetAllJobs from '@/Hooks/useGetAllJobs'

function Home() {
  useGetAllJobs();
  return (
    <>
    <Navbar/>
    <HeroSection/>
    <CategoryCarousel/>
    <LatestJobs/>
    <Footer/>
    
    </>
  )
}

export default Home