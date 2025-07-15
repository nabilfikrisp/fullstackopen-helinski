import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function connectToDatabase(): Promise<void> {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("❌ MONGODB_URI is not defined in environment variables.");
  }

  mongoose.set("strictQuery", false);

  try {
    await mongoose.connect(uri);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", (error as Error).message);
    process.exit(1);
  }
}
