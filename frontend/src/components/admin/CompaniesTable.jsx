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
import { Avatar, AvatarImage } from "../ui/avatar";
import { Edit2, MoreHorizontal } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const [filteredCompany, setFilteredCompany] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFilteredCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    <div>
      <Table className="table-auto min-w-max">
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead className="pl-4">Name</TableHead>
            <TableHead className="pl-4">Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies?.length > 0 && filteredCompany?.map((company) => (
            <TableRow key={company?._id}>
              <TableCell className="font-medium">
                <Avatar>
                  <AvatarImage src={company?.logo} />
                </Avatar>
              </TableCell>
              <TableCell className="pl-4">{company?.name}</TableCell>
              <TableCell className="pl-4">{company.createdAt.split("T")[0]}</TableCell>
              <TableCell className="text-right pl-4">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-fit p-0 flex flex-col">
                    <div
                      onClick={() =>
                        navigate(`/admin/companies/${company._id}`)
                      }
                      className="text-sm flex items-center gap-2 hover:bg-gray-100 cursor-pointer px-4 py-1"
                    >
                      <Edit2 className="w-4" />
                      <span>Edit</span>
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

export default CompaniesTable;
