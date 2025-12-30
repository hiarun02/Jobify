import React, {useEffect, useState} from "react";
import {Button} from "../ui/button";
import {ArrowLeft} from "lucide-react";
import {Label} from "../ui/label";
import {Input} from "../ui/input";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "sonner";
import {useSelector} from "react-redux";
import useGetSingalCompanyById from "@/hooks/useGetSIngalCompanyById";
import {api} from "@/api/api";

const CompanySetup = () => {
  const params = useParams();
  useGetSingalCompanyById(params.id);

  const navigate = useNavigate();

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const [isLoading, setIsLoading] = useState(false);

  const {singalCompany} = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    setInput({...input, [e.target.name]: e.target.value});
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({...input, file});
  };

  const formHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      const res = await api.put(
        `/api/v1/company/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/recruiter/dashboard");
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    setInput({
      name: singalCompany?.name || "",
      description: singalCompany?.description || "",
      website: singalCompany?.website || "",
      location: singalCompany?.location || "",
      file: singalCompany?.file || null,
    });
  }, [singalCompany]);

  return (
    <>
      <div className="max-w-3xl mx-auto my-10 px-5 ">
        <div>
          <Button
            onClick={() => navigate("/recruiter/dashboard")}
            variant="outline"
            className="mb-5"
          >
            <ArrowLeft /> Back
          </Button>
        </div>
        <div className="border rounded-2xl pt-5">
          <form action="" className=" px-5" onSubmit={formHandler}>
            <div className="mb-5 flex flex-col gap-4">
              <div className="w-full">
                <Label className="pb-3">Company Name</Label>
                <Input
                  type="text"
                  value={input.name}
                  onChange={changeEventHandler}
                  name="name"
                  placeholder="Enter Your Company Name"
                />
              </div>
              <div className="w-full">
                <Label className="pb-3">Company Description</Label>
                <Input
                  type="text"
                  name="description"
                  value={input.description}
                  onChange={changeEventHandler}
                  placeholder="Enter description"
                />
              </div>
            </div>
            {/* 2 box */}
            <div className="grid lg:grid-cols-2 gap-4 ">
              <div className="w-full">
                <Label className="pb-3">Enter website</Label>
                <Input
                  type="text"
                  value={input.website}
                  onChange={changeEventHandler}
                  name="website"
                  placeholder="Enter Website"
                />
              </div>
              <div className="w-full">
                <Label className="pb-3">Enter Location</Label>
                <Input
                  type="text"
                  value={input.location}
                  onChange={changeEventHandler}
                  name="location"
                  placeholder="Enter Location"
                />
              </div>
            </div>
            <div className="mt-5">
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
              />
            </div>
            <div className="py-5">
              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700"
              >
                {isLoading ? "Updating..." : "Update"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CompanySetup;
