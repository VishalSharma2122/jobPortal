import { Ghost } from "lucide-react";
import { Badge } from "./ui/badge";
import React from "react";

function LatestJobcard() {
  return (
    <div  className="p-5 rounded-md shadow-lg  bg-white">
      <div>
        <h1 className="font-medium text-lg ">Company Name</h1>
        <p className="text-sm text-gray-500">India</p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">Job Title</h1>
        <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam?</p>
      </div>
      <div className="flex items-center gap-2 mt-4 ">
        <Badge className="{ text-blue-700 font-bold}" variant={Ghost}>
          12 Positions
        </Badge>
        <Badge className=" text-red-700 font-bold " variant={Ghost}>
          40LPA
        </Badge>
        <Badge className=" text-[#7209b7] font-bold" variant={Ghost}>
          Part Time
        </Badge>
      </div>
    </div>
  );
}

export default LatestJobcard;
