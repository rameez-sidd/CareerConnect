import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { Button } from "./ui/button";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi", "Bengaluru", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "FullStack Developer",
      "Data Science",
      "Data Analyst",
    ],
  },
  
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('')
  const dispatch = useDispatch()

  const handleChange = (value) => {
    setSelectedValue(value)
  }

  useEffect(()=> {
    dispatch(setSearchedQuery(selectedValue))
  }, [selectedValue])
  return (
    <div className="flex flex-col gap-3 ">
      <div className="flex items-center justify-between w-48">
      <h1 className="font-bold text-lg whitespace-nowrap">Filter Jobs</h1>
      <Button variant="link" className="text-xs text-blue-500 px-0" onClick={()=> handleChange('')}>Reset</Button>
      </div>
        <hr/>
      <div className="flex flex-col gap-5">
        {filterData.map((filter, index) => {
          return (
            <RadioGroup value={selectedValue} onValueChange={handleChange} defaultValue="comfortable" key={index} className="flex flex-col gap-1">
              <p className="font-semibold">{filter.filterType}</p>
              <div className="flex flex-col gap-2">
                {filter.array.map((item, idx) => {
                  const itemId = `id${index}-${idx}`
                  return (
                    <div className="flex items-center space-x-2 text-sm" key={itemId}>
                      <RadioGroupItem value={item} id={itemId}/>
                      <Label className="font-light whitespace-nowrap" htmlFor={itemId}>{item}</Label>
                    </div>
                  );
                })}
              </div>
            </RadioGroup>
          );
        })}
      </div>
    </div>
  );
};

export default FilterCard;
