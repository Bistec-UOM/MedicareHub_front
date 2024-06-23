describe('Doctor day appointment list list', () => {
    it('should display day appointments and render correctly', () => {  //check the applist renders correctly with correct data
        cy.visit('http://localhost:3000');
  
        
        cy.get('input[id="1"]').type('1');   //login succsufully
        cy.get('input[id="2"]').type('Andrew123');
        cy.get('button[id="logbutton"]').should('be.visible').click();
        cy.wait(5000); 
  
  
       //intercept the actual url with fixture data
        cy.intercept('GET', 'https://localhost:7205/api/Appointment/doctor/1/day/June%2020,%202024', { fixture: 'DoctorDayAppointments.json' }).as('getDoctorAppointments');
          
        cy.get('[data-testid="calendarevent"]').click(); // Clicking on the calendar event icon
        cy.get('[id="doccalendar"]', { timeout: 10000 }).should('exist');
       
        const dayId = 'fc-dom-137'
  
        cy.get(`#${dayId}`).click();
  
        cy.wait('@getDoctorAppointments');
  
        
        cy.get('[data-testid="doctorapplist"]', { timeout: 10000 }) 
            .should('exist')
            .children()
            .should('have.length.greaterThan', 0);
  
       //check if first appointment has this data
        cy.get('[data-testid="doctorapplist"] > div').first().within(() => {
          cy.get('[data-testid="dappointment-name"]').should('contain', 'David Andrew Brown');
          cy.get('[ data-testid="dappointment-no"]').should('contain', '0765432100');
        });
      });
  });
  