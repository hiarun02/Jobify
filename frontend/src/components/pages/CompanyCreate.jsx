import {useNavigate} from "react-router-dom";
import {Button} from "../ui/button";
import {Input} from "../ui/input";
import {useState} from "react";
import {toast} from "sonner";
import {useDispatch} from "react-redux";
import {Label} from "../ui/label";
import {setSingalCompany} from "@/redux/companySlice";
import {api} from "@/api/api";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [companyName, setCompanyName] = useState();

  const registerCompany = async () => {
    try {
      const res = await api.post(
        `/api/company/register`,
        {companyName},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        dispatch(setSingalCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/recruiter/company/${companyId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="max-w-3xl m-auto my-10 border rounded-2xl gap-2 px-5 flex flex-col  py-5">
        <Label className="pb-2"> Enter Company Your Name </Label>
        <Input
          type="text"
          name="companyName"
          className="border"
          placeholder="Company Name..."
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <div className="flex gap-5 mt-2">
          <Button
            onClick={() => navigate("/recruiter/companies")}
            className="bg-red-600 hover:bg-red-700"
          >
            Back
          </Button>
          <Button
            onClick={registerCompany}
            className="bg-red-600 hover:bg-red-700"
          >
            Continue
          </Button>
        </div>
      </div>
    </>
  );
};

export default CompanyCreate;
