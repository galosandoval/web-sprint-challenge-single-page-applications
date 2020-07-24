describe('Adding and deleting a new quote', () => {
  it('can navigate to the site', () => {
    // repeat minus the check
    cy.visit('http://localhost:3000')
  })

  it('can submit a quote', () => {
    // filling out the form and submit it
    // assert that a quote with the given text and author are in the DOM
    cy.get('#links').click()
    cy.get('input[name="username"]').type('hey')
    // cy.get('input[name="text"]').type('Have Fun!')
    // cy.get('input[name="author"]').type('Gabe')
    // cy.get(".container").contains('Have Fun!')
  })

  it('can check multiple boxes', () => {
    // find the delete button of the quote, click it,
    // assert that the contents are not in there any more
    cy.get('input[name="sausage"]').check()
    cy.get('input[name="pepperoni"]').check()
    cy.get('input[name="veggies"]').check()
    cy.get('[name="size"]').select('small')
  })

  it('can submit the form', () => {
    cy.get('button').click()
  })
})