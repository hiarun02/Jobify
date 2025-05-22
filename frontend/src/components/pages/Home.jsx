import useGetAllJobs from "@/hooks/useGetAllJobs";
import HeroSection from "../HeroSection";
import LatestJobes from "../LatestJobes";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const Home = () => {
  useGetAllJobs();
  const {user} = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/recruiter/dashboard");
    }
  });

  return (
    <div className="h-fit">
      <HeroSection />
      <LatestJobes />
    </div>
  );
};

export default Home;
