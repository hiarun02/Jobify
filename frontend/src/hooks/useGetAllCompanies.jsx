import {useEffect} from "react";
import {setCompanies} from "@/redux/companySlice";
import {useDispatch} from "react-redux";
import {api} from "@/api/api";

const useGetAllCompanies = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await api.get(`/api/company/get`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setCompanies(res.data.companies));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCompanies();
  }, []);
};

export default useGetAllCompanies;
