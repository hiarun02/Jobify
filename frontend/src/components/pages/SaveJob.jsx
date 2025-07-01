import {api} from "@/api/api";
import {setSavedJobs} from "@/redux/jobSlice";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

const SaveJob = () => {
  const dispatch = useDispatch();
  const {savedJobs} = useSelector((store) => store.jobs);

  console.log(savedJobs);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const res = await api.get(`/api/job/get-saved-jobs`, {
          withCredentials: true,
        });
        console.log(res);
        dispatch(setSavedJobs(res.data.savedJobs));
      } catch (error) {
        console.log(error);
      }
    };
    fetchSavedJobs();
  }, []);

  return (
    <div>
      <div>
        {savedJobs.map((job) => {
          return <div>{job.title}</div>;
        })}
      </div>
    </div>
  );
};

export default SaveJob;
