import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchedQuery } from '@/redux/jobSlice'

const Home = () => {
  useGetAllJobs()
  const {user} = useSelector(store=>store.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  useEffect(()=> {
    if(user?.role === 'recruiter'){
      navigate('/admin/companies')
    } 
  })

   useEffect(()=>{
      dispatch(setSearchedQuery(''))
    },[])
  
  
  return (
    <div>
        <Navbar/>
        <HeroSection/>
        <LatestJobs/>
        <Footer/>
    </div>
  )
}

export default Home