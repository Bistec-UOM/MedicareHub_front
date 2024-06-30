describe('Get test Details', () => {
    it('passes', () => {
        cy.visit('http://localhost:3000')
  
        cy.intercept('GET', 'https://localhost:7205/api/Test').as('TestList');
        cy.intercept('POST', 'https://localhost:7205/api/Auth/log').as('log');
  
        cy.get('input[id="1"]').type('8');   
        cy.get('input[id="2"]').type('Nick123');
        cy.get('button[id="logbutton"]').should('be.visible').click();
        cy.wait('@log'); 
        
        cy.get('#labtests').should('be.visible').click();
  
        cy.wait('@TestList').its('response.statusCode').should('eq', 200);
        cy.get('[testId="1"]').click()
        cy.get('#labTestEdit').click()
    })
  })