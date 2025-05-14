import {Button} from "../ui/button";
import CompaniesTable from "../CompaniesTable";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";

const Companies = () => {
  useGetAllCompanies();
  const navigate = useNavigate();
  const {companies} = useSelector((store) => store.company);

  return (
    <>
      {/* Register copanies */}
      <div className="max-w-5xl m-auto my-22 border rounded-2xl  px-5 flex flex-col py-5">
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
    </>
  );
};

export default Companies;
