import User from "../models/User.js";
import bcrypt from "bcryptjs";

// Register
export const registerUser = async (req, res) => {
  const { name, email, password, role, examPreference } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: role || "student",
    examPreference,
  });
  res.json({ success: true, user });
};

// Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: "Invalid password" });

  res.json({ success: true, user });
};

// Profile
export const getProfile = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).select("-password");
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
};

// Admin: Get all users
export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};
