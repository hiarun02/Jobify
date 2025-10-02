import {useEffect, useState} from "react";
import {Label} from "@radix-ui/react-label";
import {RadioGroup, RadioGroupItem} from "./ui/radio-group";
import {setFilterQuery, setSearchQuery} from "@/redux/jobSlice";
import {useDispatch} from "react-redux";

const fillterList = [
  {
    fillterType: "Role Wise",
    fillterData: [
      "Software Developer",
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Developer",
    ],
  },
  {
    fillterType: "Location Wise",
    fillterData: ["india", "delhi", "bangalore", "mumbai"],
  },
];

const JobFillter = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(true);

  const [selectValue, setSelectValue] = useState("");
  const [searchValue, setSearchValue] = useState("");

  // search
  useEffect(() => {
    dispatch(setSearchQuery(searchValue));
  }, [searchValue, dispatch]);

  // filter

  const selectHandler = (value) => {
    setSelectValue(value);
  };

  useEffect(() => {
    dispatch(setFilterQuery(selectValue));
  }, [selectValue, dispatch]);

  return (
    <div className="flex flex-col w-full h-fit bg-white rounded-lg">
      {/* Search Bar */}
      <div className="mb-5 flex gap-3 items-center justify-between">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search any Job"
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700"
        />
      </div>
      {/* Toggle Button for Small Devices */}
      <button
        className="lg:hidden mb-5 bg-red-600 text-white px-4 py-2 rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Hide Filters" : "Show Filters"}
      </button>

      {/* Filter Section */}
      <div
        className={`w-full overflow-y-auto scrollbar-hide ${
          !isOpen ? "hidden" : ""
        }`}
      >
        <h1 className="text-2xl text-center lg:text-left">
          <span className="text-red-700 font-bold">#Filter</span> Jobs
        </h1>
        <hr className="mt-2" />
        <RadioGroup value={selectValue} onValueChange={selectHandler}>
          {fillterList.map((data, index) => (
            <div key={index} className="mt-4">
              <h1 className="font-semibold">
                <hr className="mb-3" />
                {data.fillterType}
              </h1>
              {data.fillterData.length > 0 ? (
                data.fillterData.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-2 my-2">
                    <RadioGroupItem value={item} />
                    <Label className="text-sm" htmlFor={idx}>
                      {item}
                    </Label>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No results found</p>
              )}
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default JobFillter;
