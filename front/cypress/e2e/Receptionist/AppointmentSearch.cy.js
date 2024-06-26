describe('search appointment in the appointment list', () => {
    it('should display appointment card and render correctly', () => {  //check the applist renders correctly with correct data
        cy.visit('http://localhost:3000');
  
        
        cy.get('input[id="1"]').type('6');   //login succsufully
        cy.get('input[id="2"]').type('Daniel123');
        cy.get('button[id="logbutton"]').should('be.visible').click();
        cy.wait(5000); 
  
  
       //intercept the actual url with fixture data
        cy.intercept('GET', 'https://localhost:7205/api/Appointment/doctor/1/day/June%2020,%202024', { fixture: 'appointments.json' }).as('getpatients');
  
       
        cy.get('a[aria-label="June 20, 2024"]').click();
  
        cy.wait('@getpatients');

        cy.get('[data-testid="applist"]', { timeout: 10000 }) 
        .should('exist')
        .children()
        .should('have.length.greaterThan', 0);

        cy.get('#appointmentsearch').type('David', { force: true });

       //check if search result has this data
        cy.get('[data-testid="applist"]').first().within(() => {
          cy.get('[data-testid="appointment-name"]').should('contain', 'David Andrew Brown');
          cy.get('[ data-testid="appointment-address"]').should('contain', '789 Elm St, Galle');
        });
      });
  });
  