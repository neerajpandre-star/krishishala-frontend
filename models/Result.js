import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Test",
  },
  score: Number,
  total: Number,
});

export default mongoose.model("Result", resultSchema);
