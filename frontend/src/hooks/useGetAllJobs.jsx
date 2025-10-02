import {api} from "@/api/api";
import {setAllJobs} from "@/redux/jobSlice";
import {useEffect} from "react";
import {useDispatch} from "react-redux";

const useGetAllJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllJobs = async () => {
      try {
        const res = await api.get(`/api/job/get`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllJobs();
  }, [dispatch]);
};

export default useGetAllJobs;
