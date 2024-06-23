describe('DELETE appointment test', () => {
    it('should delete an appointment from the list', () => {
      // Intercept the DELETE request
      cy.intercept('DELETE', 'https://localhost:7205/api/Appointment/722',{
        statusCode:200
      }).as('deleteItem');
  
      // Visit the page where the delete action can be performed
      // Visit the page containing the form
      cy.visit('http://localhost:3000');
  
      
      cy.get('input[id="1"]').type('6');   // Login successfully
      cy.get('input[id="2"]').type('Daniel123');
      cy.get('button[id="logbutton"]').should('be.visible').click();
      cy.wait(5000); 

       //click the data
       cy.get('a[aria-label="June 29, 2024"]').click();

       cy.get('button[data-testid="deletebutton"]').first().click({ force: true }); 
       cy.get('button[data-testid="confirmdelete"]').click(); 

  
        // Wait for the intercepted DELETE request
        cy.wait('@deleteItem').then((interception) => {
        // Assert that the DELETE request was successful (status code 200 or 204)
        expect(interception.response.statusCode).to.be.oneOf([200, 204]);
  
        // Optionally, validate the response body if needed
        // expect(interception.response.body).to.deep.equal({ message: 'Item deleted successfully' });
      });
  
      // Optionally, assert that the deleted item is no longer visible in the UI
      // This depends on how your UI updates after a successful deletion
      // cy.get('.item').should('not.contain', 'Deleted Item Name');
    });
  });
  