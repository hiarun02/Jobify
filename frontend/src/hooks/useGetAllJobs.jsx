import {api} from "@/api/api";
import {setAllJobs, setJobsLoading} from "@/redux/jobSlice";
import {useEffect} from "react";
import {useDispatch} from "react-redux";

const useGetAllJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllJobs = async () => {
      try {
        dispatch(setJobsLoading(true));
        const res = await api.get(`/api/v1/job/get`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setJobsLoading(false));
      }
    };
    getAllJobs();
  }, [dispatch]);
};

export default useGetAllJobs;
