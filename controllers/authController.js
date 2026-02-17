import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

/* ================= REGISTER ================= */

export const register = async (req, res) => {
  try {
    const { name, email, password, examPreference } = req.body;

    // 🔐 Validate required fields
    if (!name || !email || !password || !examPreference) {
      return res.status(400).json({
        message: "All fields (name, email, password, examPreference) are required",
      });
    }

    // 🔍 Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // 🔒 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 👤 Create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      examPreference: examPreference.toLowerCase(),
      role: "student",
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        examPreference: newUser.examPreference,
        role: newUser.role,
      },
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};


/* ================= LOGIN ================= */

export const login = async (req, res) => {
  try {
    const { email, password, adminLogin } = req.body;

    // 🔐 Validate
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // 🔍 Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 👑 Admin check
    if (adminLogin && user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Not an admin" });
    }

    // 🔒 Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 🪪 Create JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        examPreference: user.examPreference,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};
