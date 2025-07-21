import { User } from "#models/user.js";
import bcrypt from "bcryptjs";
import { ILoginResponse } from "#models/login.js";
import TestAgent from "supertest/lib/agent.js";

export async function usersInDb() {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
}

// Helper functions for tests

export const initialUser = {
  username: "initial",
  name: "Initial User",
  password: "sekret",
};

export async function createInitialUser() {
  const passwordHash = await bcrypt.hash(initialUser.password, 10);
  await User.insertOne({ ...initialUser, passwordHash });
}

export async function login(
  api: TestAgent,
  username = initialUser.username,
  password = initialUser.password
) {
  const res = await api.post("/api/login").send({ username, password });
  return (res.body as ILoginResponse).token;
}
