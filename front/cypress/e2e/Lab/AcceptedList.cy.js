describe('Accepted List', () => {
    it('passes', () => {
        cy.visit('http://localhost:3000')
  
        cy.intercept('GET', 'https://localhost:7205/api/Values/Accept').as('AcceptList');
        cy.intercept('POST', 'https://localhost:7205/api/Auth/log').as('log');
  
        cy.get('input[id="1"]').type('8');   
        cy.get('input[id="2"]').type('Nick123');
        cy.get('button[id="logbutton"]').should('be.visible').click();
        cy.wait('@log')
        
        cy.get('#viewaccept').should('be.visible').click();
  
        cy.wait('@AcceptList').its('response.statusCode').should('eq', 200);
    })
  })