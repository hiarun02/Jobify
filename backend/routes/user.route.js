import express from "express";
import {
  login,
  logout,
  profileUpdate,
  register,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {multerUpload} from "../middlewares/multer.js";
import {authLimiter, updateProfileLimiter} from "../middlewares/rateLimiter.js";

const router = express.Router();

router.route("/register").post(authLimiter, multerUpload, register);
router.route("/login").post(authLimiter, login);
router
  .route("/profile/update")
  .post(updateProfileLimiter, isAuthenticated, multerUpload, profileUpdate);
router.route("/logout").get(logout);
export default router;
