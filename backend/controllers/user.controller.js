import bcrypt from "bcryptjs";
import {User} from "../models/user.model.js";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const {fullName, email, phoneNumber, password, role} = req.body;
    if (!fullName || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "somthing is missing?",
        success: false,
      });
    }

    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    // user alrady exist logic
    const user = await User.findOne({email});
    if (user) {
      return res.status(400).json({
        message: "User alrady exist with this email!",
        success: false,
      });
    }

    // passwordConvertInHas Logic
    const hashedPassword = await bcrypt.hash(password, 10);
    // create user
    await User.create({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: cloudResponse.secure_url,
      },
    });

    return res.status(200).json({
      message: "Account created successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Server error during registration",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const {email, password, role} = req.body;
    //   input missing logic
    if (!email || !password || !role) {
      return res
        .status(400)
        .json({message: "somthing is missing", success: false});
    }

    // User Dose not exist Logic
    let user = await User.findOne({email});
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email...",
        success: false,
      });
    }

    //   if not match

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect password !",
        success: false,
      });
    }

    //   checking role is correct or not

    if (role !== user.role) {
      return res.status(400).json({
        message: "Account does not exist with current role.",
        success: false,
      });
    }

    //  Generate jwt token

    const tokenDate = {
      userId: user._id,
    };

    const token = jwt.sign(tokenDate, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    //   token to store in cookie
    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .json({
        message: `welcome back ${user.fullName}`,
        user,
        success: true,
      });
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", {maxAge: 0}).json({
      message: "Logout successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error during logout",
      success: false,
    });
  }
};

// for Update profile

export const profileUpdate = async (req, res) => {
  try {
    const {fullName, email, phoneNumber, bio, skills} = req.body;

    const cacheKey = `user:${req.id}:profile`;

    // cloudinary to upload file
    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(", ");
    }
    const userId = req.id;
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User Not Found",
        success: false,
      });
    }

    // Profile updated values
    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    // updating resume

    if (cloudinary) {
      user.profile.resume = cloudResponse.secure_url; // save image url
      user.profile.resumeOriginalName = file.originalname; // same file orignal name
    }

    await user.save();

    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile Updated successfully",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error updating profile",
      success: false,
    });
  }
};
