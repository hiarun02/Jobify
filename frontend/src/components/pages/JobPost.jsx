import {Label} from "@radix-ui/react-label";
import React, {useState} from "react";
import {Input} from "../ui/input";
import {Button} from "../ui/button";
import {useNavigate} from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {useSelector} from "react-redux";
import {SelectGroup} from "@radix-ui/react-select";
import {toast} from "sonner";
import {api} from "@/api/api";

const JobPost = () => {
  const {companies} = useSelector((store) => store.company);

  const navigate = useNavigate();

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  // input handler

  const eventChangeHandler = (e) => {
    setInput({...input, [e.target.name]: e.target.value});
  };

  // selectChangeHandler

  const selectChangeHanlder = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );

    setInput({...input, companyId: selectedCompany._id});
  };

  // form handler

  const submitFromHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(`/api/job/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/recruiter/jobs");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="max-w-3xl m-auto gap-2 px-5 py-5">
        <div className="">
          <Button variant="outline" onClick={() => navigate("/recruiter/jobs")}>
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
            <div className="grid xl:grid-cols-2 gap-5 mb-5">
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
              <div className="w-full">
                <Label className="">Select Company</Label>
                <div>
                  {companies.length > 0 && (
                    <Select onValueChange={selectChangeHanlder}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Company" />
                      </SelectTrigger>
                      <SelectContent className="text-center ">
                        <SelectGroup>
                          {companies.map((company) => {
                            return (
                              <div key={company._id}>
                                <SelectItem value={company?.name.toLowerCase()}>
                                  {company.name}
                                </SelectItem>
                              </div>
                            );
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>
            </div>
            <Button className="bg-red-600 hover:bg-red-700">Create</Button>
            {companies.length === 0 && (
              <div className="mt-3 font-mono text-red-700 w-full flex justify-center ">
                <p>*Please Register Company frist, before post Job</p>
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default JobPost;
