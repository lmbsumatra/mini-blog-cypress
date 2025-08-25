describe("Blog CRUD", () => {
    beforeEach(() => {
        cy.visit("/home")
    })

    it("deleting blog", () => {
        cy.getByTestId("home-input-content").type("test blog")
        cy.getByTestId("home-btn-create").click()
        cy.contains("test blog")
        cy.getByTestIdPrefix("home-btn-delete-").first().click()
        cy.contains("test blog").should("not.exist")
    })
})