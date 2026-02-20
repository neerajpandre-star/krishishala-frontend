import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },

  options: {
    type: [String],
    required: true,
    validate: [(val) => val.length >= 2, "At least 2 options required"],
  },

  correctIndex: { type: Number, required: true },

  marks: { type: Number, default: 1 },
  negativeMarks: { type: Number, default: 0 },

}, { _id: false });

const mockTestSchema = new mongoose.Schema({
  exam: { type: String, required: true },

  testName: { type: String, required: true },

  description: { type: String },

  duration: { type: Number, required: true }, // in minutes

  questions: [questionSchema],

  totalMarks: { type: Number },

  isPublished: { type: Boolean, default: false },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

}, { timestamps: true });


// Auto-calculate total marks before saving
mockTestSchema.pre("save", function (next) {
  this.totalMarks = this.questions.reduce(
    (sum, q) => sum + (q.marks || 1),
    0
  );
  next();
});

const MockTest = mongoose.model("MockTest", mockTestSchema);

export default MockTest;