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

})