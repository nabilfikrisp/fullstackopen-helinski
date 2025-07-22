import axios from "axios";
import type { ILoginResponse } from "../types/user.type";

export async function login(username: string, password: string) {
  const response = await axios.post<ILoginResponse>("/api/login", {
    username,
    password,
  });
  return response.data;
}

export function IntializeUser(): ILoginResponse | null {
  const userData = window.localStorage.getItem("loggedUser");
  if (!userData) {
    return null;
  }
  return JSON.parse(userData);
}

export function getTokenFromLocalStorage(): string | null {
  const user = IntializeUser();
  return user ? user.token : null;
}
