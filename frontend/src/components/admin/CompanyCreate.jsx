import React, { useState } from "react";
import Navbar from "@/shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const dispatch = useDispatch();
  const registerNewCompany = async () => {
    if (!companyName.trim()) { // Prevent sending empty names
        toast.error("Company name cannot be empty");
        return;
    }

    try {
        const res = await axios.post("https://jobportal-2hn1.onrender.com/api/v1/company/register", { name:companyName }, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        });

        if (res?.data?.success) {
            dispatch(setSingleCompany(res.data.company));
            toast.success(res.data.message);
            navigate(`/admin/companies/${res.data.company._id}`);
        }
    } catch (error) {
        console.error("Error registering company:", error);
        toast.error(error.response?.data?.message)
    }

  };
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="my-10">
          <h1 className="font-bold text-2xl">Your Company Name</h1>
          <p className="text-gray-500">
            What would you like to give your company name? you can change this
            later.
          </p>
        </div>

        <Label>Company Name</Label>
        <Input
          type="text"
          className="my-2"
          placeholder="JobHunt, Microsoft etc."
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <div className="flex items-center gap-2 my-10">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/companies")}
          >
            Cancel
          </Button>
          <Button onClick={registerNewCompany}>Continue</Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
