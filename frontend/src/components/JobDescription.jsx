import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useNavigate, useParams } from "react-router-dom";
import { setSingleJob } from "@/redux/jobSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from "@/utils/constant";
import { toast } from "react-toastify";

const JobDescription = () => {
    const navigate = useNavigate()
    const params = useParams()
    const jobId = params.id
    const {singleJob} = useSelector(store=>store.job)
    const {user} = useSelector(store=>store.auth)
    const dispatch = useDispatch()
    const isInitiallyApplied = singleJob?.applications?.some(application=>application.applicant === user?._id) || false
    const [isApplied, setIsApplied] = useState(isInitiallyApplied)

    useEffect(()=> {
        const fetchSingleJob = async ()=> {
            try {
                const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {withCredentials: true})
                if(res.data.success){
                    dispatch(setSingleJob(res.data.job))
                    setIsApplied(res.data.job.applications.some(application=>application.applicant === user?._id))
                }
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchSingleJob()
    }, [jobId, dispatch, user?._id])

    useEffect(()=>{
      return () => {
        dispatch(setSingleJob(null))
      };
    }, [])

    const applyJob = async () => {
        if(user === null){
          navigate('/signup')
        }
        try {
            const res = await axios.get(`${APPLICATION_API_ENDPOINT}/apply/${jobId}`, {withCredentials: true})
            if(res.data.success){
                setIsApplied(true)
                const updateSingleJob = {...singleJob, applications:[...singleJob.applications, {applicant: user?._id}]}
                dispatch(setSingleJob(updateSingleJob))
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
            
        }
    }

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-2 sm:mx-4 xl:mx-auto my-8 border border-gray-300 rounded-md shadow-xl py-10 px-4 sm:px-6 md:px-8 lg:p-10 bg-white">
        <div className="flex flex-col gap-10">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-3">
              <h1 className="font-bold text-2xl">{singleJob?.title}</h1>
              <div className="flex items-center gap-2">
                <Badge variant="ghost" className="text-sky-700">{singleJob?.position} Positions</Badge>
                <Badge variant="ghost" className="text-rose-700">{singleJob?.jobType}</Badge>
                <Badge variant="ghost" className="text-fuchsia-800">{singleJob?.salary}LPA</Badge>
              </div>
            </div>
            <div className="hidden sm:block">
                {
                    !isApplied ? 
                    (<Button className="bg-sky-700 hover:bg-sky-900" onClick={applyJob}>Apply</Button>) :
                    (<Button className="cursor-not-allowed bg-gray-400 hover:bg-gray-400">Already Applied</Button>)
                }
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <h1 className="text-xl font-semibold border-b-2 pb-3">Job Description</h1>
            <div className="flex flex-col gap-4">
                <div className="font-semibold">Company : <span className="font-normal ml-2">{singleJob?.company?.name}</span></div>
                <div className="font-semibold">Role : <span className="font-normal ml-2">{singleJob?.title}</span></div>
                <div className="font-semibold">Location : <span className="font-normal ml-2">{singleJob?.location}</span></div>
                <div className="font-semibold ">Description : <span className="font-normal ml-2">{singleJob?.description}</span></div>
                <div className="font-semibold">Experience : <span className="font-normal ml-2">{singleJob?.experience} years</span></div>
                <div className="font-semibold">Salary : <span className="font-normal ml-2">{singleJob?.salary}LPA</span></div>
                <div className="font-semibold">Total Applicants : <span className="font-normal ml-2">{singleJob?.applications?.length}</span></div>
                <div className="font-semibold">Posted Date : <span className="font-normal ml-2">{singleJob?.createdAt.split("T")[0]}</span></div>
            </div>
          </div>
          <div className="sm:hidden">
                {
                    !isApplied ? 
                    (<Button className="bg-sky-700 hover:bg-sky-900 w-full" onClick={applyJob}>Apply</Button>) :
                    (<Button className="cursor-not-allowed bg-gray-400 hover:bg-gray-400 w-full">Already Applied</Button>)
                }
            </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
