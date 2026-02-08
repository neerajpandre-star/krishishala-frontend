import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

// Protect any route
export const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token, unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Allow only admins
export const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "admin")
    return res.status(403).json({ message: "Forbidden, admin only" });
  next();
};
