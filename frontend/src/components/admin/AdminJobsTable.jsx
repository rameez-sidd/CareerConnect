import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filteredJobs, setFilteredJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJobs =
      allAdminJobs.length >= 0 &&
      allAdminJobs.filter((job) => {
        if (!searchJobByText) {
          return true;
        }
        return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase());
      });
    setFilteredJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div>
      
        <Table className="table-auto min-w-max">
          <TableHeader>
            <TableRow>
              <TableHead>Role</TableHead>
              <TableHead className="pl-4">Company Name</TableHead>
              <TableHead className="pl-4">Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allAdminJobs?.length > 0 && filteredJobs?.map((job) => (
              <TableRow key={job?._id}>
                <TableCell>{job?.title}</TableCell>
                <TableCell className="font-medium pl-4">{job?.company?.name}</TableCell>
                <TableCell className="pl-4">{job.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right pl-4">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-fit p-0 flex flex-col">
                      
                      <div onClick={()=> navigate(`/admin/jobs/${job._id}/applicants`)} className="text-sm flex items-center gap-2 hover:bg-gray-100 cursor-pointer px-2 py-1">
                        <Eye className="w-4" />
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    
    </div>
  );
};

export default AdminJobsTable;
