import {api} from "@/api/api";
import {setSavedJobs} from "@/redux/jobSlice";
import {useEffect} from "react";
import {useDispatch} from "react-redux";

const useGetSavedJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getSavedJobs = async () => {
      try {
        const res = await api.get(`/api/v1/job/get-saved-jobs`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSavedJobs(res.data.savedJobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getSavedJobs();
  }, [dispatch]);
};

export default useGetSavedJobs;
