import React, { useEffect, useRef, useState } from "react";
import Navbar from "./shared/Navbar";
import JobCard from "./JobCard";
import { Ban, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setAllJobs, setSearchedQuery } from "@/redux/jobSlice";
import useGetJobsByQuery from "@/hooks/useGetJobsByQuery";
import axios from "axios";
import { JOB_API_ENDPOINT } from "@/utils/constant";

const Browse = () => {
  useGetJobsByQuery();
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const buttonRef = useRef(null);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); 
      buttonRef.current.click(); 
    }
  };


  useEffect(()=>{
    const fetchAllJobs = async ()=> {
      try {
          const res = await axios.get(`${JOB_API_ENDPOINT}/get?keyword=${searchedQuery}`, {withCredentials: true})
          if(res.data.success){
              dispatch(setAllJobs(res.data.jobs))
          }
      } catch (error) {
          console.log(error);
          
      }
  }
  fetchAllJobs()
  }, [searchedQuery])


  // useEffect(() => {
  //   return () => {
  //     dispatch(setSearchedQuery(""));
  //   };
  // }, []);
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
        <h1>Search Results ({allJobs.length})</h1>
        {allJobs.length <= 0 ? (
          <p className="text-sm text-gray-500">No Jobs Found !!!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {allJobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
