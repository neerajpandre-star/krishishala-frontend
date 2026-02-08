import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Student-only register
export const register = async (req, res) => {
  const { name, email, password, examPreference } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashed,
      examPreference: examPreference.toLowerCase(), // ✅ normalize here
      role: "student", // only student registration
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login (supports adminLogin toggle)
export const login = async (req, res) => {
  const { email, password, adminLogin } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    if (adminLogin && user.role !== "admin")
      return res.status(403).json({ message: "Access denied: Not an admin" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        examPreference: user.examPreference,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
