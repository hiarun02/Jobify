import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "./ui/table";
import {Label} from "./ui/label";
import {Avatar, AvatarImage} from "./ui/avatar";
import {Popover, PopoverContent, PopoverTrigger} from "./ui/popover";
import {MoreHorizontal} from "lucide-react";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const CompaniesTable = () => {
  const {companies, searchCompany} = useSelector((store) => store.company);
  const [filterCompanies, setFilterCompanies] = useState(companies);

  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompany) {
          return true;
        }
        return company?.name
          ?.toLowerCase()
          .includes(searchCompany.toLowerCase());
      });
    setFilterCompanies(filteredCompany);
  }, [searchCompany, companies]);

  return (
    <>
      <div className="">
        <Label className="text-xl font-bold font-mono ">
          Your Registered Company
        </Label>
      </div>
      <div className="border rounded-2xl overflow-hidden mt-5 bg-gray-50">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Logo</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filterCompanies?.map((company) => (
              <tr key={company._id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={company?.logo}></AvatarImage>
                  </Avatar>
                </TableCell>
                <TableCell> {company.name}</TableCell>
                <TableCell>{company?.createdAt.split("T")[0]}</TableCell>
                <TableCell className="cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div className="flex justify-center">
                        <button
                          onClick={() =>
                            navigate(`/recruiter/company/${company._id}`)
                          }
                        >
                          Edit
                        </button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </tr>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default CompaniesTable;
