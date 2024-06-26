describe('Invalid log', () => {
    it('passes', () => {
      cy.visit('http://localhost:3000')
  
      cy.intercept('POST', 'http://localhost:3000/api//Auth/log').as('loginRequest');

      cy.get('button[id="logbutton"]').click();
      cy.get('#alert').should('have.text', 'Fill the empty fields');

      cy.get('input[id="1"]').type('10');   
      cy.get('button[id="logbutton"]').click();
      cy.get('#alert').should('have.text', 'Fill the empty fields');

      cy.get('input[id="1"]').type('1000');   
      cy.get('input[id="2"]').type('123');
      cy.get('button[id="logbutton"]').click();
      cy.wait('@loginRequest')
      cy.get('#alert').should('have.text', 'Invalid User Id');

      cy.get('input[id="1"]').clear();   
      cy.get('input[id="1"]').type('1');   
      cy.get('input[id="2"]').clear();   
      cy.get('input[id="2"]').type('Andrew123');
      cy.get('button[id="logbutton"]').click();
      cy.wait('@loginRequest')
      cy.get('#alert').should('have.text', 'Invalid Password');

    })
  })