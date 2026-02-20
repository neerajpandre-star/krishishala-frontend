import mongoose from "mongoose";

const pyqSchema = new mongoose.Schema(
  {
    exam: { 
      type: String, 
      required: true,
      lowercase: true,
      trim: true
    },

    title: { 
      type: String, 
      required: true,
      trim: true
    },

    pdfUrl: { 
      type: String, 
      required: true 
    },

    examDate: { 
      type: Date, 
      required: true 
    },

    // Auto-generated year from examDate
    year: {
      type: Number,
    },

    downloads: {
      type: Number,
      default: 0,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// 🔥 Auto-set year before saving
pyqSchema.pre("save", function (next) {
  if (this.examDate) {
    this.year = new Date(this.examDate).getFullYear();
  }
  next();
});

const PYQ = mongoose.model("PYQ", pyqSchema);

export default PYQ;