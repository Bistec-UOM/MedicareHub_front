describe('Doctor Login', () => {
    it('renders the doctor calender componenet', () => {  //check the calendar renders succesfully
      cy.visit('http://localhost:3000/')

      cy.get('input[id="1"]').type('1'); 
      cy.get('input[id="2"]').type('Andrew123'); 
      
      // Submit the login form 
      cy.wait(2000);
      cy.get('button[id="logbutton"]').should('be.visible').click(); 
      cy.wait(5000);

      cy.get('[data-testid="calendarevent"]').click(); // Clicking on the calendar event icon
      cy.get('[id="doccalendar"]', { timeout: 10000 }).should('exist');
      
    })
  })