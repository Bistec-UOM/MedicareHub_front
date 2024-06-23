describe('New appointment Adding Failed', () => {
    it('should display an Network Error notification', () => {
      cy.fixture('NewAppointment').then((newAppointment) => {
        // Intercept the POST request to the /api/users endpoint
        // and respond with the mock data from the fixture
        cy.intercept('POST', 'https://localhost:7205/api/Appointment', {
          statusCode: 500,  // Mocking a successful creation response
           data: 1
        }).as('createAppointmentFailed'); // Alias the intercepted request as 'createUser'
  
        // Visit the page containing the form
        cy.visit('http://localhost:3000');
  
      
        cy.get('input[id="1"]').type('6');   // Login successfully
        cy.get('input[id="2"]').type('Daniel123');
        cy.get('button[id="logbutton"]').should('be.visible').click();
        cy.wait(5000); 

  
        //click the data
        cy.get('a[aria-label="June 30, 2024"]').click();

        //click the add button
        cy.get('button[data-testid="addbutton"]').should('be.visible').click();
        
        //click add icon of first patient
        cy.get('button[id="add-appointment"]').first().click(); 

        



       
  
        // Submit the form
        cy.get('[data-testid="save-appointment"]').click();
  
        cy.wait("@createAppointmentFailed").then((interception) => {
            // Verify the response status code
            expect(interception.response.statusCode).to.equal(500);
          });
          cy.get('[id="searchpatientpagenotification"]').should('contain',"Network Error Occured!");
      });
    });
  });
  