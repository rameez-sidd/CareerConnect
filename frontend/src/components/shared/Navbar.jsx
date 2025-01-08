import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import { USER_API_ENDPOINT } from "@/utils/constant";
import axios from "axios";
import { toast } from "react-toastify";
import { setUser } from "@/redux/authSlice";
import Hamburger from "./Hamburger";
import { setAllAdminJobs, setAllAppliedJobs } from "@/redux/jobSlice";
import { setCompanies } from "@/redux/companySlice";


const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${USER_API_ENDPOINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        dispatch(setAllAppliedJobs([]))
        dispatch(setCompanies([]))
        dispatch(setAllAdminJobs([]))
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div
      className="flex justify-between items-center px-3 xl:px-40 sm:px-4 md:px-12 lg:px-24 py-3 relative top-0 w-full bg-white"
      style={{ boxShadow: "rgba(0, 0, 0, 0.3) 0px 4px 17px 0px" }}
    >
      <h1 className="text-2xl font-semibold">
        Career<span className="text-sky-700 font-bold">Connect</span>
      </h1>
      <div className="sm:hidden flex items-center justify-center ">
        <Hamburger />
      </div>
      <div className="items-center justify-between sm:gap-3 md:gap-10  hidden sm:flex">
        <ul className="list-none flex items-center gap-5 font-semibold text-sm">
          {user && user.role === "recruiter" ? (
            <>
              <li className="hover:text-sky-700">
                <NavLink
                  className={(e) => {
                    return e.isActive ? "text-sky-700" : "";
                  }}
                  to="/admin/companies"
                >
                  Companies
                </NavLink>
              </li>
              <li className="hover:text-sky-700">
                <NavLink
                  className={(e) => {
                    return e.isActive ? "text-sky-700" : "";
                  }}
                  to="/admin/jobs"
                >
                  Jobs
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="hover:text-sky-700">
                <NavLink
                  className={(e) => {
                    return e.isActive ? "text-sky-700" : "";
                  }}
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li className="hover:text-sky-700">
                <NavLink
                  className={(e) => {
                    return e.isActive ? "text-sky-700" : "";
                  }}
                  to="/jobs"
                >
                  Jobs
                </NavLink>
              </li>
              <li className="hover:text-sky-700">
                <NavLink
                  className={(e) => {
                    return e.isActive ? "text-sky-700" : "";
                  }}
                  to="/browse"
                >
                  Browse
                </NavLink>
              </li>
            </>
          )}
        </ul>
        {!user ? (
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-sky-700 hover:bg-sky-900">SignUp</Button>
            </Link>
          </div>
        ) : (
          <div>
            <Popover>
              <PopoverTrigger>
                <Avatar>
                  <AvatarImage src={user?.profile?.profilePhoto} />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={user?.profile?.profilePhoto} />
                    </Avatar>
                    <div>
                      <h2 className="font-semibold">{user?.fullName}</h2>
                      <p className="text-xs text-gray-500 line-clamp-2">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-start text-sm">
                    {user && user.role === "student" && (
                      <div className="flex items-center">
                        <User2 />
                        <Button variant="link">
                          <Link to="/profile">View Profile</Link>
                        </Button>
                      </div>
                    )}

                    <div className="flex items-center">
                      <LogOut />
                      <Button variant="link" onClick={handleLogout}>
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
