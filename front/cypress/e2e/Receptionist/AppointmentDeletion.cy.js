describe('Appointment Deletion', () => {
    it('should delete an appointment', () => {
        cy.visit('http://localhost:3000');

      
        cy.get('input[id="1"]').type('6');   //login succsufully
        cy.get('input[id="2"]').type('Daniel123');
        cy.get('button[id="logbutton"]').should('be.visible').click();
        cy.wait(5000); 
  
  
    
  
       
        const dayId = 'fc-dom-157';

        cy.get(`#${dayId}`).click();


           // Intercept the DELETE request and mock the response
      cy.intercept('DELETE', 'https://localhost:7205/api/Appointment/703').as('deleteAppointment');
  
     
      cy.get('[data-testid="deletebutton"]').first().click(); //click on delete button
      
     cy.get('[data-testid="confirmdelete"]').click(); // Click on the "Yes" button in the confirmation dialog

  
   
  
    
     
      cy.wait('@deleteAppointment', { timeout: 10000 }).then((interception) => {
        
        expect(interception.response.statusCode).to.equal(200); // Assert that the DELETE request was successful
  
      });
  
     
    });
  });
  