import axios from "axios";
import type { IBlog, IBlogCreate } from "../types/blog.type";
import { getTokenFromLocalStorage } from "./login";
const baseUrl = "/api/blogs";

export async function getBlogList() {
  const response = await axios.get<IBlog[]>(baseUrl);
  return response.data;
}

export async function createBlog(blog: IBlogCreate) {
  try {
    const token = getTokenFromLocalStorage();

    if (!token) {
      throw new Error("User is not authenticated");
    }

    const response = await axios.post<IBlog>(baseUrl, blog, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating blog:", error);
    throw error;
  }
}
