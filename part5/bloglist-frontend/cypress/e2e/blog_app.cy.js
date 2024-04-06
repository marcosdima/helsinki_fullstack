describe('Blog app', function() {
  let username
  let name
  let password

  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)

    name = "Test"
    username = 'test'
    password = '1234'
    const user = { name, username, password }

    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
  })

  describe('Log In', function () {
    it('with the right credentials...', function() {
      cy.get('#username').type(username)
      cy.get('#password').type(password)
      cy.get('#loginButton').click()
      cy.contains('Test logged in')
    }) 
    it('with the wrong credentials...', function() {
      cy.get('#username').type('not an user')
      cy.get('#password').type('not a password')
      cy.get('#loginButton').click()
      cy.contains('logged in').should('not.exist')
    }) 
  })
  

})