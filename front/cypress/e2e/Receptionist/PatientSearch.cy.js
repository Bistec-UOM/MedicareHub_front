describe('search patient in the patient list', () => {
    it('should display patient card and render correctly', () => {  //check the applist renders correctly with correct data
        cy.visit('http://localhost:3000');
  
        
        cy.get('input[id="1"]').type('6');   //login succsufully
        cy.get('input[id="2"]').type('Daniel123');
        cy.get('button[id="logbutton"]').should('be.visible').click();
        cy.wait(5000); 
  
  
       //intercept the actual url with fixture data
        cy.intercept('GET', 'https://localhost:7205/api/Appointment/patients', { fixture: 'patients.json' }).as('getpatients');
  
       
        const dayId = 'fc-dom-137'
  
        cy.get(`#${dayId}`).click();
        cy.get('button[data-testid="addbutton"]').should('be.visible').click();
  
        cy.wait('@getpatients');

        cy.get('[data-testid="patientlist"]', { timeout: 10000 }) 
        .should('exist')
        .children()
        .should('have.length.greaterThan', 0);

        cy.get('#patientsearch').type('David', { force: true });

       //check if search result has this data
        cy.get('[data-testid="patientlist"]').first().within(() => {
          cy.get('[data-testid="patientname"]').should('contain', 'David Andrew Brown');
          cy.get('[ data-testid="patientaddress"]').should('contain', '789 Elm St, Galle');
        });
      });
  });
  