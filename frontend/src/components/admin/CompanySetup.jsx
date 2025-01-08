import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { COMPANY_API_ENDPOINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById";
import { setSingleCompany } from "@/redux/companySlice";

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id)
  const [loading, setLoading] = useState(false);
  const {singleCompany} = useSelector(store=>store.company)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    logo: null,
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const logo = e.target.files?.[0];
    setInput({ ...input, logo });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.logo) {
      formData.append("file", input.logo);
    }
    // api call
    try {
      setLoading(true);
      const res = await axios.put(`${COMPANY_API_ENDPOINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=> {
    return () => {
      dispatch(setSingleCompany(null))
    };
  }, [])

  useEffect(()=> {
    setInput({
      name: singleCompany?.name || "",
      description: singleCompany?.description || "",
      website: singleCompany?.website || "",
      location: singleCompany?.location || "",
      logo: singleCompany?.file || null,
    })
  }, [singleCompany])

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-8 px-3 lg:px-0">

      
      <div className="px-5 py-8 sm:p-8 border border-gray-300 rounded-md shadow-md bg-white ">
        <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
          <div className="flex items-center gap-5">
            <Button type="button" variant="outline" className="flex items-center gap-2" onClick={()=> navigate('/admin/companies')}>
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-2xl">Company Setup</h1>
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <Label htmlFor="name">Company Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={input.name}
                onChange={handleChange}
                required
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
                required
              />
            </div>
            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                type="text"
                id="website"
                name="website"
                value={input.website}
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
                required
              />
            </div>
            <div>
              <Label htmlFor="logo">Logo</Label>
              <Input type="file" id="logo" onChange={handleFileChange} required />
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
                <span>Update</span>
              )}
            </Button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
};

export default CompanySetup;
