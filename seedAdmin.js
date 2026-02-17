import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected for seeding");

    const email = "admin@example.com";
    const password = "admin123";

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
      console.log("⚠️ Admin already exists:", email);
      await mongoose.connection.close();
      process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin
    await User.create({
      name: "Admin",
      email,
      password: hashedPassword,
      role: "admin",
      examPreference: "upsc", // add if your schema requires it
    });

    console.log("✅ Admin created successfully");
    console.log("📧 Email:", email);
    console.log("🔑 Password:", password);

    await mongoose.connection.close();
    process.exit(0);

  } catch (err) {
    console.error("❌ Error seeding admin:", err.message);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedAdmin();
