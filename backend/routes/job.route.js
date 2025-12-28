import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  deleteJob,
  deleteSavedJob,
  getAdminJobs,
  getAllJob,
  getJobById,
  getSavedJobs,
  postJob,
  saveJob,
  updateJob,
} from "../controllers/job.controller.js";
import {
  recruiterJobsLimiter,
  saveJobLimiter,
} from "../middlewares/rateLimiter.js";

const router = express.Router();

router.route("/post").post(recruiterJobsLimiter, isAuthenticated, postJob);
router.route("/get").get(getAllJob);
router.route("/adminjob").get(isAuthenticated, getAdminJobs);
router.route("/get/:id").get(getJobById);
router.route("/saved").post(saveJobLimiter, isAuthenticated, saveJob);
router.route("/get-saved-jobs").get(isAuthenticated, getSavedJobs);
router
  .route("/delete-saved-job")
  .post(saveJobLimiter, isAuthenticated, deleteSavedJob);
router
  .route("/update/:id")
  .patch(recruiterJobsLimiter, isAuthenticated, updateJob);
router
  .route("/delete/:id")
  .delete(recruiterJobsLimiter, isAuthenticated, deleteJob);

export default router;
