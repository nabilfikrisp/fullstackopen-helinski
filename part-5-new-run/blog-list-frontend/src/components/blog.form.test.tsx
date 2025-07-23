import "@testing-library/jest-dom/vitest";
import { test, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./blog.form";
import type { IBlog } from "../types/blog.type";

// Mock the createBlog service
function mockCreateBlog(newData: IBlog): Promise<IBlog> {
  return Promise.resolve({
    ...newData,
    id: "123",
    likes: 0,
  });
}

vi.mock("../services/blog", () => ({
  createBlog: vi.fn().mockImplementation((data: IBlog) => mockCreateBlog(data)),
}));

test("The test should check, that the form calls the event handler it received as props with the right details when a new blog is created", async () => {
  const onCreate = vi.fn();
  render(<BlogForm setBlogs={onCreate} />);

  const user = userEvent.setup();
  const titleInput = screen.getByLabelText("Title");
  const authorInput = screen.getByLabelText("Author");
  const urlInput = screen.getByLabelText("URL");
  const submitButton = screen.getByRole("button", { name: "Submit" });

  await user.type(titleInput, "New Blog Title");
  await user.type(authorInput, "New Author");
  await user.type(urlInput, "http://newblog.com");
  await user.click(submitButton);

  // Wait for the async update
  await waitFor(() => {
    expect(onCreate).toHaveBeenCalled();
  });

  // Type assertion for clarity
  const callArg = onCreate.mock.calls[0][0] as (prevBlogs: IBlog[]) => IBlog[];
  const prevBlogs: IBlog[] = [];
  const result = callArg(prevBlogs);
  expect(result).toEqual([
    expect.objectContaining({
      title: "New Blog Title",
      author: "New Author",
      url: "http://newblog.com",
    }),
  ]);
});
