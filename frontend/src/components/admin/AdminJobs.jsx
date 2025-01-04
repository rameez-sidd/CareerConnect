import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'

const AdminJobs = () => {
    useGetAllAdminJobs()
    const [input, setInput] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(setSearchJobByText(input))
    }, [input])
  return (
    <div>
        <Navbar/>
        <div className='max-w-5xl mx-auto my-16 flex flex-col gap-12 px-3 lg:px-0 '>
            <div className='flex flex-col gap-3 sm:flex-row sm:items-center justify-between'>
                <Input placeholder="Filter by role, company" className="w-full sm:w-fit bg-white" onChange={(e)=>setInput(e.target.value)}/>
                <Button onClick={()=> navigate('/admin/jobs/create')} className="bg-sky-700 hover:bg-sky-900">New Job</Button>
            </div>
            <div className='border border-gray-300 rounded-md shadow-md bg-white'>
                <AdminJobsTable/>
            </div>
        </div>
    </div>
  )
}

export default AdminJobs