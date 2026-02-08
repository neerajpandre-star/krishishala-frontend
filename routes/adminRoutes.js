import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import Test from "../models/Test.js";

const router = express.Router();

// Create a new test (Admin only)
router.post("/tests", protect, adminOnly, async (req, res) => {
  try {
    const { title, subject, duration, totalMarks } = req.body;

    if (!title || !subject || !duration || !totalMarks) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const test = await Test.create({
      title,
      subject,
      duration,
      totalMarks,
      createdBy: req.user._id,
    });

    res.status(201).json({ message: "Test created successfully", test });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all tests (Admin view)
router.get("/tests", protect, adminOnly, async (req, res) => {
  try {
    const tests = await Test.find().populate("createdBy", "name email");
    res.json(tests);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
