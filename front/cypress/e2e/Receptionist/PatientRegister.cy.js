describe('Patient register', () => {
    it('should create a new patient and return the mock data', () => {
      cy.fixture('Newpatient').then((newUser) => {
        // Intercept the POST request to the /api/users endpoint
        // and respond with the mock data from the fixture
        cy.intercept('POST', 'https://localhost:7205/api/Appointment/patients', {
          statusCode: 201,  // Mocking a successful creation response
          body: newUser     // The response body will be the mock data
        }).as('createUser'); // Alias the intercepted request as 'createUser'
  
        // Visit the page containing the form
        cy.visit('http://localhost:3000');
  
      
        cy.get('input[id="1"]').type('6');   // Login successfully
        cy.get('input[id="2"]').type('Daniel123');
        cy.get('button[id="logbutton"]').should('be.visible').click();
        cy.wait(5000); 

        cy.get('a[aria-label="June 30, 2024"]').click();
        cy.get('button[data-testid="addbutton"]').should('be.visible').click();
        cy.get('button[data-testid="newbutton"]').should('be.visible').click();
  
        // Fill out the form with test data
       // cy.get('input[data-testid="fullname"]').type('Sahan Tharaka Wilson');
        cy.get('[data-testid="fullname"] input').type('Sahan Tharaka Wilson');
        cy.get('[data-testid="nic"] input').type('321912659154');
        cy.get('[data-testid="address"] input').type('colombo');
        cy.get('[data-testid="phone"] input').type('0756789088');

        cy.get('[data-testid="birthday"] input').type('23-22-2001', { force: true });  //input birthday from date field

        cy.get('[data-testid="email"] input').type('sahan@gmail.com');

        cy.get('[data-testid="age"] input').type(24);

        cy.get('[data-testid="gender"]').click();
        cy.get('li[data-value="Male"]').click();  //select male from drop down

        // Submit the form
        cy.get('[data-testid="sendbutton"]').click();
  
        // Wait for the intercepted request and verify the response
        // Verify that the response status code is 201 (Created)
        cy.wait('@createUser').its('response.statusCode').should('eq', 201);
  
        // Verify that the response body matches the mock data
        cy.get('@createUser').its('response.body').should('deep.equal', newUser);
      });
    });
  });
  