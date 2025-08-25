describe("Login Page Navigation", () => {
    beforeEach(() => {
        cy.visit("/login")
    })

    it("should navigate to landing page ('/') when logo is clicked", () => {
        cy.getByTestId("logo-btn").click()
        cy.visit("/")
        cy.contains("Anon Stories")
    })

    it("should display the login page header", () => {
        cy.get("h1").should("contain", "Log in")
    })

    it("should log in a user and navigate to /home", () => {
        cy.getByTestId("login-input-username").type("username@123")
        cy.getByTestId("login-input-password").type("password@123")
        cy.getByTestId("login-button").click()
        cy.url().should("include", "/home")
    })

    it("should show validation errors when fields are empty", () => {
        cy.getByTestId("login-button").click()
        cy.contains("Username is required")
        cy.contains("Password is required")
    })

    it("should show password validation error when password field is empty", () => {
        cy.getByTestId("login-input-username").type("username@123")
        cy.getByTestId("login-button").click()
        cy.contains("Password is required")
    })

    it("should show username validation error when username field is empty", () => {
        cy.getByTestId("login-input-password").type("password@123")
        cy.getByTestId("login-button").click()
        cy.contains("Username is required")
    })

    it("navigates to /forgot-password page when 'Forgot password' link", () => {
        cy.getByTestId("login-forgot-password-link").click()
        cy.visit("/forgot-password")
        cy.contains("Forgot Password")
    })

    it("navigates to /signup page when 'Sign up' link", () => {
        cy.getByTestId("login-signup-link").click()
        cy.visit("/signup")
        cy.contains("Sign up")
    })
})
