import express from "express";
import Test from "../models/Test.js";

const router = express.Router();

/* ✅ GET: Fetch all distinct exams */
router.get("/exams/list", async (req, res) => {
  try {
    const exams = await Test.distinct("exam");
    res.json(exams);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch exams" });
  }
});

/* ✅ POST: Create a new test */
router.post("/", async (req, res) => {
  try {
    if (!req.body.exam || !req.body.testName) {
      return res.status(400).json({ message: "Exam and testName are required" });
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

/* ✅ GET: Fetch all tests */
router.get("/", async (req, res) => {
  try {
    const tests = await Test.find().select("exam testName");
    res.json(tests);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch tests" });
  }
});

/* ✅ Alias route */
router.get("/available", async (req, res) => {
  try {
    const tests = await Test.find().select("exam testName");
    res.json(tests);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch tests" });
  }
});

/* 🚨 ALWAYS KEEP DYNAMIC ROUTES LAST */
router.get("/:exam/:testName", async (req, res) => {
  try {
    const { exam, testName } = req.params;

    const test = await Test.findOne({
      exam: exam.toLowerCase(),
      testName: decodeURIComponent(testName),
    });

    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }

    res.json(test);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;