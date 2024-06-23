describe('patient analysis  Component render failed', () => {
    it('should display network error popup', () => {  //check the applist renders correctly with correct data
        cy.visit('http://localhost:3000');

        cy.intercept('GET', 'https://localhost:7205/api/Appointment/PreviousAppointments/1', {
            statusCode: 500,  
          }).as('createAppointmentFailed'); 
  
        
        cy.get('input[id="1"]').type('6');   //login succsufully
        cy.get('input[id="2"]').type('Daniel123');
        cy.get('button[id="logbutton"]').should('be.visible').click();
        cy.wait(5000); 
  
  
    
       
       
        const dayId = 'fc-dom-137'
  
        cy.get(`#${dayId}`).click();
        cy.get('button[data-testid="addbutton"]').should('be.visible').click();
  
      
  
        
        cy.get('[data-testid="patientlist"]', { timeout: 10000 }) 
            .should('exist')
            .children()
            .should('have.length.greaterThan', 0);

             
            cy.get('[data-testid="analysis-icon"]').first().click(); // Clicking on the analysis icon

            cy.wait("@createAppointmentFailed").then((interception) => {
                // Verify the response status code
                expect(interception.response.statusCode).to.equal(500);
              });
              cy.get('[id="analysisnotification"]').should('contain',"Network Error Occured!");

      });
  });
  