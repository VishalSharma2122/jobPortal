import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  const Job = useSelector((store) => store.job);

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  return (
    <div className="p-4 sm:p-5 rounded-lg shadow-lg bg-white border border-gray-200 transition-all hover:shadow-xl w-full max-w-[400px] mx-auto md:max-w-[500px] lg:max-w-[600px]">
      {/* Top Section */}
      <div className="flex items-center justify-between">
        <p className="text-xs sm:text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(Job?.createdAt)} days ago`}
        </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-3 my-3">
        <Avatar className="w-12 h-12">
          <AvatarImage src={job?.company?.logo} alt="Company Logo" />
        </Avatar>
        <div>
          <h1 className="font-medium text-base sm:text-lg">{job?.company?.name}</h1>
          <p className="text-xs sm:text-sm text-gray-500">India</p>
        </div>
      </div>

      {/* Job Title & Description */}
      <div>
        <h1 className="font-bold text-lg sm:text-xl my-2">{job?.title}</h1>
        <p className="text-xs sm:text-sm text-gray-600 line-clamp-3">{job?.description}</p>
      </div>

      {/* Job Details (Badges) */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold text-xs sm:text-sm" variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className="text-[#F83002] font-bold text-xs sm:text-sm" variant="ghost">
          {job?.jobType}Part Time
        </Badge>
        <Badge className="text-[#7209b7] font-bold text-xs sm:text-sm" variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="w-full sm:w-auto"
        >
          Details
        </Button>
        <Button className="bg-[#7209b7] w-full sm:w-auto">
          Save
        </Button>
      </div>
    </div>
  );
};

export default JobCard;
