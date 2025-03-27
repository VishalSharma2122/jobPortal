import Navbar from "@/shared/Navbar";
import React from "react";
import FilterCard from "./FilterCard";
import JobCard from "./JobCard";
import Footer from "@/shared/Footer";
import { useSelector } from "react-redux";

//const JobsArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
 // Prevents destructuring error
export default function Jobs() {
  const { allJobs = [] } = useSelector((store) => store.job);
  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto mt-5 ">
        <div className="flex gap-5">
          <div className="w-1/6">
            <FilterCard />
          </div>
          {allJobs.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className=" grid grid-cols-3 gap-4">
                {allJobs.map((job) => (
                  <div key={job?._id}>
                    <JobCard job={job} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
