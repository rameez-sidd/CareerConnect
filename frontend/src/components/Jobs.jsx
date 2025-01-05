import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import JobCard from "./JobCard";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import FilterPopover from "./FilterPopover";
import Fuse from 'fuse.js'

const Jobs = () => {
  const {allJobs, searchedQuery} = useSelector(store=>store.job)
  const [filteredJobs, setFilteredJobs] = useState(allJobs)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(setSearchedQuery(''))
  },[])

  const fuseOptions = {
    keys: ["title", "description", "location"], // Fields to search
    threshold: 0.4, // Adjust based on matching flexibility
  };

  useEffect(()=>{
    
    if (searchedQuery) {
      const fuse = new Fuse(allJobs, fuseOptions);

      // Perform fuzzy search
      const results = fuse.search(searchedQuery);

      // Map results back to original job objects
      setFilteredJobs(results.map((result) => result.item));
    } else {
      // Reset to all jobs if no search query
      setFilteredJobs(allJobs);
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
