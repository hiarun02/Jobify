import {Job} from "../models/job.model.js";
import {User} from "../models/user.model.js";
import {deleteCache, getCache, setCache} from "../utils/cache.js";

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
    await deleteCache("jobs:list");
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
    const cacheKey = "jobs:list";
    // Check cache first
    const cached = await getCache(cacheKey);
    if (cached) {
      return res.status(200).json({
        fromCache: true,
        jobs: cached,
        success: true,
      });
    }

    // Fetch from DB
    const jobs = await Job.find({})
      .populate({path: "company"})
      .sort({createdAt: -1})
      .lean();

    await setCache(cacheKey, jobs, 60);

    // Respond once
    return res.status(200).json({
      fromCache: false,
      jobs,
      success: true,
    });
  } catch (error) {
    console.log("Get jobs error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
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

    const cacheKey = `user:${userId}:savedJobs`;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.savedJobs.includes(jobId)) {
      return res.status(400).json({
        success: false,
        message: "Job already saved",
      });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    user.savedJobs.push(jobId);
    await user.save();

    await deleteCache(cacheKey);

    return res.status(200).json({
      success: true,
      message: "Job saved successfully",
      savedJobs: user.savedJobs,
      fromCache: false,
    });
  } catch (error) {
    console.error("Save job error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// get saved jobs

export const getSavedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const cacheKey = `user:${userId}:savedJobs`;

    const cache = await getCache(cacheKey);
    if (cache) {
      return res
        .status(200)
        .json({savedJobs: cache, success: true, fromCache: true});
    }

    const user = await User.findById(userId).populate({
      path: "savedJobs",
      populate: {path: "company"},
    });

    await setCache(cacheKey, user.savedJobs, 120);

    if (!user) {
      return res.status(404).json({message: "User not found", success: false});
    }
    return res
      .status(200)
      .json({savedJobs: user.savedJobs, success: true, fromCache: false});
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: "Server error", success: false});
  }
};

export const deleteSavedJob = async (req, res) => {
  try {
    const {jobId} = req.body;
    const userId = req.id;

    const cacheKey = `user:${userId}:savedJobs`;

    const user = await User.findById(userId);

    await deleteCache(cacheKey);

    if (!user) {
      return res.status(404).json({message: "User not found", success: false});
    }

    user.savedJobs.pull(jobId);
    await user.save();

    const populatedUser = await User.findById(userId).populate({
      path: "savedJobs",
      populate: {path: "company"},
    });

    return res.status(200).json({
      message: "Job removed from saved jobs",
      savedJobs: populatedUser.savedJobs,
      success: true,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: "Server error", success: false});
  }
};

// get admin jobs

export const getAdminJobs = async (req, res) => {
  try {
    const cacheKey = "admin:jobs";
    const cache = await getCache(cacheKey);

    if (cache) {
      return res.status(200).json({
        fromCache: true,
        jobs: cache,
        success: true,
      });
    }
    const adminId = req.id;
    const jobs = await Job.find({
      created_by: adminId,
    }).populate({
      path: "company",
    });

    await setCache(cacheKey, jobs, 60);

    if (!jobs) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      fromCache: false,
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error.message);
  }
};

// admin update job

export const updateJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
    } = req.body;

    const job = await Job.findByIdAndUpdate(req.params.id, {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
    });

    await deleteCache("jobs:list");
    await deleteCache(`admin:jobs`);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Job updated successfully",
      success: true,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: "Server error", success: false});
  }
};

// admin delete job

export const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findByIdAndDelete(jobId);

    await deleteCache("jobs:list");
    await deleteCache(`admin:jobs`);

    if (!job) {
      return res.status(404).json({message: "Job not found", success: false});
    }
    return res
      .status(200)
      .json({message: "Job deleted successfully", success: true});
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: "Server error", success: false});
  }
};
