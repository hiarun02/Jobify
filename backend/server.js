import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import dotenv from "dotenv";
import redis from "./utils/redis.js";
dotenv.config({});

const app = express();
// Middleware
app.use(express.json()); //
app.use(express.urlencoded({extended: true})); //
app.use(cookieParser());

//production, development
const mode = process.env.MODE;

// CORS configuration
if (mode === "dev") {
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
      credentials: true,
    })
  );
} else if (mode === "prod") {
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
      credentials: true,
    })
  );
}

let PORT = process.env.PORT || 3000;

// Apis
// userApis
app.use("/api/user", userRoute);
// company apis
app.use("/api/company", companyRoute);
// job api
app.use("/api/job", jobRoute);
// application api
app.use("/api/application", applicationRoute);

// // test redis connection
// app.get("/test-redis", async (req, res) => {
//   await redis.set("ping", "pong");
//   const value = await redis.get("ping");

//   res.json({redis: value});
// });

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running at ${PORT}`);
});
