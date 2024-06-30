describe('Get Req list', () => {
    it('passes', () => {
      cy.visit('http://localhost:3000')
  
      cy.intercept('GET', 'https://localhost:7205/Values/ReportRequest').as('ReqList');

      cy.get('input[id="1"]').type('8');   
      cy.get('input[id="2"]').type('Nick123');
      cy.get('button[id="logbutton"]').should('be.visible').click();

      cy.wait('@ReqList').its('response.statusCode').should('eq', 200);
    })
  })