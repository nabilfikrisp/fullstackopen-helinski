import { IUserJWT } from "#models/user.js";
import { NextFunction, Response, Request } from "express";
import config from "./config.js";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  user?: IUserJWT;
}

export function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const auth = req.get("authorization");

  if (!auth) {
    return res.status(401).json({ error: "Missing authorization header" });
  }

  if (!auth.toLowerCase().startsWith("bearer ")) {
    return res.status(401).json({ error: "Missing or invalid token" });
  }

  try {
    const token = auth.slice(7);
    const decoded = jwt.verify(token, config.JWT_SECRET) as IUserJWT;
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Token verification failed" });
  }
}
