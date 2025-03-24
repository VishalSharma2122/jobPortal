import Navbar from "@/shared/Navbar";
import Footer from "@/shared/Footer";
import React from "react";
import JobCard from "./JobCard";
const randomJobs = [1, 2, 3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

export default function Browse() {
  return (
    <>
      <Navbar />
      <div className=" max-w-auto mx-auto my-10 ">
        <h1 className=" font-bold text-xl my-10">search result({randomJobs.length})</h1>

        <div className="grid grid-cols-3 gap-4 mt-5">
          {randomJobs.map((item, index) => (
            <JobCard key={index} />
          ))}
        </div>
      </div>
      <Footer/>
    </>
  );
}
