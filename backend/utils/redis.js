import RedisClient from "ioredis";

const redis = new RedisClient({
  host: "localhost", //  process.env.REDIS_HOST,
  port: 6379, // process.env.REDIS_PORT,

  // password: process.env.REDIS_PASSWORD,
});

redis.on("connect", () => {
  console.log("Redis connected");
});

redis.on("error", (err) => {
  console.error("Redis error", err);
});

export default redis;
