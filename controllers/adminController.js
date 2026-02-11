import Test from "../models/Test.js";

// Create Test
export const createTest = async (req, res) => {
  const { title, duration } = req.body;
  try {
    const test = await Test.create({ title, duration, questions: [] });
    res.status(201).json(test);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add Question
export const addQuestion = async (req, res) => {
  const { testId, question, options, correctAnswer, subject } = req.body;
  try {
    const test = await Test.findById(testId);
    if (!test) return res.status(404).json({ message: "Test not found" });

    test.questions.push({ question, options, correctAnswer, subject });
    await test.save();

    res.status(201).json(test);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all tests (for analytics)
export const getTests = async (req, res) => {
  try {
    const tests = await Test.find();
    res.json(tests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
