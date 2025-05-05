import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    res.cookie(token, {
      httpOnly: true,
      secure: false,
      sameSite: "None",
    });

    if (!token) {
      return res.status(401).json({
        message: "User Not Auithenticated..",
        success: false,
      });
    }

    // token verify
    const tokenDecode = jwt.verify(token, process.env.SECRET_KEY);

    if (!tokenDecode) {
      return res.status(401).json({
        message: "invalide token..",
        success: false,
      });
    }

    req.id = tokenDecode.userId;
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export default isAuthenticated;
