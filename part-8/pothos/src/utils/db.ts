import mongoose from "mongoose";
import ENV from "./ENV";

export async function connectToDatabase(): Promise<void> {
  const uri = ENV.MONGODB_URI;

  mongoose.set("strictQuery", false);

  try {
    await mongoose.connect(uri);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", (error as Error).message);
    process.exit(1);
  }
}
