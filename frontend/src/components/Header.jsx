import {useState} from "react";
import {LogOut, Menu, User, X} from "lucide-react";
import {Link, useNavigate} from "react-router-dom";
import {Popover, PopoverTrigger, PopoverContent} from "@radix-ui/react-popover";
import {Avatar, AvatarImage} from "./ui/avatar";
import {Button} from "./ui/button";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "sonner";
import {setUser} from "@/redux/authSlice";
import {api} from "@/api/api";

const Header = () => {
  const UserNavLinks = [
    {name: "Home", path: "/"},
    {name: "Jobs", path: "/jobs"},
    {name: "Saved", path: "/saved"},
  ];

  const recruiterNavLinks = [{name: "Dashboard", path: "/recruiter/dashboard"}];

  const [open, setOpen] = useState(false);

  const toggleNav = () => {
    setOpen(!open);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await api.get(`/api/user/logout`, {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log("Error", error.message);
      toast.error(error.response.message);
    }
  };

  const {user} = useSelector((store) => store.auth);
  return (
    <>
      <header className="bg-white border-t border-gray-200 border-b">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 ">
          <div className="flex h-16 items-center justify-between">
            <div className="md:flex md:items-center md:gap-12">
              <Link to="/">
                <a className="block bg-transparent text-red-700 border-3 rounded-md px-4 py-1.5 font-bold">
                  <span>#Jobify</span>
                </a>{" "}
              </Link>
            </div>
            <div className="flex items-center justify-center gap-5">
              <div className="hidden md:block">
                <nav>
                  <ul className="flex items-center gap-6 text-md ">
                    {user && user.role === "recruiter"
                      ? recruiterNavLinks.map((link) => {
                          return (
                            <Link
                              key={link.name}
                              to={link.path}
                              className="text-gray-600 hover:text-red-700 transition-colors font-medium"
                            >
                              {link.name}
                            </Link>
                          );
                        })
                      : UserNavLinks.map((link) => {
                          return (
                            <Link
                              key={link.name}
                              to={link.path}
                              className="text-gray-600 hover:text-red-700 transition-colors font-medium"
                            >
                              {link.name}
                            </Link>
                          );
                        })}
                  </ul>
                </nav>
              </div>
              {/* Desktop Nav */}
              <div className="flex items-center gap-4">
                <div className="sm:flex sm:gap-4">
                  {!user ? (
                    <>
                      <Link to="/register">
                        <Button className="hidden sm:flex" variant="outline">
                          Register
                        </Button>
                      </Link>
                      <Link to="/login">
                        <Button
                          className="bg-red-600 text-white
                        hover:bg-red-700
                        hover:text-white"
                          variant="outline"
                        >
                          Login
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Popover className="">
                        <PopoverTrigger asChild>
                          <Avatar>
                            <AvatarImage
                              src={user?.profile?.profilePhoto}
                              alt="profilePhoto"
                            />
                          </Avatar>
                        </PopoverTrigger>
                        <PopoverContent className="w-50 mt-10 shadow-2xs bg-white text-black p-4 flex flex-col">
                          <div className="flex gap-2 space-y-2 ">
                            <Avatar>
                              <AvatarImage
                                src={user?.profile?.profilePhoto}
                                alt="profilePhoto"
                              />
                            </Avatar>
                            <h4 className=" font-sans text-foreground">
                              Hi, {user?.fullName}
                            </h4>
                          </div>
                          <div className="flex flex-col">
                            <div className="flex space-x-2c w-fit items-center ">
                              {user && user.role === "student" ? (
                                <>
                                  <User />
                                  <Button
                                    className="border-none"
                                    variant="link"
                                  >
                                    <Link to="/profile">View Profile</Link>
                                  </Button>
                                </>
                              ) : null}
                            </div>
                            <div className="flex  space-x-2 w-fit items-center ">
                              <LogOut />
                              <Button onClick={logoutHandler} variant="link">
                                logout
                              </Button>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </>
                  )}
                </div>
                <div className="block md:hidden">
                  <button
                    onClick={toggleNav}
                    className="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                  >
                    {open ? <X /> : <Menu />}
                  </button>
                  {open && (
                    <div className="xl:hidden absolute bg-gray-100 w-[50vw] top-[65px] z-0 flex flex-col right-0 text-black text-center py-5 pb-5 gap-10 font-bold max-h-[90vh] ">
                      {user && user.role === "recruiter"
                        ? recruiterNavLinks.map((link) => {
                            return (
                              <Link
                                key={link.name}
                                to={link.path}
                                className="text-gray-600 hover:text-red-700 transition-colors font-medium"
                              >
                                {link.name}
                              </Link>
                            );
                          })
                        : UserNavLinks.map((link) => {
                            return (
                              <Link
                                key={link.name}
                                to={link.path}
                                className="text-gray-600 hover:text-red-700 transition-colors font-medium"
                              >
                                {link.name}
                              </Link>
                            );
                          })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
