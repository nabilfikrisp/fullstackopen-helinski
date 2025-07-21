import { IUserForLogin, IUserJWT, User } from "#models/user.js";
import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "#utils/config.js";

const loginRouter = Router();

loginRouter.post("/", async (req, res, next) => {
  try {
    const { username, password } = req.body as IUserForLogin;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const passwordCorrect = await bcrypt.compare(password, user.passwordHash);
    if (!passwordCorrect) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    } as IUserJWT;

    const token: string = jwt.sign(userForToken, config.JWT_SECRET, {
      expiresIn: 60 * 60,
    });

    return res.status(200).json({ token, username: user.username, name: user.name });
  } catch (error) {
    next(error);
  }
});

export default loginRouter;
