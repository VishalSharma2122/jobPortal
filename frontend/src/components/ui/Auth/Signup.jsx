import Navbar from "@/shared/Navbar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Link } from "react-router-dom";
import { useState } from "react";
import React from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { USER_API_ENDPOINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import Footer from "@/components/Footer";

function Signup() {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const {loading} = useSelector(store=>store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const changEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files[0] });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    
    const formdata = new FormData();
    formdata.append("fullName", input.fullName);
    formdata.append("email", input.email);
    formdata.append("phoneNumber", input.phoneNumber);
    formdata.append("password", input.password);
    formdata.append("role", input.role);
    
    if (input.file) {
        formdata.append("file", input.file, input.file.name);
    }

    try {
         dispatch(setLoading(true));
        const res = await axios.post(`${USER_API_ENDPOINT}/register`, formdata, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
        });

        if (res.data.success) {
            toast.success(res.data.message);
            navigate("/login");
        }
    } catch (error) {
        console.log("Registration error:", error);
        if (error.response && error.response.data) {
            toast.error(error.response.data.message);
        }
    }
     finally{
        dispatch(setLoading(false));
      }
};
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center  max-w-7xl mx-auto ">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-5 shadow-md mt-10 mb-10"
        >
          <h1 className="font-bold text-xl mb-5 "> Signup</h1>
          <div className="my-2">
            <Label>Full Name </Label>
            <Input
              type="text"
              placeholder="Vishal Sharma"
              value={input.fullName}
              onChange={changEventHandler}
              name="fullName"
            />
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Vishal@gmail.com"
              value={input.email}
              onChange={changEventHandler}
              name="email"
            />
          </div>
          <div className="my-2">
            <Label>Phone No. </Label>
            <Input
              type="text"
              placeholder="1234567890"
              value={input.phoneNumber}
              onChange={changEventHandler}
              name="phoneNumber"
            />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Password"
              value={input.password}
              onChange={changEventHandler}
              name="password"
            />
          </div>
          <div className="flex items-center justify-between mb-5">
            <RadioGroup
              defaultValue="comfortable"
              className="flex items-center gap-4"
            >
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="student"
                  value="student"
                  name="role"
                  checked={input.role === "student"}
                  onChange={(e) => setInput({ ...input, role: e.target.value })}
          
                  className="cursor-pointer accent-black"
                />

                <Label htmlFor="student">student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="recruiter"
                  value="recruiter"
                  name="role"
                  checked={input.role === "recruiter"}
                  onChange={(e) => setInput({ ...input, role: e.target.value })}
                  className="cursor-pointer accent-black"
                />
                <Label htmlFor="recruiter">recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="gap-3 flex items-center">
            <label htmlFor="">Profile</label>
            <input
              type="file"
              accept="image/*"
              onChange={changeFileHandler}
              className="cursor-pointer"
            />
          </div>
          { 
             loading ? (
              <button
                className="w-full my-4 flex items-center justify-center bg-gray-300 cursor-not-allowed rounded-md p-2"
                disabled
              >
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Please wait
              </button>
            ):(<button
            type="submit"
            className="w-full font-bold bg-[#6A38C2] hover:bg-[#582aa8] my-5 border border-grey-200 shadow-md rounded-md p-2 "
          >
            Login
          </button>
         )}
          <span>
            If already have an account ,  
            <Link to="/login" className="text-red-600 hover:text-[#582aa8]">
              Login
            </Link>
          </span>
        </form>
      </div>
      <Footer/>
    </>
  );
}

export default Signup;
