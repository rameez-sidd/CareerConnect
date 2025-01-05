import React, { useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const buttonRef = useRef(null);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); 
      buttonRef.current.click(); 
    }
  };

  const handleJobSearch = () => {
    dispatch(setSearchedQuery(query))
    navigate('/browse')
  }
  return (
    <div className="bg-[radial-gradient(circle,_#3b82f6,_#1e40af,_#1e3a8a)] grid place-items-center pt-20 pb-24 xs:py-32 sm:py-44">
      <div className="flex flex-col gap-3 text-white  max-w-3xl px-6 md:px-5 lg:px-0 ">
        <h1 className="font-bold text-white text-6xl text-left sm:text-center leading-[70px] ">
          Explore, Apply, and
          Make Your Career Shine.
        </h1>
        <p className="text-left sm:text-center sm:mx-8 md:mx-5 lg:mx-0 text-lg">
          Search through countless job openings, refine your preferences, and
          enhance your chances of landing the perfect role with a professional
          resume and smart search filters
        </p>
        <div className="flex mt-4 bg-black rounded-full items-stretch sm:mx-10 lg:mx-20" style={{boxShadow: '0 2px 8px 3px rgba(0, 0, 0, 0.3)'}}>
          <input
            className="w-full rounded-tl-full rounded-bl-full text-black outline-none px-4 py-2"
            type="search"
            placeholder="Find your dream jobs"
            onChange={(e)=>setQuery(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <div className="rounded-tr-full rounded-br-full flex items-center">
            <Button onClick={handleJobSearch} ref={buttonRef} className="rounded-tr-full rounded-br-full h-full bg-black hover:bg-gray-800">
              <Search />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
