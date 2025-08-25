describe("Blog CRUD", () => {
    beforeEach(() => {
        cy.visit("/home")
    })

    it("creating blog", () => {
        cy.getByTestId("home-input-content").type("test blog")
        cy.getByTestId("home-btn-create").click()
        cy.contains("test blog")
    })

    it("creating empty content blog", () => {
        cy.getByTestId("home-btn-create").click()
        cy.contains("Blog content is required")
    })

    it("updating blog content", () => {
        cy.getByTestId("home-btn-edit").click()
        cy.contains("Edit blog")
    })

    it("deleting blog", () => {
        cy.getByTestId("home-input-content").type("test blog")
        cy.getByTestId("home-btn-create").click()
        cy.contains("test blog")
        cy.getByTestIdPrefix("home-btn-delete-").first().click()
        cy.contains("test blog").should("not.exist")
    })
})