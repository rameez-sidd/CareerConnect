import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

const AppliedJobsTable = () => {
  const {allAppliedJobs} = useSelector(store=>store.job)
  
  return (
    <div>
      {allAppliedJobs?.length <= 0 ? (
        <span className="text-gray-600 text-sm">
          You haven't applied for any job yet.
        </span>
      ) : (
        <Table className="table-auto min-w-max">
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead className="pl-4">Job Role</TableHead>
              <TableHead className="pl-4">Company</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allAppliedJobs.map((appliedJob) => (
              <TableRow key={appliedJob._id}>
                <TableCell className="font-medium">{appliedJob.createdAt.split('T')[0]}</TableCell>
                <TableCell className="pl-4">{appliedJob.job.title}</TableCell>
                <TableCell className="pl-4">{appliedJob.job.company.name}</TableCell>
                <TableCell className="text-right pl-4">
                  <Badge className={`rounded-full ${appliedJob.status === 'pending' ? 'bg-gray-400' : appliedJob.status === 'accepted' ? 'bg-green-700' : 'bg-red-500'}`}>{appliedJob.status.toUpperCase()}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default AppliedJobsTable;
