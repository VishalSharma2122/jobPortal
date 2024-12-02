import { Job } from "../models/job.model.js";

export const postJob = async (req, res) => {
    try {
        const {
            title,
            description,
            requirements = [],
            salary,
            location,
            jobType,
            experience,
            position,
            companyId
        } = req.body;
        const userId = req.userId;

        // Validate required fields
        if (!title || !description || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Some required fields are missing",
                success: false,
            });
        }

        const job = await Job.create({
            title,
            description,
            requirements,
            salary: Number(salary),
            location,
            jobType,
            experience,
            position,
            company: companyId,
            created_by: userId
        });

        return res.status(200).json({
            message: "New job created",
            job,
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};

export const getAllJobs = async (req,res)=>{
    try {
        const keyword = req.query.keyword || " ";
        const query = {
            $or:[
                {title:{$regex:keyword,$options:"i"}},
                {description:{$regex:keyword,$options:"i"}}
            ]
        }
        const jobs = await Job.find(query);
        if(!jobs){
            return res.status(404).json({
                message: " Jobs not found",
                success: false
            });
        }
        return res.status(200).json({
            message: " jobs founded",
            jobs,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server error",
            success: false
        });
        
    }
}

export const getJobById = async(req,res)=>{
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                message: " Jobs not found",
                success: false
            });
        }
        return res.status(200).json({
            message: " job found",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server error",
            success: false
        });
        
    }
}
// jobs of admin
export const getAdminJobs = async(req,res)=>{
    try {
        const adminId = req.userId;
        const jobs = await Job.find({created_by:adminId});
        if(!jobs){
            return res.status(404).json({
                message: " Jobs not found",
                success: false
            });
        }
        return res.status(200).json({
            message: " jobs founded",
            jobs,
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server error",
            success: false
    })
}
}