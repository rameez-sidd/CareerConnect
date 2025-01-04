import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Check, MoreHorizontal, X } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "@/utils/constant";
import { toast } from "react-toastify";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const shortListingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const handleStatus = async (status, id) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_ENDPOINT}/status/${id}/update`,
        { status },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toSentenceCase = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  return (
    <div>
      <Table className="table-auto min-w-max">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="pl-4">Email</TableHead>
            <TableHead className="pl-4">Contact</TableHead>
            <TableHead className="pl-4">Resume</TableHead>
            <TableHead className="pl-4">Date</TableHead>
            <TableHead className="text-right">Action </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants &&
            applicants?.applications?.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item?.applicant?.fullName}</TableCell>
                <TableCell className="pl-4">{item?.applicant?.email}</TableCell>
                <TableCell className="pl-4">{item?.applicant?.phoneNumber}</TableCell>
                <TableCell className="pl-4">
                  {item?.applicant?.profile?.resume ? (
                    <Link
                      className="text-blue-500"
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                    >
                      {item?.applicant?.profile?.resumeOriginalName}
                    </Link>
                  ) : (
                    <span>NA</span>
                  )}
                </TableCell>
                <TableCell className="pl-4">
                  {item?.applicant?.createdAt.split("T")[0]}
                </TableCell>

                <TableCell className="text-right float-end pl-4">
                  <Select onValueChange={(value) => handleStatus(value, item._id)}>
                    <SelectTrigger>
                      <SelectValue placeholder={toSentenceCase(item?.status)} />
                    </SelectTrigger>
                    <SelectContent>
                      {shortListingStatus.map((status, index) => {
                        return (
                          <SelectItem
                            key={index}
                            value={status.toLowerCase()}
                          >
                            {status}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  {/* <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-fit p-0 flex flex-col">
                      {shortListingStatus.map((status, index) => (
                        <div onClick={()=>handleStatus(status, item?._id)} key={index} className="text-sm flex items-center gap-2 hover:bg-gray-100 cursor-pointer pr-4 pl-3 py-1">
                          {status === "Accepted" ? <Check className="w-5" /> : <X className="w-5" />}

                          <span>{status}</span>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover> */}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
