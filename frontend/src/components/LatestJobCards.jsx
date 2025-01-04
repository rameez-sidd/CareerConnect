import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({job}) => {
  const navigate = useNavigate()
  return (
    <div onClick={()=>navigate(`/jobs/description/${job._id}`)} className='flex flex-col gap-3 shadow-xl p-6 rounded-md cursor-pointer border border-gray-300 bg-white'>
        <div>
            <h2 className='font-semibold'>{job?.company?.name}</h2>
            <p className='text-sm text-gray-700'>{job?.location}</p>
        </div>
        <div className='flex flex-col'>
            <h2 className='font-semibold'>{job?.title}</h2>
            <p className='text-sm text-gray-600 line-clamp-2'>{job?.description}</p>
        </div>
        <div className='flex items-center gap-3'>
            <Badge variant="ghost" className="text-sky-700">{job?.position} Positions</Badge>
            <Badge variant="ghost" className="text-rose-700">{job?.jobType}</Badge>
            <Badge variant="ghost" className="text-fuchsia-800">{job?.salary}LPA</Badge>
        </div>
    </div>
  )
}

export default LatestJobCards