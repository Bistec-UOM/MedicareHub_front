describe('Doctor day appointment  Cancel', () => {
    it('should mark as cancel day appointment', () => {  //check the applist renders correctly with correct data
        cy.visit('http://localhost:3000');
  
        
        cy.get('input[id="1"]').type('1');   //login succsufully
        cy.get('input[id="2"]').type('Andrew123');
        cy.get('button[id="logbutton"]').should('be.visible').click();
        cy.wait(5000); 
  
  
       //intercept the actual url with fixture data
        cy.intercept('GET', 'https://localhost:7205/api/Appointment/doctor/1/day/June%2020,%202024', { fixture: 'DoctorDayAppointments.json' }).as('getDoctorAppointments');


        cy.intercept('PUT', 'https://localhost:7205/updateStatus/416', {
            statusCode: 200,
            fixture: 'DoctorDayAppointments.json'
          }).as('MarkasDoneAppointment');
          
        cy.get('[data-testid="calendarevent"]').click(); // Clicking on the calendar event icon
        cy.get('[id="doccalendar"]', { timeout: 10000 }).should('exist');
       
        const dayId = 'fc-dom-137'
  
        cy.get(`#${dayId}`).click();
  
        cy.wait('@getDoctorAppointments');
  
        
        cy.get('[data-testid="doctorapplist"]', { timeout: 10000 }) 
            .should('exist')
            .children()
            .should('have.length.greaterThan', 0);

          cy.get('[data-testid="cancelicon"]').first().click();
          cy.get('[data-testid="canceltext"]').should('contain','Are you sure you want to cancel the appointment?');

          cy.get('[data-testid="cancelconfirm"').click();

          cy.wait("@MarkasDoneAppointment").then((interception) => {
            // Verify the response status code
            expect(interception.response.statusCode).to.equal(200);
          });


          
      
      });
  });
  