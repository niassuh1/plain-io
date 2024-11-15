describe("Login Page", () => {
  it("Login UI is correct", () => {
    cy.visit("http://localhost:3000/login");

    cy.get("h1.text-3xl.font-semibold").should("contain.text", "Login");
    cy.get("p.text-muted-foreground").should(
      "contain.text",
      "Log in and start using app"
    );

    cy.get("input[type='email']");
    cy.get("input[type='password']");
    cy.get("button[type='submit']");
    cy.get("button[type='button']").should(
      "contain.text",
      "Forgot your password?"
    );
  });
});

describe("Security", () => {
  it("Must redirect to login page", () => {
    cy.visit("http://localhost:3000/");

    cy.url().should("contain", "/login");
  });
});

describe("Form validation", () => {
  it("Must display errors when inputs are empty", () => {
    cy.visit("http://localhost:3000/login");
    cy.get("button[type='submit']").click();
    cy.document().contains("Invalid email format");
    cy.document().contains("Must be 6 characters minimum");
  });
  it("Password must be 6 characters at minimum", () => {
    cy.visit("http://localhost:3000/login");
    cy.get("input[type='email']").type("example@example.com");
    cy.get("input[type='password']").type("one");
    cy.get("button[type='submit']").click();

    cy.document().contains("Must be 6 characters minimum");
  });
});

describe("Authentication", () => {
  it("Must login successfully", () => {
    const TEST_EMAIL = Cypress.env("TEST_EMAIL");
    const TEST_PASSWORD = Cypress.env("TEST_PASSWORD");

    cy.visit("http://localhost:3000/login");

    cy.get("input[type='email']").type(TEST_EMAIL);
    cy.get("input[type='password']").type(TEST_PASSWORD);

    cy.get("button[type='submit']").click();

    cy.url().should("eq", "http://localhost:3000/");
  });
});
