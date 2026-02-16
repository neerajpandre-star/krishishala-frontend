import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import userRoutes from "./routes/Users.js";

dotenv.config();

const app = express();

/* ---------- MIDDLEWARE ---------- */

// ✅ Dynamic CORS for Vercel (production + preview) + localhost
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      // Allow all Vercel deployments
      if (
        origin.endsWith(".vercel.app") ||
        origin.includes("localhost")
      ) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

/* ---------- ROUTES ---------- */

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/tests", testRoutes);
app.use("/api/users", userRoutes);

/* ---------- HEALTH CHECK ---------- */

app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

/* ---------- DATABASE CONNECTION ---------- */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB error:", err.message);
  });

/* ---------- SERVER START ---------- */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
