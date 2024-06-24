describe('Doctor day appointment list fetching failed', () => {
    it('should display an error of fetching', () => {  //check the applist renders correctly with correct data
        cy.visit('http://localhost:3000');
  
        
        cy.get('input[id="1"]').type('1');   //login succsufully
        cy.get('input[id="2"]').type('Andrew123');
        cy.get('button[id="logbutton"]').should('be.visible').click();
        cy.wait(5000); 
  
  
       //intercept the actual url with fixture data
        cy.intercept('GET', 'https://localhost:7205/api/Appointment/doctor/1/day/June%2020,%202024', {  statusCode: 500, }).as('getDoctorAppointments');
          
        cy.get('[data-testid="calendarevent"]').click(); // Clicking on the calendar event icon
        cy.get('[id="doccalendar"]', { timeout: 10000 }).should('exist');
       
        const dayId = 'fc-dom-137'
  
        cy.get(`#${dayId}`).click();
  
        cy.wait("@getDoctorAppointments").then((interception) => {
            // Verify the response status code
            expect(interception.response.statusCode).to.equal(500);
          });
          cy.get('[id="doctorappnotification"]').should('contain',"Network Error occured!");
  
        
       
      });
  });
  