import React from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"; 

import { Avatar, AvatarImage } from "../components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, UserCircle2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

function Navbar() {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_ENDPOINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className=" flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#6A38C2]">Portal</span>
          </h1>
        </div>
        <div className=" flex items-center gap-10 ">
          <ul className="flex font-medium items-center gap-5">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li><Link to="/admin/jobs">Jobs</Link></li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li>
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>
          <div>
            {!user ? (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to="/Signup">
                  <Button
                    variant="outline"
                    className="bg-[#6A38C2] hover:bg-[#582aa8]"
                  >
                    Signup
                  </Button>
                </Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user?.profile?.profilePhoto} />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className=" w-80 border border-gray-200 rounded-lg adow-lg p-4 bg-white">
                  <div className="">
                    <div className="flex gap-4 space-y-2">
                      <Avatar className="cursor-pointer">
                        <AvatarImage src={user?.profile?.profilePhoto} />
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{user?.fullName}</h4>
                        <p className="text-sm text-muted-foreground">
                          {user?.profile?.bio}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col my-2 text-gray-600">
                      <div className="flex w-fit items-center cursor-pointer mb-2">
                        {user && user.role === "student" && (
                          <div className="flex w-fit items-center gap-2 cursor-pointer">
                            <UserCircle2/>
                            <Button variant="link">
                              <Link to="/profile">View Profile</Link>
                            </Button>
                          </div>
                        )}
                      </div>
                      <div className="flex w-fit items-center gap-2 cursor-pointer  ">
                        <Button onClick={logOutHandler} variant="outline">
                          <LogOut />
                          Logout
                        </Button>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
