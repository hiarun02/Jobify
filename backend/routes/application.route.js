import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  applyJob,
  getApplicants,
  getAppliedJob,
  updateStatus,
} from "../controllers/application.controller.js";
import {
  applicantStatusLimiter,
  applyJobLimiter,
} from "../middlewares/rateLimiter.js";

const router = express.Router();

router.route("/apply/:id").get(applyJobLimiter, isAuthenticated, applyJob);
router.route("/get").get(isAuthenticated, getAppliedJob);
router.route("/:id/applicants").get(isAuthenticated, getApplicants);
router
  .route("/status/:id/update")
  .post(applicantStatusLimiter, isAuthenticated, updateStatus);

export default router;
