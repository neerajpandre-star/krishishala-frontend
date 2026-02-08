import express from "express";
import Test from "../models/Test.js";

const router = express.Router();

// ✅ GET all distinct exams
router.get("/exams/list", async (req, res) => {
  try {
    const exams = await Test.distinct("exam");
    res.json(exams); // ["pat", "jee", "neet"]
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch exams" });
  }
});

// ✅ POST: Create a new test (Admin)
router.post("/", async (req, res) => {
  try {
    const test = new Test({
      ...req.body,
      exam: req.body.exam.toLowerCase(), // normalize
    });
    await test.save();
    res.status(201).json(test);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || "Server error" });
  }
});

// ✅ GET: Fetch all tests (Student)
router.get("/", async (req, res) => {
  try {
    const tests = await Test.find().select("exam testName");
    res.json(tests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch tests" });
  }
});

// ✅ GET: Fetch single test
router.get("/:exam/:testName", async (req, res) => {
  try {
    const { exam, testName } = req.params;

    const test = await Test.findOne({
      exam: exam.toLowerCase(),
      testName: decodeURIComponent(testName),
    });

    if (!test) return res.status(404).json({ message: "Test not found" });

    res.json(test);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
