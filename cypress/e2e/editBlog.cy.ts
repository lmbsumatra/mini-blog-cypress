describe("Blog CRUD", () => {
    beforeEach(() => {
        cy.visit("/home")
    })

    it("updating blog content", () => {
        cy.getByTestId("home-input-content").type("test blog")
        cy.getByTestId("home-btn-create").click()
        cy.contains("test blog")

        cy.getByTestId("home-btn-edit").click()
        cy.contains("Edit blog")

        cy.getByTestId("home-input-edit-content").type("update this blog")
        cy.getByTestId("home-btn-edit-content").click()
        cy.contains("update this blog")
    })

    it("updating blog content with empty input", () => {
        cy.getByTestId("home-input-content").type("test blog")
        cy.getByTestId("home-btn-create").click()
        cy.contains("test blog")

        cy.getByTestId("home-btn-edit").click()
        cy.contains("Edit blog")

        cy.getByTestId("home-input-edit-content").clear()
        cy.getByTestId("home-btn-edit-content").click()
        cy.contains("Blog content is required")
    })

    it("cancel updating blog content", () => {
        cy.getByTestId("home-input-content").type("test blog")
        cy.getByTestId("home-btn-create").click()
        cy.contains("test blog")

        cy.getByTestId("home-btn-edit").click()
        cy.contains("Edit blog")

        cy.getByTestId("home-input-edit-content").type("update this blog")
        cy.getByTestId("home-btn-cancel-edit").click()
        cy.contains("test blog")
    })

})