import React from 'react'
import LatestJobCards from './LatestJobCards'
import { useSelector } from 'react-redux'


const LatestJobs = () => {
  const {allJobs} = useSelector(store=>store.job)

  return (
    <div className='flex flex-col py-8 md:py-12 px-3 md:px-6 lg:px-8 xl:px-12 gap-8 lg:gap-10 bg-gray-100'>
        <h1 className='text-3xl font-semibold'><span className='text-sky-700 font-bold'>Latest & Top</span> Job Openings</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 items-stretch'>
            {
              allJobs?.length !== 0 ? allJobs.slice(0,6).map((job)=>(<LatestJobCards key={job?._id} job={job}/>)) : <span>No Jobs Available</span>
            }
        </div>
    </div>
  )
}

export default LatestJobs