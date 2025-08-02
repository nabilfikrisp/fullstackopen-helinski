import { test, expect } from "@playwright/test";

const TEST_USER = {
  name: "Testing",
  username: "TestingUser",
  password: "12345678",
};

const ANOTHER_USER = {
  name: "Another User",
  username: "AnotherUser",
  password: "87654321",
};

const API_BASE_URL = "http://localhost:3000/api";
const APP_URL = "http://localhost:5173";

test.describe("Blog Application", () => {
  test.beforeEach(async ({ page, request }) => {
    // Reset database and create test user
    await request.post(`${API_BASE_URL}/testing/reset`);
    await request.post(`${API_BASE_URL}/users`, {
      data: TEST_USER,
    });

    await page.goto(APP_URL);
  });

  test("displays login form on initial load", async ({ page }) => {
    const usernameField = page.getByText("Username");
    const passwordField = page.getByText("Password");

    await expect(usernameField).toBeVisible();
    await expect(passwordField).toBeVisible();
  });

  test.describe("User Authentication", () => {
    test("allows login with valid credentials", async ({ page }) => {
      await page.getByLabel("Username").fill(TEST_USER.username);
      await page.getByLabel("Password").fill(TEST_USER.password);
      await page.getByRole("button", { name: "Login" }).click();

      const welcomeHeader = page
        .locator("h1")
        .filter({ hasText: TEST_USER.name });
      await expect(welcomeHeader).toBeVisible();
    });

    test("prevents login with invalid credentials", async ({ page }) => {
      await page.getByLabel("Username").fill("invalidUser");
      await page.getByLabel("Password").fill("wrongPassword");
      await page.getByRole("button", { name: "Login" }).click();

      const errorMessage = page.getByText(
        "Login failed. Please check your credentials."
      );
      await expect(errorMessage).toBeVisible();
    });
  });

  test.describe("Blog Management (Authenticated User)", () => {
    test.beforeEach(async ({ page }) => {
      // Login before each test in this group
      await page.getByLabel("Username").fill(TEST_USER.username);
      await page.getByLabel("Password").fill(TEST_USER.password);
      await page.getByRole("button", { name: "Login" }).click();
    });

    test("allows creating a new blog post", async ({ page }) => {
      await page.getByRole("button", { name: "Create Blog" }).click();

      await page.getByLabel("Title").fill("My Test Blog Post");
      await page.getByLabel("Author").fill("John Doe");
      await page.getByLabel("URL").fill("https://example.com/my-test-blog");

      await page.getByRole("button", { name: "Submit" }).click();

      // back to main page
      await page.getByRole("button", { name: "Cancel" }).click();

      const createdBlogTitle = page.getByText("My Test Blog Post - John Doe");
      await expect(createdBlogTitle).toBeVisible();
    });

    test("allows liking a blog post", async ({ page }) => {
      // Create a blog post first
      await page.getByRole("button", { name: "Create Blog" }).click();

      await page.getByLabel("Title").fill("Blog Post to Like");
      await page.getByLabel("Author").fill("Jane Smith");
      await page.getByLabel("URL").fill("https://example.com/likeable-blog");

      await page.getByRole("button", { name: "Submit" }).click();

      // back to main page
      await page.getByRole("button", { name: "Cancel" }).click();

      // Open blog details and like the post
      await page.getByRole("button", { name: "Show Details" }).first().click();

      const currentLikesText = await page
        .locator("text=Like:")
        .first()
        .textContent();
      const currentLikesCount =
        Number(currentLikesText?.match(/\d+/)?.[0]) || 0;

      await page.getByRole("button", { name: "Like" }).click();

      const updatedLikesDisplay = page.getByText(
        `Like: ${currentLikesCount + 1}`
      );
      await expect(updatedLikesDisplay).toBeVisible();
    });

    test("user can delete their own blog post", async ({ page }) => {
      // Create a new blog post
      await page.getByRole("button", { name: "Create Blog" }).click();

      await page.getByLabel("Title").fill("Blog Post to Delete");
      await page.getByLabel("Author").fill("John Doe");
      await page.getByLabel("URL").fill("https://example.com/likeable-blog");

      await page.getByRole("button", { name: "Submit" }).click();

      // Return to the blog list
      await page.getByRole("button", { name: "Cancel" }).click();

      // Find the newly created post by title and author
      const blogPost = page.locator("article", {
        hasText: "Blog Post to Delete - John Doe",
      });

      // Expand blog post details
      await blogPost.getByRole("button", { name: "show details" }).click();

      // Accept browser confirmation dialog on deletion
      page.once("dialog", async (dialog) => {
        await dialog.accept();
      });

      // Click the delete button
      await blogPost.getByRole("button", { name: "delete" }).click();

      // Confirm that the blog post is removed from the page
      await expect(blogPost).toHaveCount(0);
    });

    test("the delete button is visible only to the user who created the blog post.", async ({
      page,
      request,
    }) => {
      // Create a new blog post
      await page.getByRole("button", { name: "Create Blog" }).click();

      await page.getByLabel("Title").fill("Post belong to other");
      await page.getByLabel("Author").fill("John Doe");
      await page.getByLabel("URL").fill("https://example.com/likeable-blog");

      await page.getByRole("button", { name: "Submit" }).click();

      // Return to the blog list
      await page.getByRole("button", { name: "Cancel" }).click();

      // Logout to simulate another user
      await page.getByRole("button", { name: "Logout" }).click();

      // Create another user
      await request.post(`${API_BASE_URL}/users`, {
        data: ANOTHER_USER,
      });

      // Login as another user
      await page.getByLabel("Username").fill(ANOTHER_USER.username);
      await page.getByLabel("Password").fill(ANOTHER_USER.password);
      await page.getByRole("button", { name: "Login" }).click();

      const blogPost = page.locator("article", {
        hasText: "Post belong to other - John Doe",
      });

      // Expand blog post details
      await blogPost.getByRole("button", { name: "show details" }).click();

      const deleteButton = blogPost.getByRole("button", {
        name: "delete",
      });

      // Ensure delete button is not visible
      await expect(deleteButton).toHaveCount(0);
    });

    test("blogs should appear sorted by descending like count", async ({
      page,
    }) => {
      // Create the first blog post
      await page.getByRole("button", { name: "Create Blog" }).click();
      await page.getByLabel("Title").fill("First Blog Post");
      await page.getByLabel("Author").fill("John Doe");
      await page.getByLabel("URL").fill("https://example.com/likeable-blog");
      await page.getByRole("button", { name: "Submit" }).click();
      await page.getByRole("button", { name: "Cancel" }).click();

      // Create the second blog post
      await page.getByRole("button", { name: "Create Blog" }).click();
      await page.getByLabel("Title").fill("Second Blog Post");
      await page.getByLabel("Author").fill("Jane Doe");
      await page.getByLabel("URL").fill("https://example.com/likeable-blog");
      await page.getByRole("button", { name: "Submit" }).click();
      await page.getByRole("button", { name: "Cancel" }).click();

      // ⬇️ Verify that the first post appears before the second (default order)
      const articles = page.locator("article");
      await expect(articles.nth(0)).toContainText("First Blog Post");
      await expect(articles.nth(1)).toContainText("Second Blog Post");

      // Like the second blog twice
      const secondBlog = page.locator("article", {
        hasText: "Second Blog Post - Jane Doe",
      });
      await secondBlog.getByRole("button", { name: "show details" }).click();
      await secondBlog.getByRole("button", { name: "Like" }).click();
      await secondBlog.getByRole("button", { name: "Like" }).click();

      // Reload the page to re-trigger sorting
      await page.reload();

      // ⬇️ Check that the second blog now appears before the first
      const sortedArticles = page.locator("article");
      await expect(sortedArticles.nth(0)).toContainText("Second Blog Post");
      await expect(sortedArticles.nth(1)).toContainText("First Blog Post");
    });
  });
});

test.afterAll(async ({ request }) => {
  // Clean up after all tests
  await request.post(`${API_BASE_URL}/testing/reset`);
});
