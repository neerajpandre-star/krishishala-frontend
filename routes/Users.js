import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Auth middleware (simple version)
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// GET /api/users/me
router.get("/me", authMiddleware, (req, res) => {
  res.json(req.user);
});

export default router;
