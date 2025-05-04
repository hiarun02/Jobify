import {Contact, Mail, Pen} from "lucide-react";
import {Avatar, AvatarImage} from "../ui/avatar";
import {Button} from "../ui/button";
import {Badge} from "../ui/badge";
import UpdateProfileDialog from "../UpdateProfileDialog";
import {useState} from "react";
import {Label} from "../ui/label";
import {AppliedJobTable} from "../AppliedJobTable";
import {useSelector} from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);

  const {user} = useSelector((store) => store.auth);

  const isResume = user?.profile?.resume;

  return (
    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 h-auto mb-10 mt-10 bg-white border-2 border-gray-100 rounded-2xl shadow-1xl p-5">
      <div className="">
        <div className="flex flex-col justify-center items-center">
          <Avatar className="w-24 h-24 border-2 border-gray-200 rounded-2xl shadow-sm">
            <AvatarImage
              src={user?.profile?.profilePhoto}
              alt="Profile Picture"
            />
          </Avatar>
          <div>
            <div className="flex justify-center gap-5 items-center w-full mt-4">
              <h2 className="text-2xl font-bold text-center py-3">
                {user?.fullName}
              </h2>
              <div>
                <Button
                  onClick={() => setOpen(true)}
                  variant="outline"
                  className="bg-red-600  text-white rounded-md shadow-sm hover:bg-red-700 hover:text-white transition duration-200"
                >
                  <Pen />
                </Button>
              </div>
            </div>

            <p className="text-gray-600 max-w-2xl text-center">
              {user?.profile?.bio}
            </p>
          </div>
          {/* contact info */}
          <div className="flex flex-col justify-center items-center ">
            <div className="flex justify-center gap-2 items-center w-full mt-4 ">
              <Mail />
              <span>{user?.email}</span>
            </div>
            <div className="flex justify-center gap-2 items-center w-full mt-3 mb-5 ">
              <Contact />
              <span>{user?.phoneNumber}</span>
            </div>
            <div>
              <span className="font-semibold">Skills : </span>
              {user?.profile?.skills.length > 0 ? (
                user?.profile?.skills.map((skill, index) => (
                  <Badge className="text-red-700" variant="outline" key={index}>
                    {skill}
                  </Badge>
                ))
              ) : (
                <span className="text-gray-500">NA</span>
              )}
              <div className="flex justify-center gap-2 items-center w-full mt-3 mb-5 ">
                <Label>Resume : </Label>
                {isResume ? (
                  <a
                    className="text-red-700 underline text-sm font-bold"
                    target="_blank"
                    href={user?.profile?.resume}
                  >
                    {user?.profile?.resumeOriginalName}
                  </a>
                ) : (
                  <span className="text-gray-500">No resume uploaded</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Applied Job application */}
      <div className="mt-10  h-auto border-2 border-gray-100 rounded-2xl shadow-1xl p-5">
        <h2 className="font-bold lg:text-2xl md:text-2xl sm:text-2xl bg-red-700 text-white py-1 px-4 rounded-md  text-center mb-5">
          #Applied Jobs
        </h2>
        <div className="">
          <AppliedJobTable />
        </div>
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
