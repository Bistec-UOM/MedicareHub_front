describe('Resday list patient list Component', () => {
    it('should display patient list and render correctly', () => {  //check the applist renders correctly with correct data
        cy.visit('http://localhost:3000');
  
        
        cy.get('input[id="1"]').type('6');   //login succsufully
        cy.get('input[id="2"]').type('Daniel123');
        cy.get('button[id="logbutton"]').should('be.visible').click();
        cy.wait(5000); 
  
  
       //intercept the actual url with fixture data
        cy.intercept('GET', 'https://localhost:7205/api/Appointment/patients', { statusCode:500 }).as('getpatients');
  
       
        const dayId = 'fc-dom-137'
  
        cy.get(`#${dayId}`).click();
        cy.get('button[data-testid="addbutton"]').should('be.visible').click();
  
      
        cy.wait("@getpatients").then((interception) => {
            // Verify the response status code
            expect(interception.response.statusCode).to.equal(500);
          });
          cy.get('[id="searchpatientpagenotification"]').should('contain',"Network Error Occured!");
      });
  });
  