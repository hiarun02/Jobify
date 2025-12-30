import {api} from "@/api/api";
import {setSingalJob} from "@/redux/jobSlice";
import {useEffect} from "react";
import {useDispatch} from "react-redux";

const useGetSingalJobById = (jobId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSingalJob = async () => {
      try {
        const res = await api.get(`/api/v1/job/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingalJob(res.data.job));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingalJob();
  }, [jobId, dispatch]);
};

export default useGetSingalJobById;
