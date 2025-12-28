import redis from "./redis.js";

export const setCache = async (key, value, ttlSeconds = 60) => {
  try {
    await redis.set(key, JSON.stringify(value), "EX", ttlSeconds);
  } catch (error) {
    console.error("Error setting cache for key", key, error);
  }
};

export const getCache = async (key) => {
  try {
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error getting cache for key", key, error);
  }
};

export const deleteCache = async (key) => {
  try {
    await redis.del(key);
  } catch (error) {
    console.error("Error deleting cache for key", key, error);
  }
};
