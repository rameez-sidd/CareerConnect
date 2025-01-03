import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import JobCard from "./JobCard";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import FilterPopover from "./FilterPopover";

const Jobs = () => {
  const {allJobs, searchedQuery} = useSelector(store=>store.job)
  const [filteredJobs, setFilteredJobs] = useState(allJobs)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(setSearchedQuery(''))
  },[])

  useEffect(()=>{
    
    if(searchedQuery){
      const filteredJobs = allJobs.filter((job)=>{
        return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchedQuery.toLowerCase()) 
      })  
      setFilteredJobs(filteredJobs)
    } else{
      setFilteredJobs(allJobs)
    }
    
  }, [allJobs, searchedQuery])

  
 
  return (
    <div>
      <div className="h-screen flex flex-col">
        <Navbar />
        <div className="px-0 sm:px-1 md:px-3 lg:px-5 xl:px-16 py-10 flex flex-col xl:flex-row overflow-hidden gap-5 xl:gap-2">
          <div className="flex xl:hidden px-2 md:px-3">
            <FilterPopover/>
          </div>
          <div className="hidden xl:block">
            <FilterCard />
          </div>
          <div className=" w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 xl:gap-5 px-2 md:px-3 overflow-y-scroll jobs">
            {filteredJobs?.length !== 0 ? (
              filteredJobs.map((job) => <JobCard key={job?._id} job={job} />)
            ) : (
              <span>No Jobs Available</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
