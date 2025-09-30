import AppError from "../utils/error.util.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
const cookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  httpOnly: true,
  secure: true,
};
export const register = async (req, res, next) => {
  const { username, email, password } = req.body || {};

  if (!username || !email || !password) {
    return next(new AppError("Please provide all required fields", 400));
  }

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return next(new AppError("Email already exists", 400));
    }

    // Create new user
    const user = new User({ username, email, password });

    // Hash password (if not handled in schema)
    if (typeof user.hashPassword === "function") {
      await user.hashPassword();
    }

    await user.save();

    // Generate JWT
    const token = await user.generateJWTToken();

    res.cookie("token", token, cookieOptions);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  try {
    // Find user by email
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new AppError("Invalid email or password", 401));
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return next(new AppError("Wrong password", 401));
    }

    // Generate JWT
    const token = await user.generateJWTToken();

    res.cookie("token", token, cookieOptions);

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
export const logout = async (req, res, next) => {
  try {
    // Clear the cookie
    res.cookie("token", null, {
      secure: true,
      maxAge: 0,
      httpOnly: true,
    });
    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
