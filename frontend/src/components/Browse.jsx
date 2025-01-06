import React, { useEffect, useRef, useState } from "react";
import Navbar from "./shared/Navbar";
import JobCard from "./JobCard";
import { Ban, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {setSearchedQuery } from "@/redux/jobSlice";
import Fuse from 'fuse.js'
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Browse = () => {
  useGetAllJobs()
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filteredJobs, setFilteredJobs] = useState(allJobs)
  const dispatch = useDispatch();
  const buttonRef = useRef(null);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); 
      buttonRef.current.click(); 
    }
  };

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


  // useEffect(()=>{
  //   const fetchAllJobs = async ()=> {
  //     try {
  //         const res = await axios.get(`${JOB_API_ENDPOINT}/get?keyword=${searchedQuery}`, {withCredentials: true})
  //         if(res.data.success){
  //             dispatch(setAllJobs(res.data.jobs))
  //         }
  //     } catch (error) {
  //         console.log(error);
          
  //     }
  // }
  // fetchAllJobs()
  // }, [searchedQuery])


  
  return (
    <div>
      <Navbar />
      <div className="px-3 py-10 md:px-6 lg:px-10 flex flex-col gap-4 bg-gray-100">
        <div className="flex  rounded-full items-stretch mb-5">
          <input
            className="border border-gray-300 outline-none w-full rounded-full bg-white text-black px-4 py-2"
            type="search"
            placeholder="Find your dream jobs"
            onChange={(e) => dispatch(setSearchedQuery(e.target.value))}
            onKeyDown={handleKeyPress}
            value={searchedQuery}
          />
          <div className="rounded-tr-full rounded-br-full flex items-center">
            
          </div>
        </div>
        <h1>Search Results ({filteredJobs.length})</h1>
        {filteredJobs.length <= 0 ? (
          <p className="text-sm text-gray-500">No Jobs Found !!!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredJobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
