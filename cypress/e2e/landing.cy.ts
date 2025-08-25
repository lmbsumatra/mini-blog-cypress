/// <reference types="cypress" />

describe('Landing Page Navigation', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  
  it('displays the Short Stories heading and subheading', () => {
    cy.contains('Anon Stories')
    cy.contains('Create. Share. Read.')
  })

  it('navigates to the login page when clicking "Get Started"', () => {
    cy.get('[data-test-id="landing-btn-1"]')
      .should('be.visible')
      .click()

    cy.url().should('include', '/login')
    cy.contains('Log in')
  })

  it('navigates to the preview page when clicking "Explore"', () => {
    cy.get('[data-test-id="landing-btn-2"]')
      .should('be.visible')
      .click()

    cy.url().should('include', '/preview')
    cy.contains('Preview')
  })
})
