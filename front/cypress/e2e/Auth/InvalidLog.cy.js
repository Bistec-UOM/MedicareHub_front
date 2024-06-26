describe('Invalid log', () => {
    it('passes', () => {
      cy.visit('http://localhost:3000')

      cy.intercept('POST', 'https://localhost:7205/api/Auth/log').as('log');

      cy.get('button[id="logbutton"]').click();
      cy.get('#alert').should('have.text', 'Fill the empty fields');

      cy.get('input[id="1"]').type('10');   
      cy.get('button[id="logbutton"]').click();
      cy.get('#alert').should('have.text', 'Fill the empty fields');

      cy.get('input[id="1"]').type('1000');   
      cy.get('input[id="2"]').type('123');
      cy.get('button[id="logbutton"]').click();
      cy.wait('@log')
      cy.get('#alert').should('have.text', 'Invalid User Id');

      cy.get('input[id="1"]').clear();   
      cy.get('input[id="1"]').type('1');   
      cy.get('input[id="2"]').clear();   
      cy.get('input[id="2"]').type('123');
      cy.get('button[id="logbutton"]').click();
      cy.wait('@log')
      cy.get('#alert').should('have.text', 'Invalid Password');

    })
  })