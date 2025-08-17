import {useSelector} from "react-redux";
import JobCard from "../JobCard";
import JobFillter from "../JobFillter";
import {useEffect, useState} from "react";

const Jobs = () => {
  const {allJobs, filterQuery, searchQuery} = useSelector(
    (store) => store.jobs
  );

  const [filterJob, setFilterJob] = useState(allJobs);

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
          {filterJob.length <= 0 ? (
            <div className="flex justify-center items-center h-full">
              <span className="text-2xl font-mono">Job Not Found!</span>
            </div>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filterJob.map((job) => (
                <li key={job?._id} className="list-none">
                  <JobCard job={job} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
