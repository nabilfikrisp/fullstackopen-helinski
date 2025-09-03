import jwt from "jsonwebtoken";
import { User } from "../entities/user/user.schema";
import { UserModel } from "../models";
import ENV from "./env";

export interface Context {
  currentUser: User | null;
}

export async function getCurrentUser(auth: string): Promise<User | null> {
  if (!auth || !auth.startsWith("Bearer ")) {
    return null;
  }

  try {
    const decodedToken = jwt.verify(auth.substring(7), ENV.JWT_SECRET) as {
      id: string;
    };
    const currentUser = await UserModel.findById(decodedToken.id).lean();
    return currentUser || null;
  } catch (err) {
    return null;
  }
}
