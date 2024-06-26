describe('Accept request', () => {
    it('passes', () => {
        cy.visit('http://localhost:3000')
  
        cy.intercept('GET', 'http://localhost:3000/api/Test').as('TestList');
        cy.intercept('GET', 'http://localhost:3000/api/Test/Template').as('Template');
  
        cy.get('input[id="1"]').type('8');   
        cy.get('input[id="2"]').type('Nick123');
        cy.get('button[id="logbutton"]').should('be.visible').click();
        cy.wait('5000'); 
        
        cy.get('#labtests').should('be.visible').click();
  
        cy.wait('@TestList').its('response.statusCode').should('eq', 200);
        cy.get('[testId="1"]').click()
        cy.get('#labTestEdit').click()
        cy.get('#templEdit').click()
        cy.wait('@Template').its('response.statusCode').should('eq', 200);
    })
  })