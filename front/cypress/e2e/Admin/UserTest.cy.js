describe('Admin User Test', () => {
  
    beforeEach(() => {
      // Visit the login page first
      cy.visit('http://localhost:3000');
  
      // Perform login
      cy.get('[data-testid="username"]').type('66');
      cy.get('[data-testid="password"]').type('123');
      cy.get('[data-testid="login-button"]').click();
  
      // Ensure we have navigated to the admin page
      cy.intercept('POST', '**/api/Auth/log').as('loginRequest');
      // cy.wait('@loginRequest').its('response.statusCode').should('eq', 200);
  
      cy.url({ timeout: 10000 }).should('include', '/admin');
    });

      it('should naviagte add user',()=>{

        cy.fixture('Admin/user').then((newUser) => {
          // Intercept the POST request to the /api/users endpoint
          // and respond with the mock data from the fixture
          cy.intercept('POST', 'https://localhost:7205/api/User', {
            statusCode: 200,  // Mocking a successful creation response
            body: newUser     // The response body will be the mock data
          }).as('createUser'); // Alias the intercepted request as 'createUser'
    

        cy.get('[data-testId="nav-Staff"]').first().click();
        cy.get('[data-testId="staff-section"]').should('be.visible');
       
        cy.get('[data-testId="add-button"]').first().click();
        cy.get('[data-testid="staff-Add"]').should('be.visible');
//-----------------------------------Add staff-------------------------------------
        cy.get('[data-testid="staff-Add-fullName"]').type('John William Doe');
        cy.get('[data-testid="staff-Add-name"]').type('John Doe');
        cy.get('[data-testid="staff-Add-nic"]').type('992345634v');
        cy.get('[data-testid="staff-Add-address"]').type('13 Main St, Colombo');
        cy.get('[data-testid="staff-Add-email"]').type('johndoe@example.com');
        cy.get('[data-testid="staff-Add-phone"]').type('0711345678');
        cy.get('[data-testid="staff-Add-qualifications"]').type('MBBS');
        cy.get('[data-testid="staff-Add-password"]').type('123');
        cy.get('[data-testid="staff-Add-dateOfBirth"] input').type('01-01-2001', { force: true }) // Force typing in case the element is covered
        // Select the gender
        cy.get('[data-testid="staff-Add-gender"]').click();
        cy.get('li[data-value="Male"]').click(); // Select "Male"
        // Optionally, assert the value has been set correctly
        cy.get('[data-testid="staff-Add-gender"]').should('contain', 'Male'); // Ensure the value is displayed correctly
  
      
  
        // Submit the form  
        cy.get('[data-testid="staff-Add-submit"]').click();

        cy.wait('@createUser').its('response.statusCode').should('eq', 200);
  
        // Verify that the response body matches the mock data
        cy.get('@createUser').its('response.body').should('deep.equal', newUser);
  
        // Optionally, validate the response body if needed
        // expect(interception.response.body).to.deep.equal({ message: 'Item deleted successfully' });
});
      });


      it('should naviagte add patient',()=>{

        cy.fixture('Admin/patient').then((newPatient) => {
          // Intercept the POST request to the /api/users endpoint
          // and respond with the mock data from the fixture
          cy.intercept('POST', 'https://localhost:7205/api/Patient', {
            statusCode: 200,  // Mocking a successful creation response
            body: newPatient     // The response body will be the mock data
          }).as('createPatient'); // Alias the intercepted request as 'createUser'
    

          cy.get('[data-testId="nav-Patient"]').first().click();
          cy.get('[data-testId="patient-section"]').should('be.visible');
       
        cy.get('[data-testId="patient-add-button"]').click();
        cy.get('[data-testid="patient-Add-fullName"]').should('be.visible');
//-----------------------------------Add patient-------------------------------------
        cy.get('[data-testid="patient-Add-fullName"]').type('Yasiru Ramosh');
        cy.get('[data-testid="patient-Add-name"]').type('Ramosh');
        cy.get('[data-testid="patient-Add-address"]').type('13 Main St, Colombo');
        cy.get('[data-testid="patient-Add-nic"]').type('992345634v');
        cy.get('[data-testid="patient-Add-phone"]').type('0711335678');
        cy.get('[data-testid="patient-Add-email"]').type('jyoe@example.com');
        cy.get('[data-testid="patient-Add-dateOfBirth"] input').type('01-01-2001', { force: true }) // Force typing in case the element is covered
        cy.get('[data-testid="patient-Add-gender"]').click();
        cy.get('li[data-value="Male"]').click(); // Select "Male"
        cy.get('[data-testid="patient-Add-gender"]').should('contain', 'Male'); // Ensure the value is displayed correctly
  



    // Submit the form  
    cy.get('[data-testid="patient-Add-submit"]').click();

    cy.wait('@createPatient').its('response.statusCode').should('eq', 200);

    // Verify that the response body matches the mock data
    cy.get('@createPatient').its('response.body').should('deep.equal', newPatient);



});
      });

   });


   
