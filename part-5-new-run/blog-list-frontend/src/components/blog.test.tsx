import "@testing-library/jest-dom/vitest";
import { test, expect, vi } from "vitest";
import Blog, { LikeButton } from "./blog";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockBlog = {
  id: "1",
  title: "Test Blog",
  content: "This is a test blog content.",
  likes: 0,
  author: "Test Author",
  url: "http://example.com",
};

test("renders blogs", () => {
  const { container } = render(<Blog blog={mockBlog} onDelete={() => {}} />);

  const div = container.querySelector(".blog");

  expect(div!).toHaveTextContent("Test Blog");
});

test("by default, renders the blog's title and author but not its URL or number of likes", () => {
  render(<Blog blog={mockBlog} onDelete={() => {}} />);

  expect(screen.queryByText("Test Blog")).toBeDefined();
  expect(screen.queryByText("Test Author")).toBeDefined();

  // Check that URL and likes are not rendered by default
  expect(screen.queryByText("http://example.com")).toBeNull();
  expect(screen.queryByText(/Like:/i)).toBeNull();
});

test("when details are shown, renders the blog's URL and number of likes", async () => {
  render(<Blog blog={mockBlog} onDelete={() => {}} />);

  const user = userEvent.setup();
  const button = screen.getByText("Show Details");
  await user.click(button);

  expect(screen.queryByText("http://example.com")).toBeDefined();
  expect(screen.getByText("Like: 0")).toBeDefined();
});

test("if the like button is clicked twice, the event handler the component received as props is called twice", async () => {
  const onLike = vi.fn();
  render(<LikeButton onLike={onLike} loading={false} />);

  const user = userEvent.setup();

  const likeButton = screen.getByRole("button", { name: "Like" });
  await user.click(likeButton);
  await user.click(likeButton);

  expect(onLike).toHaveBeenCalledTimes(2);
});
