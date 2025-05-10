import React, {useEffect, useState} from "react";
import {Input} from "../ui/input";
import {Button} from "../ui/button";

import CompaniesTable from "../CompaniesTable";
import {useNavigate} from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import {useDispatch} from "react-redux";
import {setsearchCompany} from "@/redux/companySlice";

const Companies = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useGetAllCompanies();
  useEffect(() => {
    dispatch(setsearchCompany(input));
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
            placeholder="Search..."
          />
          <Button
            onClick={() => navigate("/recruiter/company/create")}
            className="bg-red-600 hover:bg-red-700"
          >
            Add Company
          </Button>
        </div>

        {/* Companies table */}
        <div>
          <CompaniesTable />
        </div>
      </div>
    </>
  );
};

export default Companies;
