describe('Unavailable time slots rendering failed', () => {
    it('should display network error popup', () => {  
      cy.visit('http://localhost:3000');
  
      
      cy.get('input[id="1"]').type('6');   // Login successfully
      cy.get('input[id="2"]').type('Daniel123');
      cy.get('button[id="logbutton"]').should('be.visible').click();
      cy.wait(5000); 
  
      // Intercept the API request for unavailable times with fixture data
      cy.intercept('GET', 'https://localhost:7205/api/Appointment/BlockDates/1/date/2024-06-30T00:00:00.000', { statusCode:500 }).as('getunableTimes');
  
      // Navigate to the specific date and open unavailable times
      cy.get('a[aria-label="June 30, 2024"]').click();
      cy.get('button[data-testid="addbutton"]').should('be.visible').click();
      cy.get('button[data-testid="unavailabletimes"]').should('be.visible').click();
  
     
      cy.wait("@getunableTimes").then((interception) => {
        // Verify the response status code
        expect(interception.response.statusCode).to.equal(500);
      });
      cy.get('[id="searchpatientpagenotification"]').should('contain',"Network Error Occured!");
  
      
    });
  });
  