import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  getAdminJobs,
  getAllJob,
  getJobById,
  getSavedJobs,
  postJob,
  saveJob,
} from "../controllers/job.controller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(getAllJob);
router.route("/adminjob").get(isAuthenticated, getAdminJobs);
router.route("/get/:id").get(getJobById);
router.route("/save-job/:id").post(isAuthenticated, saveJob);
router.route("/get-saved-jobs").get(isAuthenticated, getSavedJobs);

export default router;
