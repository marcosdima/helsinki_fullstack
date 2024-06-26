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
    
    describe('When logged in', function() {
      let title = 'A new blog begins'
      let author = 'M. D. Brambilla'
      let url = 'test.com'

      beforeEach(function() {
        cy.login({ username, password })
      })
  
      it('A blog can be created', function() {
        cy.contains('New Blog').click()
        cy.get('#title').type(title)
        cy.get('#author').type(author)
        cy.get('#url').type(url)
        cy.get('#createButton').click()

        cy.contains(`a new blog: ${title} by ${author}`)
        cy.get('#blogs').contains(title)
      })

      describe('And when it\'s created...', function() {
        beforeEach(function() {
          cy.createBlog({ title, author, url })
          // Shows the content...
          cy.contains(title)
            .contains('view')
            .click()
        })
        it('can be displayed...', function() {
          cy.contains(url)
          cy.contains(author)
          cy.contains('likes 0')
        })
        it('liked...', function() {
          // Like the blog...
          cy.contains('likes 0')
            .find('button')
            .should('contain', 'like')
            .click()

          cy.contains(title)
            .parent()
            .contains('likes 1')
        })
        it('and removed.', function() {
          // Delete the blog...
          cy.contains(title)
            .parent()
            .contains('remove')
            .click()
          cy.contains(`${title} deleted!`)
        })
        it('But only can be removed if it\'s owner ot the blog.', function () {
          cy.contains('logout').click()
          const anotherUser = 'another user'
          const anotherPassword = 'another password'
          cy.addUser({
            username: anotherUser,
            name:anotherUser,
            password: anotherPassword
          })
          cy.login({ username: anotherUser, password:anotherPassword})
          // Shows the content...
          cy.contains(title)
            .contains('view')
            .click()
          cy.contains('remove').should('not.visible')
        })
      })

      describe('When several blogs are created....', function() {
        beforeEach(function() {
          const blog_one = { title: 'The title with the most likes', author, url, likes: 10}
          const blog_two = { title: 'The second title with the most likes', author, url, likes: 1}
          const blog_three = { title: '0 likes', author, url}

          cy.createBlogs([blog_one, blog_two, blog_three])
            .then(() => cy.visit(''))
        })
        it.only('should show it in order of likes from', function() {            
          cy.get('.blog').eq(0).contains('The title with the most likes')
          cy.get('.blog').eq(1).contains('The second title with the most likes')
          cy.get('.blog').eq(2).contains('0 likes')
        })
      })
    })
  })
})