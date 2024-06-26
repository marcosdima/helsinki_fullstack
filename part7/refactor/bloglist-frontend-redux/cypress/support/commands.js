Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST',  `${Cypress.env('BACKEND')}/login`, {
      username, password
    }).then(({ body }) => {
      localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
      cy.visit('')
    })
})

Cypress.Commands.add('addUser', ({ username, password, name }) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/users`, {
    username, password, name
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
    cy.visit('')
  })
})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
    cy.request({
      url: `${Cypress.env('BACKEND')}/blogs`,
      method: 'POST',
      body: { title, author, url },
      headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
      }
    }).then(() => cy.visit(''))
})

Cypress.Commands.add('createBlogs', (blogs) => {
  for (let blog of blogs) {
    cy.request({
      url: `${Cypress.env('BACKEND')}/blogs`,
      method: 'POST',
      body: blog,
      headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
      }
    })
  }
})
