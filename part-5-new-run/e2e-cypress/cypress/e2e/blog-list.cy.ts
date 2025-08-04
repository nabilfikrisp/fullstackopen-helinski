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

describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", `${API_BASE_URL}/testing/reset`);
    cy.request("POST", `${API_BASE_URL}/users`, TEST_USER);

    cy.visit(APP_URL);
  });

  it("Login form is shown", function () {
    cy.contains("Username").should("be.visible");
    cy.contains("Password").should("be.visible");
  });

  describe("User Authentication", function () {
    it("allows login with valid credentials", function () {
      cy.get("input[name='username']").type(TEST_USER.username);
      cy.get("input[name='password']").type(TEST_USER.password);
      cy.contains("button", "Login").click();

      cy.contains("h1", TEST_USER.name).should("be.visible");
    });

    it("prevents login with invalid credentials", function () {
      cy.get("input[name='username']").type("invalidUser");
      cy.get("input[name='password']").type("wrongPassword");
      cy.contains("button", "Login").click();

      cy.contains("Login failed. Please check your credentials.").should(
        "be.visible"
      );
    });
  });

  describe("Blog Management (Authenticated User)", function () {
    beforeEach(function () {
      // Assuming the user is already logged in
      cy.get("input[name='username']").type(TEST_USER.username);
      cy.get("input[name='password']").type(TEST_USER.password);
      cy.contains("button", "Login").click();
    });

    it("allows creating a new blog", function () {
      cy.contains("button", "Create Blog", { timeout: 1000 })
        .should("be.visible")
        .click();
      cy.get("input[name='title']").type("Test Blog");
      cy.get("input[name='author']").type("Test Author");
      cy.get("input[name='url']").type("http://example.com");
      cy.contains("button", "Submit").click();

      // back to the main page
      cy.contains("button", "Cancel").click();

      cy.contains("Test Blog").should("be.visible");
    });

    it("allows liking a blog post", function () {
      // Create a blog post first
      cy.contains("button", "Create Blog").click();
      cy.get("input[name='title']").type("Blog Post to Like");
      cy.get("input[name='author']").type("Jane Smith");
      cy.get("input[name='url']").type("https://example.com/likeable-blog");
      cy.contains("button", "Submit").click();
      cy.contains("button", "Cancel").click();

      // Open blog details and like the post
      cy.contains("button", "Show Details").first().click();

      cy.contains("Like:")
        .invoke("text")
        .then((text) => {
          const currentLikesCount = Number(text.match(/\d+/)?.[0]) || 0;

          cy.contains("button", "Like").click();

          cy.contains(`Like: ${currentLikesCount + 1}`).should("be.visible");
        });
    });

    it("user can delete their own blog post", function () {
      // Create a new blog post
      cy.contains("button", "Create Blog").click();
      cy.get("input[name='title']").type("Blog Post to Delete");
      cy.get("input[name='author']").type("John Doe");
      cy.get("input[name='url']").type("https://example.com/deleteable-blog");
      cy.contains("button", "Submit").click();
      cy.contains("button", "Cancel").click();

      // Find the newly created post and expand details
      cy.contains("Blog Post to Delete - John Doe")
        .parent()
        .within(() => {
          cy.contains("button", "Show Details").click();
          cy.contains("button", "delete").click();
        });

      // Confirm that the blog post is removed
      cy.contains("Blog Post to Delete - John Doe").should("not.exist");
    });

    it("the delete button is visible only to the user who created the blog post", function () {
      // Create a new blog post
      cy.contains("button", "Create Blog").click();
      cy.get("input[name='title']").type("Post belong to other");
      cy.get("input[name='author']").type("John Doe");
      cy.get("input[name='url']").type("https://example.com/other-blog");
      cy.contains("button", "Submit").click();
      cy.contains("button", "Cancel").click();

      // Logout
      cy.contains("button", "Logout").click();

      // Create another user
      cy.request("POST", `${API_BASE_URL}/users`, ANOTHER_USER);

      // Login as another user
      cy.get("input[name='username']").type(ANOTHER_USER.username);
      cy.get("input[name='password']").type(ANOTHER_USER.password);
      cy.contains("button", "Login").click();

      // Check that delete button is not visible for other user's post
      cy.contains("Post belong to other - John Doe")
        .parent()
        .within(() => {
          cy.contains("button", "Show Details").click();
          cy.contains("button", "delete").should("not.exist");
        });
    });

    it("blogs should appear sorted by descending like count", function () {
      // Create the first blog post
      cy.contains("button", "Create Blog").click();
      cy.get("input[name='title']").type("First Blog Post");
      cy.get("input[name='author']").type("John Doe");
      cy.get("input[name='url']").type("https://example.com/first-blog");
      cy.contains("button", "Submit").click();
      cy.contains("button", "Cancel").click();

      // Create the second blog post
      cy.contains("button", "Create Blog").click();
      cy.get("input[name='title']").type("Second Blog Post");
      cy.get("input[name='author']").type("Jane Doe");
      cy.get("input[name='url']").type("https://example.com/second-blog");
      cy.contains("button", "Submit").click();
      cy.contains("button", "Cancel").click();

      // Verify initial order
      cy.get("article").first().should("contain", "First Blog Post");
      cy.get("article").eq(1).should("contain", "Second Blog Post");

      // Like the second blog twice
      cy.contains("Second Blog Post - Jane Doe")
        .parent()
        .within(() => {
          cy.contains("button", "Show Details").click();
          cy.contains("button", "Like").click();
          cy.contains("button", "Like").click();
        });

      // Reload the page to re-trigger sorting
      cy.reload();

      // Check that the second blog now appears before the first
      cy.get("article").first().should("contain", "Second Blog Post");
      cy.get("article").eq(1).should("contain", "First Blog Post");
    });
  });

  after(function () {
    // Clean up after all tests
    cy.request("POST", `${API_BASE_URL}/testing/reset`);
  });
});
