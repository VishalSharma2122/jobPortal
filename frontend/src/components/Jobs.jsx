import Navbar from "@/shared/Navbar";
import React from "react";
import FilterCard from "./FilterCard";
import JobCard from "./JobCard";
import Footer from "@/shared/Footer";

const JobsArr = [1, 2, 3, 4, 5, 6, 7, 8,9];

export default function Jobs() {
  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto mt-5 ">
        <div className="flex gap-5">
          <div className="w-1/6">
            <FilterCard />
          </div>
            {JobsArr.length <= 0 ? (
              <span>Job not found</span>
            ) : (
              <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
                <div className=" grid grid-cols-3 gap-4">
                  {JobsArr.map((item, index) => (
                    <div>
                      <JobCard key={index} />
                    </div>
                  ))
                }
                </div>
              </div>
            )
          }
        </div>
      </div>
      <Footer/>
    </div>
  );
}