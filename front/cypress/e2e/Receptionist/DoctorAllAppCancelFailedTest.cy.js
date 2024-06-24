describe('Doctor all day app cancel  failed ', () => {
    it('should display an error popup', () => {  //check the applist renders correctly with correct data
        cy.visit('http://localhost:3000');
  
        
        cy.get('input[id="1"]').type('1');   //login succsufully
        cy.get('input[id="2"]').type('Andrew123');
        cy.get('button[id="logbutton"]').should('be.visible').click();
        cy.wait(5000); 


        cy.intercept('PUT', 'https://localhost:7205/api/Appointment/doctor/1/day/June%2014,%202024', {
            statusCode: 500,
          }).as('allAppCancel');
          
        cy.get('[data-testid="calendarevent"]').click(); // Clicking on the calendar event icon
        cy.get('[id="doccalendar"]', { timeout: 10000 }).should('exist');
    
        cy.get('a[aria-label="June 14, 2024"]').click();

        cy.get('button[data-testid="cancelbutton"]').should('be.visible').click();

          cy.get('[data-testid="allappcanceltext"]').should('contain','Are you sure the entire list to be Canceled?');

          cy.get('[data-testid="allcancelconfirm"').click();

          cy.wait("@allAppCancel").then((interception) => {
            // Verify the response status code
            expect(interception.response.statusCode).to.equal(500);
          });
          cy.get('[id="doctorappnotification"]').should('contain',"Network Error Occured!");
         
      
      });
  });
  