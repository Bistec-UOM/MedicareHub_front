describe('Doctor day unblock ', () => {
    it('should display day unblock succesful', () => {  //check the applist renders correctly with correct data
        cy.visit('http://localhost:3000');
  
        
        cy.get('input[id="1"]').type('1');   //login succsufully
        cy.get('input[id="2"]').type('Andrew123');
        cy.get('button[id="logbutton"]').should('be.visible').click();
        cy.wait(5000); 

        cy.intercept('DELETE', 'https://localhost:7205/api/Appointment/Unblock/97', {
            statusCode: 200,
            body: { message: 'Day Unblocked Succesfully' } // Mock response body
          }).as('unblockday');
          
        cy.get('[data-testid="calendarevent"]').click(); // Clicking on the calendar event icon
        cy.get('[id="doccalendar"]', { timeout: 10000 }).should('exist');
        cy.wait(5000); 
        cy.get('button[title="Next month"]').click();
        cy.get('button[title="Next month"]').click();
        cy.get('a[aria-label="August 9, 2024"]', { timeout: 10000 }).click({ force: true });
        cy.get('[id="calendarnotification"]').should('exist');

       

        cy.get('[data-testid="unblocktext"]').should('contain','If you want you can Unblock the day?');
        cy.get('[data-testid="unblockconfirm"]').click(); 
        cy.get('[id="calendarnotification"]').should('contain','Day Unblocked Succesfully');

        cy.wait('@unblockday', { timeout: 10000 }).then((interception) => {
        
            expect(interception.response.statusCode).to.equal(200); // Assert that the DELETE request was successful
            expect(interception.response.body.message).to.equal('Day Unblocked Succesfully');
      
          });

      
        

       
      
      });
  });
  