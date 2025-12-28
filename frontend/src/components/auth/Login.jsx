import {Input} from "../ui/input";
import {RadioGroup, RadioGroupItem} from "../ui/radio-group";
import {Label} from "../ui/label";
import {Link} from "react-router-dom";
import {useState} from "react";
import {toast} from "sonner";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setUser} from "@/redux/authSlice";
import {LoginHandler} from "@/api/api";

const Login = () => {
  // Initial state for input fields
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const [isLoading, setisLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle input change
  const handleChange = (e) => {
    setInput({...input, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);
    try {
      const res = await LoginHandler(input);
      if (res.data.success) {
        // Dispatch user data to Redux store
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data.message);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <>
      <section className=" pt-10 pb-10">
        <div className="max-w-2xl mx-auto border-1 shadow-2xs rounded-2xl">
          <form className="bg-white px-10 py-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-5">
              <Label className="block text-gray-700 mb-2">Your Email</Label>
              <Input
                type="text"
                name="email"
                value={input.email}
                onChange={handleChange}
                className="w-full"
                placeholder="demo: user : user123@gmail.com, recruiter : admin123@gmail.com"
              />
            </div>

            <div className="mb-5">
              <Label className="block text-gray-700 mb-2" htmlFor="Last Name">
                Password
              </Label>
              <Input
                name="password"
                value={input.password}
                onChange={handleChange}
                type="password"
                className="w-full "
                placeholder="demo: user : user123, recruiter : admin123"
              />
            </div>
            <div className="mb-5">
              <Label className="block text-gray-700 mb-3">
                Select Your Role
              </Label>
              <RadioGroup
                value={input.role}
                onValueChange={(value) => setInput({...input, role: value})}
                className="flex"
              >
                <div className="flex gap-2 border-1 px-5 rounded-3xl shadow-2xs items-center py-1.5">
                  <RadioGroupItem value="student" id="r1" />
                  <Label htmlFor="r1" className="text-gray-700 cursor-pointer">
                    Student
                  </Label>
                </div>
                <div className="flex gap-2 border-1 px-5 rounded-3xl shadow-2xs items-center">
                  <RadioGroupItem value="recruiter" id="r2" />
                  <Label htmlFor="r2" className="text-gray-700 cursor-pointer">
                    Recruiter
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div className="mb-3 items-center gap-2">
              <button
                type="submit"
                className="w-full bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                {isLoading ? "Please Wait..." : "Login"}
              </button>
            </div>
            <span className="text-gray-700 text-sm font-mono">
              {" "}
              Don't have an account? {""}
              <Link
                to="/register"
                className="text-red-700 font-medium underline "
              >
                Create Account
              </Link>
            </span>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
