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

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(getAllJob);
router.route("/adminjob").get(isAuthenticated, getAdminJobs);
router.route("/get/:id").get(getJobById);
router.route("/saved").post(isAuthenticated, saveJob);
router.route("/get-saved-jobs").get(isAuthenticated, getSavedJobs);
router.route("/delete-saved-job").post(isAuthenticated, deleteSavedJob);
router.route("/update/:id").patch(isAuthenticated, updateJob);
router.route("/delete/:id").delete(isAuthenticated, deleteJob);

export default router;
