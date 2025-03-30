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
export const getAppliedJobs = async (req,res) => {
  try {
    const userId = req.userId;
      const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
          path:'job',
          options:{sort:{createdAt:-1}},
          populate:{
              path:'company',
              options:{sort:{createdAt:-1}},
          }
      });
      if(!application){
          return res.status(404).json({
              message:"No Applications",
              success:false
          })
      };
      return res.status(200).json({
        message:"Applications fetched successfully",
          application,
          success:true
      })
  } catch (error) {
      console.log(error)
      success:false
  }
}

export const getApplicant = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path:'applications',
      options:{sort:{createdAt:-1}},
      populate:{
          path:'applicant'
      }
  });

    if (!job) {
      return res.status(404).json({
        message: "job not found",
        success: false,
      });
    }
  
    if (!job.applications || job.applications.length === 0) {
      return res.status(404).json({
        message: "No applicants found for this job",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Applicants found",
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
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!status) {
      return res.status(404).json({
        message: "Status not found",
        success: false,
      });
    }
    const application = await Application.findOne({_id:applicationId});
    if (!application) {
      return res.status(404).json({
        message: "application not found",
        success: false,
      });
    }
    application.status = status.toLowerCase();
    await application.save();
    return res.status(200).json({
      message: "application  updated successfully",
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
