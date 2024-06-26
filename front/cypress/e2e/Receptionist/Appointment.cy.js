describe('Appointment initial page', () => {
    it('renders the calender componenet', () => {  //check the calendar renders succesfully
      cy.visit('http://localhost:3000/')

      cy.get('input[id="1"]').type('6'); 
      cy.get('input[id="2"]').type('Daniel123'); 
      
      // Submit the login form 
      cy.wait(2000);
      cy.get('button[id="logbutton"]').should('be.visible').click(); 
      cy.wait(5000);
      cy.get('[data-testid="testcalendar"]')
      .should('exist');
      
    })
  })