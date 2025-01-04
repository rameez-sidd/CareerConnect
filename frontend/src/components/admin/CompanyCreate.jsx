import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_ENDPOINT } from '@/utils/constant'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const CompanyCreate = () => {

    const navigate = useNavigate()
    const [companyName, setCompanyName] = useState()
    const dispatch = useDispatch()

    const registerNewCompany = async ()=> {
        try {
            const res = await axios.post(`${COMPANY_API_ENDPOINT}/register`, {companyName}, {
                headers:{
                    'Content-Type' : 'application/json'
                },
                withCredentials: true
            })

            if(res?.data?.success){
                dispatch(setSingleCompany(res.data.company))
                toast.success(res.data.message)
                const companyId = res?.data?.company?._id
                navigate(`/admin/companies/${companyId}`)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
            
        }
    }
  return (
    <div>
        <Navbar/>
        <div className='max-w-4xl mx-auto my-16 flex flex-col gap-12  px-3 sm:px-8 md:px-12 lg:px-0 '>
            <div className='flex flex-col gap-1'>
                <h1 className='font-bold text-2xl'>Your Company Name</h1>
                <p className='text-gray-500'>What would you like to give your Company name? You can change this later.</p>
            </div>
            <div className='flex flex-col gap-5'>
                <Input className="bg-white" placeholder='Microsoft, Google etc.' required onChange={(e)=>setCompanyName(e.target.value)}/>
                <div className='flex items-center gap-4'>
                    <Button variant="outline" onClick={()=>navigate('/admin/companies')}>Cancel</Button>
                    <Button onClick={registerNewCompany}  className="bg-sky-700 hover:bg-sky-900">Continue</Button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CompanyCreate