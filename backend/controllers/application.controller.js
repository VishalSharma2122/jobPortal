import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.userId;
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(400).json({
        message: "job id is required",
        success: false,
      });
    }
    // cheak if applicant already apply to this job

    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingApplication) {
      return res.status(400).json({
        message: "applicnat already applied for this job",
        success: false,
      });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(400).json({
        message: "job not exixting on the ",
        success: false,
      });
    }
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    job.applications.push(newApplication._id);
    await job.save();
    return res.status(200).json({
      message: "applied successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.userId;
    const application = await Application.find({ applicant: userId }).populate([
      {
        path: "job",
      },
      {
        path: "applicant",
        select:{password:0}
      },
    ]);
    if (!application) {
      return res.status(400).json({
        message: "No application",
        success: false,
      });
    }
      return res.status(200).json({
        message: "application found",
        application,
        success: true,
      });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const getApplicant = async (req,res)=>{
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate([{
          path: "applications",
          populate: {
            path: "applicant", // Populate applicant inside applications
            select:{password:0}
          },
        }]);

        if(!Job){
            return res.status(404).json({
                message: "job not found",
                success: false,
              });
                  
        }
            return res.status(200).json({
                message: "job found",
                job,
                success: true,
              });

        
    } catch (error) {
        console.log(error);
         return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
        
    }
}


export const updateStatus = async (req,res)=>{
    try {
        const {status}=req.body
        const applicationId = req.params.id
        if(!status){
            return res.status(404).json({
                message: "Status not found",
                success: false,
              });
        }

        const application = await Application.findById({_id:applicationId})
        if(!application){
          return res.status(404).json({
            message: "application not found",
            success: false,
          });

        }
        application.status= status.toLowerCase();
        await application.save();
        return res.status(200).json({
          message: "application  updated successfully",
          application,
          success: true,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
          });
    }
}
