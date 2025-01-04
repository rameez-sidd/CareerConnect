import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { APPLICATION_API_ENDPOINT } from '@/utils/constant'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setApplicants } from '@/redux/applicationSlice'

const Applicants = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const {applicants} = useSelector(store=>store.application)
    

    useEffect(()=>{
        const fetchAllApplicants = async ()=> {
            try {
                const res = await axios.get(`${APPLICATION_API_ENDPOINT}/${params.id}/applicants`, {withCredentials: true})
                
                if(res.data.success){
                    dispatch(setApplicants(res.data.job))
                    
                }
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchAllApplicants()
    }, [])


  return (
    <div>
        <Navbar/>
        <div className='max-w-7xl mx-auto my-12 flex flex-col gap-4 px-3 xl:px-0'>
            <h1 className='font-semibold text-xl'>Applicants ({applicants?.applications?.length})</h1>
            <div className='border border-gray-300 rounded-md shadow-md bg-white'>
                <ApplicantsTable/>

            </div>
        </div>
    </div>
  )
}

export default Applicants