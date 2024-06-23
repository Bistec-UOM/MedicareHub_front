describe('patient analysis  Component', () => {
    it('should display patient analysis chart', () => {  //check the applist renders correctly with correct data
        cy.visit('http://localhost:3000');
  
        
        cy.get('input[id="1"]').type('6');   //login succsufully
        cy.get('input[id="2"]').type('Daniel123');
        cy.get('button[id="logbutton"]').should('be.visible').click();
        cy.wait(5000); 
  
  
    
       
       
        const dayId = 'fc-dom-137'
  
        cy.get(`#${dayId}`).click();
        cy.get('button[data-testid="addbutton"]').should('be.visible').click();
  
      
  
        
        cy.get('[data-testid="patientlist"]', { timeout: 10000 }) 
            .should('exist')
            .children()
            .should('have.length.greaterThan', 0);

             
            cy.get('[data-testid="analysis-icon"]').first().click(); // Clicking on the analysis icon

            // Wait for the chart or chart component to render
            cy.get('[data-testid="chart-component"]', { timeout: 30000 }).should('exist');
            cy.get('[data-testid="completedappointments"]').should('contain','Completed Appointments');

      });
  });
  