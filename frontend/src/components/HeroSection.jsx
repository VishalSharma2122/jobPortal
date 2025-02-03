import { Search } from "lucide-react";
import React from "react";

function HeroSection() {
  return (
    <div className="text-center mt-10">
      <span className="px-4 py-2 rounded-full bg-gray-100 text-[#f83002] font-medium">
        No.1 Job Hunt Website
      </span>
      <h1 className=" text-5xl font-bold">
        Search, Apply & <br />{" "}
        <span className="text-[#6A38C2]"> Get Your Dream Job</span>
      </h1>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam,
        numquam!
      </p>
      <div className="flex w-[50%] justify-center mt-5 border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto shadow-lg">
        <input
          type="text"
          placeholder="Find Your Dream Job"
          className="outline-none border-none w-full"
        />
        <button className=" rounded-r-full bg-[#6A38C2] text-white p-2">
            <Search className=" h-5 w-5 "/>
        </button>
      </div>
    </div>
  );
}

export default HeroSection;
