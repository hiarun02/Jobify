import {Input} from "../ui/input";
import {Button} from "../ui/button";
import RecruiterJobTable from "../RecruiterJobTable";
import {useEffect, useState} from "react";
import useGetAllAdminJob from "@/hooks/useGetAllAdminJob";
import {useDispatch} from "react-redux";
import {setJobSearchInput} from "@/redux/jobSlice";
import {useNavigate} from "react-router-dom";

const RecruiterJobs = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useGetAllAdminJob();
  
  useEffect(() => {
    dispatch(setJobSearchInput(input));
  }, [input]);

  return (
    <>
      {/* Register copanies */}

      <div className="max-w-5xl m-auto my-22 border rounded-2xl gap-5 px-5 flex flex-col py-5">
        <div className="flex justify-between gap-5">
          <Input
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className="border w-52"
            placeholder="Search, filter by title"
          />
          <Button
            onClick={() => navigate("/recruiter/jobs/create")}
            className="bg-red-600 hover:bg-red-700"
          >
            Create Job
          </Button>
        </div>

        {/* Job table */}
        <div>
          <RecruiterJobTable />
        </div>
      </div>
    </>
  );
};

export default RecruiterJobs;
