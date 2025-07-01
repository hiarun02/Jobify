import {Job} from "../models/job.model.js";
import {User} from "../models/user.model.js";

export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      position,
      experience,
      companyId,
    } = req.body;
    const userId = req.id;
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !position ||
      !experience ||
      !companyId
    ) {
      return res.status(400).json({
        message: "somthing is missing",
        success: false,
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      position,
      experience,
      company: companyId,
      created_by: userId,
    });

    return res.status(201).json({
      message: "job created successfully",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getAllJob = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        {title: {$regex: keyword, $options: "i"}},
        {description: {$regex: keyword, $options: "i"}},
      ],
    };
    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({createdAt: -1});

    if (!jobs) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
    });
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }
    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error.message);
  }
};

// Save job for user
export const saveJob = async (req, res) => {
  try {
    const userId = req.id;
    const {jobId} = req.body;

    // Find the job
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({message: "Job not found", success: false});
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({message: "User not found", success: false});
    }

    // Prevent duplicate saves
    if (user.savedJobs.includes(jobId)) {
      return res
        .status(400)
        .json({message: "Job already saved", success: false});
    }

    // Save the job
    user.savedJobs.push(jobId);
    await user.save();

    return res
      .status(200)
      .json({message: "Job saved", success: true, savedJobs: user.savedJobs});
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: "Server error", success: false});
  }
};

// get saved jobs

export const getSavedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId).populate("savedJobs");
    if (!user) {
      return res.status(404).json({message: "User not found", success: false});
    }
    return res.status(200).json({savedJobs: user.savedJobs, success: true});
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: "Server error", success: false});
  }
};

export const deleteSavedJob = async (req, res) => {
  try {
    const {jobId} = req.body;

    const userId = req.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({message: "User not found", success: false});
    }

    user.savedJobs.pull(jobId); //

    await user.save();

    return res.status(200).json({
      message: "Job removed from saved jobs",
      savedJobs: user.savedJobs,
      success: true,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: "Server error", success: false});
  }
};

export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;

    const jobs = await Job.find({
      created_by: adminId,
    }).populate({
      path: "company",
    });

    if (!jobs) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error.message);
  }
};
