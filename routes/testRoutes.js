import express from "express";
import Test from "../models/Test.js";

const router = express.Router();

/* ✅ GET: All distinct exams */
router.get("/exams/list", async (req, res) => {
  try {
    const exams = await Test.distinct("exam");
    res.json(exams);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch exams" });
  }
});

/* ✅ GET: All tests */
router.get("/", async (req, res) => {
  try {
    const tests = await Test.find().select("exam testName");
    res.json(tests);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch tests" });
  }
});

/* ✅ GET: Tests by exam */
router.get("/exam/:exam", async (req, res) => {
  try {
    const tests = await Test.find({
      exam: req.params.exam.toLowerCase(),
    }).select("exam testName");

    res.json(tests);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch tests" });
  }
});

/* ✅ GET: Single test by ID */
router.get("/:id", async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);

    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }

    res.json(test);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ✅ POST: Create new test */
router.post("/", async (req, res) => {
  try {
    if (!req.body.exam || !req.body.testName) {
      return res.status(400).json({ message: "Exam and testName required" });
    }

    const test = new Test({
      ...req.body,
      exam: req.body.exam.toLowerCase(),
    });

    await test.save();
    res.status(201).json(test);
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
});

/* ✅ POST: Submit test */
router.post("/:id/submit", async (req, res) => {
  try {
    const { answers, score, timeSpent } = req.body;

    // You can later save this in Result model
    res.json({
      message: "Submission saved",
      score,
      answers,
      timeSpent,
    });
  } catch (err) {
    res.status(500).json({ message: "Submission failed" });
  }
});

export default router;