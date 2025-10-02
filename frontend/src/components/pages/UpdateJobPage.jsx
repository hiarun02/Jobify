import {Label} from "@radix-ui/react-label";
import React, {useEffect, useState} from "react";
import {Input} from "../ui/input";
import {Button} from "../ui/button";
import {useNavigate, useParams} from "react-router-dom";

import {useSelector} from "react-redux";

import {toast} from "sonner";
import {api} from "@/api/api";
import useGetSingalJobById from "@/hooks/UseGetSingalJobById";

const UpdateJobPage = () => {
  const params = useParams();
  useGetSingalJobById(params.id);
  const {singalJob} = useSelector((store) => store.jobs);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
  });

  // input handler

  const eventChangeHandler = (e) => {
    setInput({...input, [e.target.name]: e.target.value});
  };

  // form handler

  const submitFromHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await api.patch(`/api/job/update/${params.id}`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/recruiter/dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      title: singalJob?.title || "",
      description: singalJob?.description || "",
      requirements: singalJob?.requirements?.join(",") || "",
      salary: singalJob?.salary || "",
      location: singalJob?.location || "",
      jobType: singalJob?.jobType || "",
      experience: singalJob?.experience || "",
      position: singalJob?.position || 0,
    });
  }, [singalJob]);

  return (
    <>
      <div className="max-w-3xl m-auto gap-2 px-5 py-5">
        <div className="">
          <Button
            variant="outline"
            onClick={() => navigate("/recruiter/dashboard")}
          >
            Back
          </Button>
        </div>
        <form onSubmit={submitFromHandler}>
          <div className="border rounded-2xl p-5 mt-3 flex flex-col">
            <div className="mb-5">
              <Label className="">Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={eventChangeHandler}
                className="border"
                placeholder="Enter Job Title"
              />
            </div>
            <div className="mb-5">
              <Label>Description</Label>
              <Input
                type="text"
                onChange={eventChangeHandler}
                value={input.description}
                name="description"
                className="border"
                placeholder="Enter Job Description"
              />
            </div>
            <div className="mb-5">
              <Label>Requirements</Label>
              <Input
                type="text"
                value={input.requirements}
                onChange={eventChangeHandler}
                name="requirements"
                className="border"
                placeholder="Enter Requirements"
              />
            </div>
            {/* grids inputs 1*/}
            <div className="mb-5 grid xl:grid-cols-2 gap-5">
              <div className="w-full">
                <Label className="">Salary</Label>
                <Input
                  type="text"
                  name="salary"
                  value={input.salary}
                  onChange={eventChangeHandler}
                  className="border"
                  placeholder="Enter Job Title"
                />
              </div>
              <div className="w-full">
                <Label className="">Location</Label>
                <Input
                  type="text"
                  name="location"
                  value={input.location}
                  onChange={eventChangeHandler}
                  className="border"
                  placeholder="Enter Job Title"
                />
              </div>
            </div>
            {/* grids inputs 2 */}
            <div className="grid xl:grid-cols-2 gap-5 mb-5">
              <div className="w-full">
                <Label className="">Job Type</Label>
                <Input
                  type="text"
                  name="jobType"
                  value={input.jobType}
                  onChange={eventChangeHandler}
                  className="border"
                  placeholder="Enter Job Title"
                />
              </div>
              <div className="w-full">
                <Label className="">Experience</Label>
                <Input
                  type="text"
                  name="experience"
                  value={input.experience}
                  onChange={eventChangeHandler}
                  className="border"
                  placeholder="Enter Job Title"
                />
              </div>
            </div>
            {/* grids inputs3*/}
            <div className="grid xl:grid-cols-1 gap-5 mb-5">
              <div className="w-full">
                <Label className="">No of Position</Label>
                <Input
                  type="number"
                  name="position"
                  value={input.position}
                  onChange={eventChangeHandler}
                  className="border"
                  placeholder="Enter Job Title"
                />
              </div>
            </div>
            <Button className="bg-red-600 hover:bg-red-700">
              {isLoading ? "Updating..." : "Update"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateJobPage;
