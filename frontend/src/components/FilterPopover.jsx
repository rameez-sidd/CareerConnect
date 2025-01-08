import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

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

const FilterPopover = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className="flex items-center justify-between w-full">
      <Popover>
        <PopoverTrigger>
          <div className="bg-black text-white hover:bg-gray-800 focus:ring-2 focus:ring-black rounded-md px-4 py-2 text-sm font-medium transition-colors">
            Filter
          </div>
        </PopoverTrigger>
        <PopoverContent className=" ml-2 sm:ml-3 md:ml-6 lg:ml-8">
          <div className="flex flex-col gap-5 text-md">
            {filterData.map((filter, index) => {
              return (
                <RadioGroup
                  value={selectedValue}
                  onValueChange={handleChange}
                  defaultValue="comfortable"
                  key={index}
                  className="flex flex-col gap-1"
                >
                  <p className="font-semibold">{filter.filterType}</p>
                  <div className="flex flex-col gap-2">
                    {filter.array.map((item, idx) => {
                      const itemId = `id${index}-${idx}`;
                      return (
                        <div
                          className="flex items-center space-x-2 text-xs"
                          key={itemId}
                        >
                          <RadioGroupItem id={item} value={item} />
                          <Label
                            htmlFor={item}
                            className="font-light whitespace-nowrap text-xs"
                          >
                            {item}
                          </Label>
                        </div>
                      );
                    })}
                  </div>
                </RadioGroup>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
      <Button
        variant="link"
        className="text-sm text-blue-500 px-2"
        onClick={() => handleChange("")}
      >
        Reset
      </Button>
    </div>
  );
};

export default FilterPopover;
