import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: {
    type: [String],
    required: true,
    validate: {
      validator: (v) => v.length === 4,
      message: "Each question must have exactly 4 options",
    },
  },
  correctIndex: { type: Number, required: true },
});

const testSchema = new mongoose.Schema({
  exam: { type: String, required: true, lowercase: true }, // normalize
  testName: { type: String, required: true },
  questions: [questionSchema],
}, { timestamps: true });

testSchema.index({ exam: 1, testName: 1 }, { unique: true });

export default mongoose.model("Test", testSchema);
