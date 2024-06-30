describe('New appointment Adding', () => {
    it('should add a new appointment and return the mock data', () => {
      cy.fixture('NewAppointment').then((newAppointment) => {
        // Intercept the POST request to the /api/users endpoint
        // and respond with the mock data from the fixture
        cy.intercept('POST', 'https://localhost:7205/api/Appointment', {
          statusCode: 201,  // Mocking a successful creation response
           data: 0
        }).as('createAppointment'); // Alias the intercepted request as 'createUser'
  
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
  
        // Wait for the intercepted request and verify the response
        // Verify that the response status code is 201 (Created)
        cy.wait('@createAppointment').then((interception) => {
            expect(interception.response.statusCode).to.equal(201);
          });
      });
    });
  });
  