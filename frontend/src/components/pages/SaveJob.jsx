import {api} from "@/api/api";
import {setSavedJobs} from "@/redux/jobSlice";
import {Trash2} from "lucide-react";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "../ui/button";
import {Avatar, AvatarImage} from "@radix-ui/react-avatar";
import {useNavigate} from "react-router-dom";
import {toast} from "sonner";

const SaveJob = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {savedJobs} = useSelector((store) => store.jobs);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const res = await api.get(
          `/api/job/get-saved-jobs`,

          {
            withCredentials: true,
          }
        );
        dispatch(setSavedJobs(res.data.savedJobs));
      } catch (error) {
        console.log(error);
      }
    };
    fetchSavedJobs();
  }, [dispatch]);

  const handleDeleteSavedJob = async (jobId) => {
    try {
      const res = await api.post(
        `/api/job/delete-saved-job`,
        {jobId},
        {withCredentials: true}
      );
      dispatch(setSavedJobs(res.data.savedJobs));
      toast.success("Job removed from saved jobs");
    } catch (error) {
      console.log("error while deleting saved job", error);
      toast.error(error?.response?.data?.message || "Error");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-5 py-5">
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {!savedJobs.length ? (
          <h2 className="flex justify-center items-center w-7xl h-[40vh]">
            Saved Job Not Found
          </h2>
        ) : (
          savedJobs.map((job) => {
            return (
              <div className=" bg-white border-2 border-gray-100 rounded-2xl shadow-1xl  cursor-pointer p-3">
                <div className="">
                  <Button
                    variant="outline"
                    onClick={() => handleDeleteSavedJob(job._id)}
                  >
                    <Trash2 />
                  </Button>
                </div>

                <div className="">
                  <div className="mt-5 flex items-center gap-5 ">
                    <Button
                      variant="outline"
                      size="icon"
                      className="w-16 h-16 my-2"
                    >
                      <Avatar>
                        <AvatarImage src={job?.company?.logo}></AvatarImage>
                      </Avatar>
                    </Button>
                    <div>
                      <h2 className="font-medium text-lg">
                        <span>{job?.company?.name}</span> <span> </span>
                      </h2>
                      <p className="text-sm text-gray-500">{job?.location}</p>
                    </div>
                  </div>
                  <div className="pt-2 pb-2">
                    <h1 className="text-lg font-bold">{job?.title}</h1>
                    <p className="text-sm">
                      {job?.description?.length > 50 &&
                        `${job?.description.slice(0, 100)}...`}
                    </p>
                  </div>

                  <div className="w-full my-2 pt-2">
                    <Button
                      onClick={() => navigate(`/deatils/${job?._id}`)}
                      className=" w-full shadow-2xs bg-red-600 hover:bg-red-700 font-semibold"
                    >
                      View
                    </Button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </ul>
    </div>
  );
};

export default SaveJob;
