import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, Menu, User2 } from "lucide-react";
import { Button } from "../ui/button";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/constant";
import { toast } from "react-toastify";
import { setUser } from "@/redux/authSlice";
import { setAllAdminJobs, setAllAppliedJobs } from "@/redux/jobSlice";
import { setCompanies } from "@/redux/companySlice";

const Hamburger = () => {
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
    <div className="flex items-center justify-center">
      <Popover>
        <PopoverTrigger>
          <Menu />
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col border-b border-gray-200 py-3 pb-7">
            {!user ? (
              <div className="flex flex-col gap-3">
                <Link to="/login">
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="w-full bg-sky-700 hover:bg-sky-900">
                    SignUp
                  </Button>
                </Link>
              </div>
            ) : (
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
            )}
          </div>
          <div className="pt-5">
            <ul className="list-none flex flex-col gap-5 font-semibold text-sm">
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
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Hamburger;
