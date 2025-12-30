import {useState} from "react";
import {LogOut, Menu, User, X, Briefcase} from "lucide-react";
import {Link, useNavigate, useLocation} from "react-router-dom";
import {Popover, PopoverContent, PopoverTrigger} from "./ui/popover";
import {Avatar, AvatarImage} from "./ui/avatar";
import {Button} from "./ui/button";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "sonner";
import {setUser} from "@/redux/authSlice";
import {api} from "@/api/api";

const Header = () => {
  const UserNavLinks = [
    {name: "Home", path: "/"},
    {name: "Explore Jobs", path: "/jobs"},
    {name: "Applied Jobs", path: "/applied-jobs"},
    {name: "Saved Jobs", path: "/saved"},
  ];

  const recruiterNavLinks = [{name: "Dashboard", path: "/recruiter/dashboard"}];

  const [open, setOpen] = useState(false);

  const toggleNav = () => {
    setOpen(!open);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {setJobs} = useSelector((store) => store.jobs);

  const logoutHandler = async () => {
    try {
      const res = await api.get(`/api/v1/user/logout`, {
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/");

        dispatch(setUser(null));
        setJobs([]);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log("Error", error.message);
      toast.error(error.response.message);
    }
  };

  const {user} = useSelector((store) => store.auth);

  const location = useLocation();

  const isActiveLink = (path) => location.pathname === path;

  // Only show Saved Jobs when a user is logged in
  const visibleUserLinks = user
    ? UserNavLinks
    : UserNavLinks.filter(
        (l) => l.name !== "Saved Jobs" && l.name !== "Applied Jobs"
      );

  return (
    <>
      <header className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Link
                to="/"
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <Briefcase className="h-6 w-6 text-red-600" />
                <span className="text-xl font-bold text-red-600">Jobify</span>
              </Link>
            </div>
            <div className="flex items-center gap-6">
              <div className="hidden md:block">
                <nav>
                  <ul className="flex items-center gap-5">
                    {user && user.role === "recruiter"
                      ? recruiterNavLinks.map((link) => {
                          return (
                            <li key={link.name}>
                              <Link
                                to={link.path}
                                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                                  isActiveLink(link.path)
                                    ? "text-red-600"
                                    : "text-gray-600 hover:text-red-600"
                                }`}
                              >
                                {link.name}

                                {isActiveLink(link.path) && (
                                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 rounded-full"></span>
                                )}
                              </Link>
                            </li>
                          );
                        })
                      : visibleUserLinks.map((link) => {
                          return (
                            <li key={link.name}>
                              <Link
                                to={link.path}
                                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                                  isActiveLink(link.path)
                                    ? "text-red-600"
                                    : "text-gray-600 hover:text-red-600"
                                }`}
                              >
                                {user &&
                                link.name === "Saved Jobs" &&
                                link.path === "/saved"
                                  ? `${link.name}`
                                  : link.name}

                                {isActiveLink(link.path) && (
                                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 rounded-full"></span>
                                )}
                              </Link>
                            </li>
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
                        <Button
                          className="hidden sm:flex border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                          variant="outline"
                        >
                          Register
                        </Button>
                      </Link>
                      <Link to="/login">
                        <Button className="bg-red-600 text-white hover:bg-red-700 shadow-sm">
                          Login
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Popover>
                        <PopoverTrigger asChild>
                          <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                            <Avatar className="h-8 w-8 ring-2 ring-red-100">
                              <AvatarImage
                                src={user?.profile?.profilePhoto}
                                alt="profilePhoto"
                              />
                            </Avatar>
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-64 mt-2 shadow-lg bg-white border border-gray-200 rounded-lg p-0 overflow-hidden">
                          <div className="p-4 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage
                                  src={user?.profile?.profilePhoto}
                                  alt="profilePhoto"
                                />
                              </Avatar>
                              <div>
                                <h4 className="font-medium text-gray-900">
                                  {user?.fullName}
                                </h4>
                                <p className="text-sm text-gray-500 capitalize">
                                  {user?.role}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="p-2">
                            {user && user.role === "student" && (
                              <Link to="/profile">
                                <Button
                                  variant="ghost"
                                  className="w-full justify-start gap-2 text-gray-700 hover:bg-gray-50"
                                >
                                  <User className="h-4 w-4" />
                                  View Profile
                                </Button>
                              </Link>
                            )}
                            <Button
                              onClick={logoutHandler}
                              variant="ghost"
                              className="w-full justify-start gap-2 text-red-600 hover:bg-red-50 hover:text-red-700"
                            >
                              <LogOut className="h-4 w-4" />
                              Logout
                            </Button>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </>
                  )}
                </div>
                <div className="block md:hidden">
                  <button
                    onClick={toggleNav}
                    className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    {open ? (
                      <X className="h-5 w-5" />
                    ) : (
                      <Menu className="h-5 w-5" />
                    )}
                  </button>
                  {open && (
                    <div className="md:hidden absolute bg-white border border-gray-200 rounded-lg shadow-lg w-64 top-[72px] right-4 z-40 py-2">
                      <div className="flex flex-col">
                        {user && user.role === "recruiter"
                          ? recruiterNavLinks.map((link) => {
                              return (
                                <Link
                                  key={link.name}
                                  to={link.path}
                                  className={`px-4 py-3 text-sm font-medium transition-colors ${
                                    isActiveLink(link.path)
                                      ? "text-red-600 bg-red-50"
                                      : "text-gray-700 hover:text-red-600 hover:bg-gray-50"
                                  }`}
                                  onClick={() => setOpen(false)}
                                >
                                  {link.name}
                                </Link>
                              );
                            })
                          : visibleUserLinks.map((link) => {
                              return (
                                <Link
                                  key={link.name}
                                  to={link.path}
                                  className={`px-4 py-3 text-sm font-medium transition-colors ${
                                    isActiveLink(link.path)
                                      ? "text-red-600 bg-red-50"
                                      : "text-gray-700 hover:text-red-600 hover:bg-gray-50"
                                  }`}
                                  onClick={() => setOpen(false)}
                                >
                                  {link.name}
                                </Link>
                              );
                            })}
                        {!user && (
                          <div className="border-t border-gray-200 mt-2 pt-3 pb-2 px-3 flex justify-center flex-col gap-3 ">
                            <Link to="/register" onClick={() => setOpen(false)}>
                              <Button
                                variant="outline"
                                className="w-full border-red-200 text-red-600 hover:bg-red-50"
                              >
                                Register
                              </Button>
                            </Link>
                            <Link to="/login" onClick={() => setOpen(false)}>
                              <Button className="w-full bg-red-600 hover:bg-red-700">
                                Login
                              </Button>
                            </Link>
                          </div>
                        )}
                      </div>
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
