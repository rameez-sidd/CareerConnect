import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "../ui/select";
import { SelectValue } from "@radix-ui/react-select";
import axios from "axios";
import { JOB_API_ENDPOINT } from "@/utils/constant";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const companyArray = [];

const PostJob = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value) => {
    const selectedCompany = companies.find(
      (company) => company?.name.toLowerCase() === value
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_ENDPOINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-8 px-3 lg:px-0">
        <div className="py-8 px-5 sm:p-8 border border-gray-300 rounded-md shadow-md bg-white">
          <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
            <div className="flex items-center gap-5">
              <Button
                type="button"
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => navigate("/admin/jobs")}
              >
                <ArrowLeft />
                <span>Back</span>
              </Button>
              <h1 className="font-bold text-2xl">Create New Job</h1>
            </div>
            <div className="flex flex-col gap-3">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  type="text"
                  id="title"
                  name="title"
                  value={input.title}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  type="text"
                  id="description"
                  name="description"
                  value={input.description}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="requirements">Requirements</Label>
                <Input
                  type="text"
                  id="requirements"
                  name="requirements"
                  value={input.requirements}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  type="text"
                  id="location"
                  name="location"
                  value={input.location}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="jobType">Job Type</Label>
                <Input
                  type="text"
                  id="jobType"
                  name="jobType"
                  value={input.jobType}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-stretch">
                <div className="">
                  <Label htmlFor="salary">Salary (in LPA)</Label>
                  <Input
                    type="number"
                    id="salary"
                    name="salary"
                    value={input.salary}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label htmlFor="experience">
                    Experience Level (in years)
                  </Label>
                  <Input
                    type="number"
                    id="experience"
                    name="experience"
                    value={input.experience}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="position">No. of Positions</Label>
                  <Input
                    type="number"
                    id="position"
                    name="position"
                    value={input.position}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="company">Company</Label>
                  {companies.length > 0 && (
                    <Select onValueChange={handleSelectChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Company" />
                      </SelectTrigger>
                      <SelectContent>
                        {companies.map((company) => {
                          return (
                            <SelectItem
                              key={company?._id}
                              value={company?.name?.toLowerCase()}
                            >
                              {company.name}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-[-10px]">
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-sky-700 hover:bg-sky-900"
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <span>Create</span>
                )}
              </Button>
            </div>
            {companies.length === 0 && (
              <p className="text-xs text-red-600 font-bold mx-auto mt-[-25px]">
                *Please register a company first, before posting a job
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
