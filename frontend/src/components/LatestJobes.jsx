import {useSelector} from "react-redux";
import LatestJobCards from "./LatestJobCards";
import SkeletonCard from "./SkeletonCard";

const LatestJobes = () => {
  const {allJobs, jobsLoading} = useSelector((store) => store.jobs);

  const latestJobs = allJobs.slice(0, 9);

  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 h-auto mb-10">
        <div className="py-10">
          <h2 className="font-bold lg:text-2xl md:text-2xl sm:text-2xl bg-red-700 text-white py-1 px-4 rounded-md  text-center">
            Latest Job Openings
          </h2>
        </div>
        <div className="grid  gap-6 lg:grid-cols-3 md:grid-cols-2 ">
          {jobsLoading
            ? // Show skeleton cards while loading
              Array(9)
                .fill(null)
                .map((_, index) => (
                  <div key={index}>
                    <SkeletonCard />
                  </div>
                ))
            : // Show actual job cards when loaded
              latestJobs.map((job) => (
                <div key={job?._id}>
                  <LatestJobCards job={job} />
                </div>
              ))}
        </div>
      </div>
    </>
  );
};

export default LatestJobes;
