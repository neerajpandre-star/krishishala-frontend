import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const email = "admin@example.com";
    const password = "admin123";

    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
      console.log("✅ Admin already exists:", email);
      process.exit();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await User.create({
      name: "Admin",
      email,
      password: hashedPassword,
      role: "admin",
    });

    console.log("✅ Admin created successfully:");
    console.log("Email:", email);
    console.log("Password:", password);

    process.exit();
  } catch (err) {
    console.error("❌ Error seeding admin:", err);
    process.exit(1);
  }
};

seedAdmin();
