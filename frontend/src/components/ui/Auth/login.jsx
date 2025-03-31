import Navbar from "@/shared/Navbar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import React from "react";
import Footer from "@/shared/Footer";


function Login() {
  const [ input, setInput ] = useState({
    email: "",
    password: "",
    role:""
  });
  const {loading} = useSelector(store=>store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const changEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {  
      dispatch(setLoading(true));
    const res = await axios.post("https://jobportal-2hn1.onrender.com/api/v1/user/login", input,{
headers:{
  "Content-Type":"application/json"
},
withCredentials:true
    });
    if(res.data.success){
      dispatch(setUser(res.data.user));
      navigate("/"); 
      toast.success(res.data.message);
     
    }
  }catch (error) {
  console.log(error);
   toast.error(error?.response?.data?.message || "something went wrong");
  }
  finally{
    dispatch(setLoading(false));}
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center  max-w-7xl mx-auto ">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-5 shadow-md mt-10 mb-10"
        >
          <h1 className="font-bold text-xl mb-5 ">Login</h1>
          <div className="my-2">
            <Label>Email</Label>
            <Input type="email" placeholder="Vishal@gmail.com"
            value={input.email}
            onChange={changEventHandler}
            name="email"
            />
          </div>

          <div className="my-2">
            <Label>Password</Label>
            <Input type="password" placeholder="Password"
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

                <Label htmlFor="student">Student</Label>
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
                <Label htmlFor="recruiter">Recruiter</Label>
              </div>
            </RadioGroup>
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
            If already have an account?
            <Link to="/Signup" className="text-red-600 hover:text-[#582aa8]">
              {" "}
              Signup
            </Link>{" "}
          </span>
        </form>
      </div>
      <Footer/>
    </>
  );
}

export default Login;
