import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    // Retrieve the token from cookies
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        message: "User not authenticated.",
        success: false,
      });
    }

    // Verify the token
    const tokenDecode = jwt.verify(token, process.env.SECRET_KEY);

    if (!tokenDecode) {
      return res.status(401).json({
        message: "Invalid token.",
        success: false,
      });
    }

    // Attach user ID to the request object
    req.id = tokenDecode.userId;
    next();
  } catch (error) {
    // Handle specific JWT errors
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        message: "Invalid token.",
        success: false,
      });
    } else if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token expired.",
        success: false,
      });
    } else {
      console.error("Authentication error:", error.message);
      return res.status(500).json({
        message: "Internal Server Error",
        success: false,
      });
    }
  }
};

export default isAuthenticated;
