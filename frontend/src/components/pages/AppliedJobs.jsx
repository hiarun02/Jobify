import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import {AppliedJobTable} from "../AppliedJobTable";

const AppliedJobs = () => {
  useGetAppliedJobs();
  return (
    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 h-auto mb-10 mt-10 bg-white border-2 border-gray-100 rounded-2xl shadow-1xl p-5">
      <h2 className="font-bold lg:text-2xl md:text-2xl sm:text-2xl bg-red-700 text-white py-1 px-4 rounded-md  text-center mb-5">
        Applied Jobs
      </h2>
      <div className="mt-10 h-auto border-2 border-gray-100 rounded-2xl shadow-1xl p-5">
        <div className="">
          <AppliedJobTable />
        </div>
      </div>
    </div>
  );
};

export default AppliedJobs;
