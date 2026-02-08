import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true },
  correctIndex: { type: Number, required: true },
});

const mockTestSchema = new mongoose.Schema({
  exam: { type: String, required: true },
  testName: { type: String, required: true },
  questions: [questionSchema],
  createdAt: { type: Date, default: Date.now },
});

const MockTest = mongoose.model("MockTest", mockTestSchema);

export default MockTest;
