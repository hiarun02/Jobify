import {Bookmark} from "lucide-react";
import {Badge} from "./ui/badge";
import {Button} from "./ui/button";
import {Avatar, AvatarImage} from "./ui/avatar";
import {useNavigate} from "react-router-dom";
import {api} from "@/api/api";
import {toast} from "sonner";

const JobCard = ({job}) => {
  const navigate = useNavigate();

  const timeCalFun = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timecalculate = currentTime - createdAt;
    return Math.floor(timecalculate / (1000 * 24 * 60 * 60));
  };

  const handleSaveJob = async (jobId) => {
    // console.log(jobId);
    try {
      const res = await api.post(
        `/api/job/saved`,
        {jobId},
        {withCredentials: true}
      );

      if (res.data.message) toast.success(res.data.message);
    } catch (error) {
      console.log("error while saving job", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className=" bg-white border-2 border-gray-100 rounded-2xl shadow-1xl  cursor-pointer p-3">
      <div className="flex justify-between items-center">
        <Badge variant="outline">
          {timeCalFun(job?.createdAt) == 0
            ? "Today"
            : ` ${timeCalFun(job?.createdAt)}, days ago`}
        </Badge>
        <Button
          onClick={() => handleSaveJob(job._id)}
          variant="outline"
          className={` `}
        >
          <Bookmark />
        </Button>
      </div>

      <div className="">
        <div className="mt-5 flex items-center gap-5 ">
          <Button variant="outline" size="icon" className="w-16 h-16 my-2">
            <Avatar>
              <AvatarImage src={job?.company?.logo}></AvatarImage>
            </Avatar>
          </Button>
          <div>
            <h2 className="font-medium text-lg">{job?.company?.name}</h2>
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
        <div className="my-2 mt-2 flex gap-3 text-red-700">
          <Badge variant="ghost">{job?.jobType}</Badge>
          <Badge variant="ghost">{job?.salary}</Badge>
          <Badge variant="ghost">{job?.position}</Badge>
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
};

export default JobCard;
