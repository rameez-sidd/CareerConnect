import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useNavigate } from "react-router-dom";

const JobCard = ({job}) => {
  const navigate = useNavigate()

  const daysAgo = (mongodbTime)=>{
    const createdAt = new Date(mongodbTime)
    const currentTime = new Date()
    const timeDiff = currentTime - createdAt
    return Math.floor(timeDiff/(24 * 60 * 60 * 1000))
  }

  return (
    <div className="flex flex-col gap-3 shadow-xl p-3 rounded-md cursor-pointer border border-gray-300 bg-white">
      <div className="flex items-center justify-between">
        <p className="self-start text-xs text-gray-600">{daysAgo(job?.createdAt) === 0 ? "Today" : `${daysAgo(job?.createdAt)} days ago`}</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>
      <div className="flex items-center gap-3">
        <div>
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </div>
        <div>
          <h2 className="font-semibold">{job?.company?.name}</h2>
          <p className="text-sm text-gray-600">{job?.location}</p>
        </div>
      </div>
      <div className="flex flex-col">
        <h2 className="font-semibold">{job?.title}</h2>
        <p className="text-sm text-gray-600 line-clamp-2">
          {job?.description}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Badge variant="ghost" className="text-sky-700">{job?.position} Positions</Badge>
        <Badge variant="ghost" className="text-rose-700">{job?.jobType}</Badge>
        <Badge variant="ghost" className="text-fuchsia-800">{job?.salary}LPA</Badge>
      </div>
      <div className="flex items-center gap-2">
        <Button className="bg-gray-200 text-black hover:bg-gray-300" onClick={()=> navigate(`/jobs/description/${job?._id}`)}>Details</Button>
        <Button className="bg-sky-700 hover:bg-sky-600">Save for Later</Button>
      </div>
    </div>
  );
};

export default JobCard;
