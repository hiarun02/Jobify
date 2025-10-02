import {Input} from "../ui/input";
import {Button} from "../ui/button";
import RecruiterJobTable from "../RecruiterJobTable";
import {useEffect, useState} from "react";
import useGetAllAdminJob from "@/hooks/useGetAllAdminJob";
import {useDispatch, useSelector} from "react-redux";
import {setJobSearchInput} from "@/redux/jobSlice";
import {useNavigate} from "react-router-dom";

import CompaniesTable from "../CompaniesTable";

import useGetAllCompanies from "@/hooks/useGetAllCompanies";

const Dashboard = () => {
  useGetAllCompanies();

  const {companies} = useSelector((store) => store.company);

  const {adminAllJobs} = useSelector((store) => store.jobs);
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useGetAllAdminJob();

  useEffect(() => {
    dispatch(setJobSearchInput(input));
  }, [input, dispatch]);

  return (
    <>
      {/* company section */}
      <div className="max-w-6xl m-auto my-5 border rounded-2xl px-5 flex flex-col py-5">
        <div className="flex justify-between gap-5 flex-col">
          {companies.length === 0 ? (
            <Button
              onClick={() => navigate("/recruiter/company/create")}
              className="bg-red-600 hover:bg-red-700"
            >
              Add Company
            </Button>
          ) : null}
        </div>
        {/* Companies table */}
        {companies.length === 0 ? (
          <span>You Dont have Register Company</span>
        ) : (
          <div>
            <CompaniesTable />
          </div>
        )}
      </div>

      {/* Job section */}

      <div className="max-w-6xl m-auto my-10 border rounded-2xl gap-5 px-5 flex flex-col py-5">
        <div className="flex justify-between gap-5">
          <Input
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className="border w-52"
            placeholder="Search, filter by title"
          />
          <Button
            onClick={() => navigate("/recruiter/job/create")}
            className="bg-red-600 hover:bg-red-700"
          >
            Create Job
          </Button>
        </div>

        {/* Job table */}
        {adminAllJobs.length === 0 ? (
          <span className="text-xl font-mono text-center">
            Job Not Found, Create Your First Job!
          </span>
        ) : (
          <div>
            <RecruiterJobTable />
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
