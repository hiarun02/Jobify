import {api} from "@/api/api";
import {setSavedJobs} from "@/redux/jobSlice";
import {Trash2} from "lucide-react";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "../ui/button";
import {Avatar, AvatarImage} from "@radix-ui/react-avatar";
import {useNavigate} from "react-router-dom";
import {toast} from "sonner";

const SaveJob = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {savedJobs} = useSelector((store) => store.jobs);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);

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
      } finally {
        setIsLoading(false);
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

  const visibleJobs = savedJobs.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <div className="max-w-7xl mx-auto px-5 py-5">
      {isLoading ? (
        <h2 className="flex justify-center items-center w-full h-[40vh] text-gray-600">
          Loading...
        </h2>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 ">
          {!visibleJobs.length ? (
            <h2 className="flex justify-center items-center w-7xl h-[40vh]">
              Saved Job Not Found
            </h2>
          ) : (
            visibleJobs.map((job) => {
              return (
                <div
                  key={job._id}
                  className=" bg-white border-2 border-gray-100 rounded-2xl shadow-1xl  cursor-pointer p-3"
                >
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
                          <AvatarImage
                            className="rounded-full"
                            src={job?.company?.logo}
                          ></AvatarImage>
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
      )}
      {!isLoading && savedJobs.length > visibleJobs.length && (
        <div className="flex justify-center mt-5">
          <Button
            onClick={handleLoadMore}
            className=" px-5 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Load more
          </Button>
        </div>
      )}
    </div>
  );
};

export default SaveJob;
