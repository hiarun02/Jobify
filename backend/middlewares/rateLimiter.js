import rateLimit, {ipKeyGenerator} from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import redis from "../utils/redis.js";

// Rate limiter for authentication routes (login, register)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,

  keyGenerator: (req) => ipKeyGenerator(req.ip),

  store: new RedisStore({
    sendCommand: (...args) => redis.call(...args),
    prefix: "rl:Auth:",
  }),

  message: {
    success: false,
    message: "Too many login attempts. Please try again after some time.",
  },
});

// rate limiter for recruiter specific routes

// Company creation and update limiter
export const recruiterCompanyLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,

  store: new RedisStore({
    sendCommand: (...args) => redis.call(...args),
    prefix: "rl:Company:",
  }),
  keyGenerator: (req) => req.userId,
  message: {
    success: false,
    message: "Too many requests.",
  },
});

// Job posting and update and deletion limiter
export const recruiterJobsLimiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  max: 50,

  store: new RedisStore({
    sendCommand: (...args) => redis.call(...args),
    prefix: "rl:JobCRUD:",
  }),

  keyGenerator: (req) => req.userId,

  message: {
    success: false,
    message: "Too many requests",
  },
});

// Applicant status update limiter
export const applicantStatusLimiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  max: 50,

  store: new RedisStore({
    sendCommand: (...args) => redis.call(...args),
    prefix: "rl:ApplicantStatus:",
  }),

  keyGenerator: (req) => req.userId,
  message: {
    success: false,
    message: "Too many requests.",
  },
});

// rateLimiter for user general routes

// Apply Job Limiter
export const applyJobLimiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  max: 20,
  keyGenerator: (req) => req.userId,
  store: new RedisStore({
    sendCommand: (...args) => redis.call(...args),
    prefix: "rl:ApplyJob:",
  }),
  message: {
    success: false,
    message: "Too many job applications. Slow down.",
  },
});

// Save and delete saved Job Limiter
export const saveJobLimiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  max: 50,
  keyGenerator: (req) => req.userId,
  store: new RedisStore({
    sendCommand: (...args) => redis.call(...args),
    prefix: "rl:SaveJob:",
  }),
  message: {
    success: false,
    message: "Too many save actions. try again later.",
  },
});

// Update Profile Limiter
export const updateProfileLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  keyGenerator: (req) => req.userId,
  store: new RedisStore({
    sendCommand: (...args) => redis.call(...args),
    prefix: "rl:UpdateProfile:",
  }),
  message: {
    success: false,
    message: "Profile update limit reached.",
  },
});
