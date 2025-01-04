import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'

const Companies = () => {
    useGetAllCompanies()
    const [input, setInput] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(setSearchCompanyByText(input))
    }, [input])
  return (
    <div>
        <Navbar/>
        <div className='max-w-5xl mx-auto my-12 flex flex-col gap-10 px-3 lg:px-0 '>
            <div className='flex flex-col gap-3 sm:flex-row sm:items-center justify-between'>
                <Input placeholder="Filter by name" className="w-full sm:w-fit bg-white" onChange={(e)=>setInput(e.target.value)}/>
                <Button onClick={()=> navigate('/admin/companies/create')} className="bg-sky-700 hover:bg-sky-900">New Company</Button>
            </div>
            <div className='border border-gray-300 rounded-md shadow-md bg-white'>
                <CompaniesTable/>
            </div>
        </div>
    </div>
  )
}

export default Companies