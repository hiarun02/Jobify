import {useNavigate} from "react-router-dom";
import {Badge} from "./ui/badge";
import {Button} from "./ui/button";
import {Avatar, AvatarImage} from "@radix-ui/react-avatar";

const LatestJobCards = ({job, key}) => {
  const navigate = useNavigate();
  return (
    <div key={key} className="border p-5 rounded-2xl shadow-2xs">
      <div className=" flex items-center gap-5 ">
        <Button variant="outline" size="icon" className="w-12 h-12 my-2">
          <Avatar>
            <AvatarImage
              className="rounded-full"
              src={job?.company?.logo}
            ></AvatarImage>
          </Avatar>
        </Button>
        <div>
          <h2 className="font-medium text-lg">{job?.company?.name}</h2>
          <p className="text-sm text-gray-500">India</p>
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
  );
};

export default LatestJobCards;
