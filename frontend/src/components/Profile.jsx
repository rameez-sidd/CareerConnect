import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Button } from "./ui/button";
import { Mail, Pen, Pencil, Phone } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Link } from "react-router-dom";
import AppliedJobsTable from "./AppliedJobsTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const Profile = () => {
  useGetAppliedJobs()
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    
    <>
      <Navbar />
       <div className="max-w-4xl mx-auto my-12 px-3 sm:px-5 lg:px-0">

       
        <div className="bg-white flex flex-col gap-6 rounded-md border border-gray-300 shadow-md px-5 py-8 sm:px-7 md:px-8 lg:p-8 ">
          <div className="flex items-center justify-between relative">
            <div className="flex flex-col text-center md:flex-row md:text-left items-center gap-7 md:mr-6">
              <div>
                <Avatar className="h-44 w-44">
                  <AvatarImage src={user?.profile?.profilePhoto} />
                </Avatar>
              </div>
              <div className="flex flex-col gap-3 md:gap-1">
                <h1 className="font-bold text-4xl">{user?.fullName}</h1>
                {
                  user?.profile?.bio &&
                  <p className="text-justify">{user?.profile?.bio}</p> 
                }
                
              </div>
            </div>

            <Button
              variant="outline"
              className="rounded-full px-6 py-6 ml-3 self-start absolute right-0 top-[-12px] sm:right-[-8px] md:relative "
              size="icon"
              onClick={() => setOpen(true)}
            >
              <Pencil style={{ width: "25px", height: "25px" }} />
            </Button>
          </div>
          <div className="flex flex-col gap-2 mt-5">
            <div className="flex items-center gap-3">
              <Mail /> {
                user?.email ?  
                <Link target="_blank">{user?.email}</Link> :
                <span className="text-gray-500">NA</span>
              }
            </div>
            <div className="flex items-center gap-3">
              <Phone /> {
                user?.phoneNumber ?  
                <Link target="_blank">{user?.phoneNumber}</Link> :
                <span className="text-gray-500">NA</span>
              }
               
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-semibold">Skills</p>
            <div className="flex items-center gap-2 flex-wrap">
              {
                user?.profile?.skills.length === 0 ? (
                  <span className="text-gray-500">NA</span>
                ) : (
                  user?.profile?.skills.map((item, index) => (
                    <Badge
                      key={index}
                      className="bg-gray-300 text-black hover:bg-gray-300"
                    >
                      {item}
                    </Badge>
                  ))
                )
              }
              
            </div>
          </div>
          <div>
            <p className="font-semibold">Resume</p>
            {user?.profile?.resume ? (
              <Link
                to={user?.profile?.resume.replace('.pdf', '.jpg')}
                target="blank"
                className="text-blue-600 text-sm"
              >
                {user?.profile?.resumeOriginalName}
              </Link>
            ) : (
              <span className="text-gray-500">NA</span>
            )}
          </div>
        </div>

        <div className="bg-white flex flex-col gap-4 rounded-md border border-gray-300 shadow-md px-5 py-8 sm:px-7 md:px-8 lg:p-8 max-w-4xl mx-auto mt-4">
          <h1 className="font-semibold text-lg">Application Table</h1>
          <AppliedJobsTable />
        </div>
      
      <UpdateProfileDialog open={open} setOpen={setOpen} />
      </div>
    </>
  );
};

export default Profile;
