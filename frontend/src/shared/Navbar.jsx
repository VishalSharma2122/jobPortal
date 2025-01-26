import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { Avatar, AvatarImage } from "../components/ui/avatar";
import { Button } from "@/components/ui/button";

function Navbar() {
  const user = false;
  return (
    <div className="bg-white mr-15">
      <div className=" flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#f83002]">Portal</span>
          </h1>
        </div>
        <div className=" flex items-center gap-10 ">
          <ul className="flex font-medium items-center gap-5">
            <li>Home</li>
            <li>Jobs</li>
            <li>Browse</li>
          </ul>
          <div>
            {!user ? (
              <div className="flex items-center gap-3">
                               <Button variant="outline">Login</Button>
               <Button variant="outline" className="bg-[#6A38C2] hover:bg-[#582aa8]">Signup</Button>

              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className=" w-80">
                  <div className="flex gap-4 space-y-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">CodeWithVishal</h4>
                      <p className="text-sm text-muted-foreground">
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Optio{" "}
                      </p>
                    </div>
                  </div>
                  <div>
                    <Button variant="link">Profile</Button>
                  </div>
                </PopoverContent>
              </Popover>
            )}
           
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
