import Navbar from '../shared/Navbar'
import React, { useEffect } from 'react'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from '../shared/Footer'
import useGetAllJobs from '@/Hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Home() {
  useGetAllJobs();
  const {user} = useSelector(store=>store.auth)
  const navigate = useNavigate()
  useEffect(()=>{
    if(user?.role === "recruiter"){
     navigate("/admin/companies")
    }
  },[user])
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