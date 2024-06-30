describe('Appointment Addition', () => {
    it('should add an appointment to the fixture', () => {
      cy.visit('http://localhost:3000'); // Replace with your application's URL
  
      // Mock the backend response for saving an appointment
      cy.intercept('POST', 'https://localhost:7205/api/appointments', (req) => {
        // Assuming the request contains appointment data
        const appointmentData = req.body;
  
        // Mock a successful response
        req.reply({
          statusCode: 200,
          body: { ...appointmentData, id: '2300' }, // Mock response with added ID
        });
      }).as('saveAppointment');
  
      // Navigate to the page where appointments can be added
        
      cy.get('input[id="1"]').type('6');   //login succsufully
      cy.get('input[id="2"]').type('Daniel123');
      cy.get('button[id="logbutton"]').should('be.visible').click();
      cy.wait(5000); 

       
      const dayId = 'fc-dom-229'
  
    
      cy.get('button[data-testid="addbutton"]').should('be.visible').click();

      cy.get('button[id="add-appointment"]').first().click();   cy.get('a[aria-label="June 30, 2024"]').click();

  
      cy.get('button[id="save-appointment"]').click(); //Click on "Save" button
  
    
      cy.request('AddAppointment.json').then((response) => {
        
        expect(response.status).to.eq(200); // check successful request
       
      });
    });
  });
  