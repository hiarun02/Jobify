import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "./ui/table";
import {Label} from "./ui/label";
import {Popover, PopoverContent, PopoverTrigger} from "./ui/popover";
import {MoreHorizontal} from "lucide-react";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const RecruiterJobTable = () => {
  const navigate = useNavigate();
  const {adminAllJobs, jobSearchInput} = useSelector((store) => store.jobs);

  const [filterJob, setFilterJobs] = useState(adminAllJobs);

  useEffect(() => {
    const filteredJobs =
      adminAllJobs.length >= 0 &&
      adminAllJobs.filter((job) => {
        if (!jobSearchInput) {
          return true;
        }
        return job?.title?.toLowerCase().includes(jobSearchInput.toLowerCase());
      });
    setFilterJobs(filteredJobs);
  }, [jobSearchInput, adminAllJobs]);

  return (
    <>
      <div className="py-5 ">
        <Label className="text-2xl font-bold"> Created Jobs List ! </Label>
      </div>
      <div className="border rounded-2xl overflow-hidden p-1 bg-gray-50">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filterJob?.map((job) => (
              <tr key={job._id}>
                <TableCell>{job?.company?.name}</TableCell>
                <TableCell> {job?.title}</TableCell>
                <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                <TableCell className="cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div className="flex flex-col gap-2">
                        <button>
                          <span
                            className="hover:underline"
                            onClick={() =>
                              navigate(`/recruiter/jobs/${job?._id}/applicants`)
                            }
                          >
                            Applicants
                          </span>
                        </button>
                        <button>
                          <span className="hover:underline">Edit</span>
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

export default RecruiterJobTable;
