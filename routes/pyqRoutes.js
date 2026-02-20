import express from "express";
import PYQ from "../models/PYQ.js";
import upload from "../middleware/uploads.js";

const router = express.Router();

/* ===============================
   ADMIN: Upload PYQ PDF
================================= */
router.post("/", upload.single("pdf"), async (req, res) => {
  try {
    const { exam, title, examDate } = req.body;

    if (!exam || !title || !examDate) {
      return res.status(400).json({ message: "All fields required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "PDF file is required" });
    }

    const newPYQ = new PYQ({
      exam: exam.toLowerCase().trim(),
      title: title.trim(),
      examDate: new Date(examDate),
      pdfUrl: `/uploads/${req.file.filename}`,
    });

    await newPYQ.save();

    res.status(201).json({
      message: "PYQ uploaded successfully",
      pyq: newPYQ,
    });

  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: "Server error during upload" });
  }
});

/* ===============================
   STUDENT: Get All PYQs
   Optional Query: ?exam=jee&year=2023
================================= */
router.get("/", async (req, res) => {
  try {
    const { exam, year } = req.query;
    let filter = {};

    if (exam) filter.exam = exam.toLowerCase();
    if (year) filter.year = Number(year);

    const pyqs = await PYQ.find(filter).sort({ examDate: -1 });

    res.json(pyqs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch PYQs" });
  }
});

/* Increment Download Count */
router.patch("/:id/download", async (req, res) => {
  try {
    const pyq = await PYQ.findByIdAndUpdate(
      req.params.id,
      { $inc: { downloads: 1 } },
      { new: true }
    );

    res.json(pyq);
  } catch (err) {
    res.status(500).json({ message: "Failed to update downloads" });
  }
});

/* ===============================
   ADMIN: Delete PYQ
================================= */
router.delete("/:id", async (req, res) => {
  try {
    const pyq = await PYQ.findById(req.params.id);

    if (!pyq) {
      return res.status(404).json({ message: "PYQ not found" });
    }

    await pyq.deleteOne();

    res.json({ message: "PYQ deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
});

export default router;