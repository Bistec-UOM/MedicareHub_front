describe('Doctor day block click  ', () => {
    it('should display a day block alert', () => {  //check the applist renders correctly with correct data
        cy.visit('http://localhost:3000');
  
        
        cy.get('input[id="1"]').type('1');   //login succsufully
        cy.get('input[id="2"]').type('Andrew123');
        cy.get('button[id="logbutton"]').should('be.visible').click();
        cy.wait(5000); 
          
        cy.get('[data-testid="calendarevent"]').click(); // Clicking on the calendar event icon
        cy.get('[id="doccalendar"]', { timeout: 10000 }).should('exist');
        cy.wait(5000); 
        cy.get('a[aria-label="June 12, 2024"]', { timeout: 10000 }).click({ force: true });
        cy.get('[id="calendarnotification"]').should('exist');

       
      
      });
  });
  