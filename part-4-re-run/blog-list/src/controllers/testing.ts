import { Blog } from "#models/blog.js";
import { User } from "#models/user.js";
import { Router } from "express";
import bcrypt from "bcryptjs";

export const testingRouter = Router();

testingRouter.post("/reset", async (req, res) => {
  await User.deleteMany({});
  await Blog.deleteMany({});

  const hashedPassword = await bcrypt.hash("12345678", 10);
  await User.insertOne({
    name: "nabil fikri",
    username: "nabil",
    passwordHash: hashedPassword,
  });

  return res.status(204).end();
});
