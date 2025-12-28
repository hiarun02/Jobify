import {useSelector, useDispatch} from "react-redux";
import JobCard from "../JobCard";
import JobFillter from "../JobFillter";
import {useEffect, useState} from "react";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import useGetSavedJobs from "@/hooks/useGetSavedJobs";
import {api} from "@/api/api";
import {setSavedJobs} from "@/redux/jobSlice";

const Jobs = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(9);

  useGetAllJobs();
  useGetSavedJobs();

  const dispatch = useDispatch();

  const {allJobs, filterQuery, searchQuery} = useSelector(
    (store) => store.jobs
  );

  // Set loading to false when jobs fetched (even if empty array)
  useEffect(() => {
    if (allJobs !== undefined && allJobs !== null) {
      setIsLoading(false);
    }
  }, [allJobs]);

  // Refetch saved jobs when returning to this page
  useEffect(() => {
    const handleFocus = async () => {
      try {
        const res = await api.get(`/api/job/get-saved-jobs`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSavedJobs(res.data.savedJobs));
        }
      } catch (error) {
        console.log(error);
      }
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [dispatch]);

  const [filterJob, setFilterJob] = useState(allJobs);
  const visibleJobs = filterJob.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  // Filter and Search Logic
  useEffect(() => {
    let filteredJobs = allJobs;

    // Apply filter query
    if (filterQuery) {
      filteredJobs = filteredJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(filterQuery.toLowerCase())
        );
      });
    }

    // Apply search query
    if (searchQuery) {
      filteredJobs = filteredJobs.filter((job) =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilterJob(filteredJobs);
  }, [filterQuery, searchQuery, allJobs]);

  return (
    <div className="m-auto max-w-screen-xl my-5 px-5">
      {/* Main Container */}
      <div className="flex flex-col lg:flex-row gap-5">
        {/* Job Filter Section */}
        <div className="w-full lg:w-1/4 bg-white p-5 border rounded-2xl h-fit lg:sticky lg:top-20">
          <JobFillter />
        </div>

        {/* Job Cards Section */}
        <div className="w-full lg:w-3/4 lg:ml-0">
          {isLoading ? (
            <div className="flex justify-center items-center h-[40vh]">
              <span className="text-lg text-gray-600">Loading jobs...</span>
            </div>
          ) : filterJob.length <= 0 ? (
            <div className="flex justify-center items-center h-full">
              <span className="text-2xl font-mono">Job Not Found!</span>
            </div>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {visibleJobs.map((job) => (
                <li key={job?._id} className="list-none">
                  <JobCard job={job} />
                </li>
              ))}
            </ul>
          )}

          {!isLoading && filterJob.length > visibleJobs.length && (
            <div className="flex justify-center mt-6">
              <button
                onClick={handleLoadMore}
                className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Load more jobs
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
