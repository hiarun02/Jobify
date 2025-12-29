import {Label} from "./ui/label";
import {Avatar, AvatarImage} from "./ui/avatar";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button} from "./ui/button";
import {Popover, PopoverContent, PopoverTrigger} from "./ui/popover";
import {MoreHorizontal} from "lucide-react";

const CompaniesTable = () => {
  const {companies, searchCompany} = useSelector((store) => store.company);
  const [filterCompanies, setFilterCompanies] = useState(companies);

  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompany) {
          return true;
        }
        return company?.name
          ?.toLowerCase()
          .includes(searchCompany.toLowerCase());
      });
    setFilterCompanies(filteredCompany);
  }, [searchCompany, companies]);

  return (
    <>
      <div>
        <Label className="text-xl font-bold font-mono ">
          Your Registered Company
        </Label>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4">
        {filterCompanies?.map((company) => (
          <div
            key={company._id}
            className="border rounded-2xl bg-white  p-4 flex flex-col gap-3 w-full"
          >
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={company?.logo}></AvatarImage>
              </Avatar>
              <div>
                <p className="font-semibold text-base">{company.name}</p>
                <p className="text-xs text-gray-500">
                  Created {company?.createdAt.split("T")[0]}
                </p>
              </div>
              <div className="flex justify-end w-fit border rounded">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-40 ">
                    <Button
                      variant="link"
                      className="w-full justify-start"
                      onClick={() =>
                        navigate(`/recruiter/company/${company._id}`)
                      }
                    >
                      Edit
                    </Button>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {(company?.location || company?.website) && (
              <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600">
                {company?.location && (
                  <span className="px-2 py-1 bg-gray-100 rounded-md border text-gray-700">
                    {company.location}
                  </span>
                )}
                {company?.website && (
                  <Button
                    variant="link"
                    className="h-8 px-3 text-red-600"
                    onClick={() => window.open(company.website, "_blank")}
                  >
                    Website
                  </Button>
                )}
              </div>
            )}

            {company?.description && (
              <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
                <span className="font-semibold"> About : </span>{" "}
                {company.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default CompaniesTable;
