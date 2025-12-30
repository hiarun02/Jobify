import {useEffect} from "react";
import ApplicantsTable from "../ApplicantsTable";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setApplications} from "@/redux/applicationSlice";
import {api} from "@/api/api";

const Applicants = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const {applications} = useSelector((store) => store.applications);

  useEffect(() => {
    const fetchedApplicants = async () => {
      try {
        const res = await api.get(
          `/api/v1/application/${params.id}/applicants`,
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          dispatch(setApplications(res.data.job));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchedApplicants();
  }, [dispatch, params.id]);
  return (
    <>
      <div className="max-w-7xl m-auto my-22 border rounded-2xl gap-5 px-5 flex flex-col py-5">
        <h1 className="text-lg font-semibold">
          Applied User {applications?.applications?.length}
        </h1>
        <ApplicantsTable />
      </div>
    </>
  );
};

export default Applicants;
