describe('Doctor time block  ', () => {
    it('should block a time', () => {  //check the applist renders correctly with correct data
        cy.visit('http://localhost:3000');
  
        
        cy.get('input[id="1"]').type('1');   //login succsufully
        cy.get('input[id="2"]').type('Andrew123');
        cy.get('button[id="logbutton"]').should('be.visible').click();
        cy.wait(5000); 


        cy.intercept('POST', 'https://localhost:7205/api/Appointment/unableDates', {
            statusCode: 200,
          }).as('blocktime');
          
        cy.get('[data-testid="calendarevent"]').click(); // Clicking on the calendar event icon
        cy.get('[id="doccalendar"]', { timeout: 10000 }).should('exist');
       
      
         
        cy.get('button[title="Next month"]').click();
        cy.get('a[aria-label="July 31, 2024"]').click();

        cy.get('button[data-testid="blockbutton"]').should('be.visible').click();

          cy.get('[data-testid="timeblockicon"]').click();
          cy.get('[data-testid="timeperiodtext"]').should('contain','Select the Time Period');

          cy.get('[data-testid="timeconfirm"').click();

          cy.wait("@blocktime").then((interception) => {
            // Verify the response status code
            expect(interception.response.statusCode).to.equal(200);
          });
         
      
      });
  });
  