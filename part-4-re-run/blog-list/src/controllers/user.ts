import { IUserForCreation, User } from "#models/user.js";
import { Router } from "express";
import bcrypt from "bcryptjs";

export const usersRouter = Router();

usersRouter.post("/", async (request, response, next) => {
  const { username, name, password } = request.body as IUserForCreation;

  const saltRounds = 10;
  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return response.status(400).json({ error: "User already exists" });
    }

    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await user.save();

    response.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/", async (_request, response, next) => {
  try {
    const users = await User.find({}).populate("blogs", {
      likes: 1,
      title: 1,
      url: 1,
    });
    response.json(users);
  } catch (error) {
    next(error);
  }
});
