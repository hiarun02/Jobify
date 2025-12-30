import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setAdminAllJobs} from "@/redux/jobSlice";
import {api} from "@/api/api";

const useGetAllAdminJob = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAdminJobs = async () => {
      try {
        const res = await api.get(`/api/v1/job/adminjob`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setAdminAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAdminJobs();
  }, [dispatch]);
};

export default useGetAllAdminJob;
