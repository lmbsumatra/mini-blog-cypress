/// <reference types="cypress" />

describe('template spec', () => {
  it('passes', () => {
    cy.visit('/')
    cy.contains("Short Stories")

  })
  it('passes',()=> {
    cy.get('button') 
  })
})