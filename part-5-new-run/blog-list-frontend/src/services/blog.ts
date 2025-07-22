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

export async function likeBlog(blog: IBlog) {
  try {
    const token = getTokenFromLocalStorage();

    if (!token) {
      throw new Error("User is not authenticated");
    }

    const response = await axios.put<IBlog>(
      `${baseUrl}/${blog.id}`,
      {
        ...blog,
        likes: blog.likes + 1,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error liking blog:", error);
    throw error;
  }
}

export async function deleteBlog(blog: IBlog) {
  try {
    const token = getTokenFromLocalStorage();

    if (!token) {
      throw new Error("User is not authenticated");
    }

    await axios.delete(`${baseUrl}/${blog.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    throw error;
  }
}
