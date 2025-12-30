import {api} from "@/api/api";
import {setAppliedJobs} from "@/redux/jobSlice";
import {useEffect} from "react";
import {useDispatch} from "react-redux";

const useGetAppliedJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await api.get(`/api/v1/application/get`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setAppliedJobs(res.data.applications));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAppliedJobs();
  }, [dispatch]);
};

export default useGetAppliedJobs;
