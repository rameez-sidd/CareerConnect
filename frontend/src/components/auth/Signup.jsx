import React, { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_ENDPOINT } from "@/utils/constant";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Eye, Loader2 } from "lucide-react";
import Navbar from "../shared/Navbar";

const Signup = () => {
  const passwordInput = useRef();
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    // api call
    try {
      setLoading(true);
      const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-2xl my-16 px-3 md:px-0">
        <div className="bg-white flex flex-col  gap-10 border border-gray-300 rounded-md shadow-md pt-8 pb-10 ">
          <h1 className="font-bold text-3xl text-center">SignUp</h1>
          <form onSubmit={handleSubmit} className="px-6 sm:px-8 flex flex-col gap-6">
            <div>
              <Label htmlFor="fullname">Full Name</Label>
              <Input
                type="text"
                placeholder="John Doe"
                id="fullname"
                value={input.fullName}
                name="fullName"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                placeholder="johndoe@example.com"
                id="email"
                value={input.email}
                name="email"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                type="tel"
                placeholder="8080808080"
                id="phone"
                value={input.phoneNumber}
                name="phoneNumber"
                onChange={handleChange}
                required
                minLength="10"
                maxLength="10"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="flex items-center border border-gray-200 rounded-md relative">
                <Input
                  type="password"
                  id="password"
                  value={input.password}
                  name="password"
                  placeholder="••••••••"
                  onChange={handleChange}
                  required
                  className="border-none "
                  ref={passwordInput}
                />
                <Button
                  type="button"
                  onClick={() =>
                    passwordInput.current.type === "text"
                      ? (passwordInput.current.type = "password")
                      : (passwordInput.current.type = "text")
                  }
                  className="absolute right-0 rounded-none rounded-tr-md rounded-br-md px-2 bg-white text-black shadow-none hover:bg-white"
                >
                  <Eye style={{ width: "20px", height: "20px" }} />
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Input
                    type="radio"
                    name="role"
                    value="student"
                    id="student"
                    className="w-4 cursor-pointer"
                    checked={input.role === "student"}
                    onChange={handleChange}
                    required
                  />
                  <Label htmlFor="student">Student</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="radio"
                    name="role"
                    value="recruiter"
                    id="recruiter"
                    className="w-4 cursor-pointer"
                    checked={input.role === "recruiter"}
                    onChange={handleChange}
                    required
                  />
                  <Label htmlFor="recruiter">Recruiter</Label>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Label htmlFor="file" className="cursor-pointer">
                  Profile
                </Label>
                <Input
                  accept="image/*"
                  id="file"
                  type="file"
                  className="cursor-pointer"
                  required
                  onChange={handleFileChange}
                />
              </div>
            </div>

            <Button disabled={loading} className=" bg-sky-700 hover:bg-sky-900">
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <span>SignUp</span>
              )}
            </Button>
            <span className="text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-sky-800">
                Login
              </Link>
            </span>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
