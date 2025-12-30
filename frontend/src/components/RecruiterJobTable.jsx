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
import {api} from "@/api/api";
import {toast} from "sonner";
import {Button} from "./ui/button";

const RecruiterJobTable = () => {
  const navigate = useNavigate();
  const {adminAllJobs, jobSearchInput} = useSelector((store) => store.jobs);

  const [filterJob, setFilterJobs] = useState(adminAllJobs);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const filteredJobs =
      adminAllJobs && adminAllJobs.length >= 0
        ? adminAllJobs.filter((job) => {
            if (!jobSearchInput) {
              return true;
            }
            return job?.title
              ?.toLowerCase()
              .includes(jobSearchInput.toLowerCase());
          })
        : [];
    setFilterJobs(filteredJobs);
  }, [jobSearchInput, adminAllJobs]);

  // handle delete

  const handleDelete = async (id) => {
    try {
      const res = await api.delete(`/api/v1/job/delete/${id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        const remainingJobs = filterJob.filter((job) => job._id !== id);
        setFilterJobs(remainingJobs);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="py-2">
        <Label className="text-xl font-bold font-mono">Created Jobs!</Label>
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
            {filterJob?.slice(0, visibleCount).map((job) => (
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
                        <Button
                          variant="link"
                          onClick={() =>
                            navigate(`/recruiter/job/${job?._id}/applicants`)
                          }
                        >
                          Applicants
                        </Button>
                        <Button
                          variant="link"
                          onClick={() => navigate(`/recruiter/job/${job?._id}`)}
                        >
                          Update
                        </Button>
                        <Button
                          variant="link"
                          onClick={() => handleDelete(job?._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </tr>
            ))}
          </TableBody>
        </Table>
      </div>

      {filterJob.length > visibleCount && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setVisibleCount((prev) => prev + 6)}
            className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Show more jobs
          </button>
        </div>
      )}
    </>
  );
};

export default RecruiterJobTable;
