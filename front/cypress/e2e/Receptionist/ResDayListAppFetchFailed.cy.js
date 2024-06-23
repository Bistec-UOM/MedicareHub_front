describe('ResDayList Component', () => {
    it('should display appointments and render correctly', () => {  //check the applist renders correctly with correct data
        cy.visit('http://localhost:3000');
  
        
        cy.get('input[id="1"]').type('6');   //login succsufully
        cy.get('input[id="2"]').type('Daniel123');
        cy.get('button[id="logbutton"]').should('be.visible').click();
        cy.wait(5000); 
  
  
       //intercept the actual url with fixture data
        cy.intercept('GET', 'https://localhost:7205/api/Appointment/doctor/1/day/June%2020,%202024', { statusCode:500 }).as('getAppointments');
  
       
        const dayId = 'fc-dom-137'
  
        cy.get(`#${dayId}`).click();
  
        cy.wait("@getAppointments").then((interception) => {
            // Verify the response status code
            expect(interception.response.statusCode).to.equal(500);
          });
          cy.get('[id="resdaylistnotification"]').should('contain',"Error fetching appointments:");
        
       
      });
  });
  