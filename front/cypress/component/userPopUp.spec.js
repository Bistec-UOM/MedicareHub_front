describe('UserPopUp Component', () => {
    beforeEach(() => {
      cy.intercept('GET', '/api/User/1', { fixture: 'mockUser.json' }).as('getUser');
      cy.visit('/'); // Adjust the URL to your application's URL
      cy.get('[data-testid="edit-button"]').click(); // Replace with the actual selector for your edit button
    });
  
    it('should fetch and display user data when editOpen is true', () => {
      cy.wait('@getUser');
      cy.get('[data-testid="user-fullName"]').should('have.value', 'Johnathan Doe'); // Replace with actual selector and expected value
      cy.get('[data-testid="user-email"]').should('have.value', 'john.doe@example.com'); // Replace with actual selector and expected value
    });
  
    it('should enable form fields when edit button is clicked', () => {
      cy.wait('@getUser');
      cy.get('[data-testid="user-fullName"]').should('be.disabled');
      cy.get('[data-testid="edit-button"]').click(); // Replace with the actual selector for your edit button
      cy.get('[data-testid="user-fullName"]').should('not.be.disabled');
    });
  
    it('should update user data on save', () => {
      cy.wait('@getUser');
      cy.get('[data-testid="edit-button"]').click();
      cy.get('[data-testid="user-fullName"]').clear().type('Jane Doe'); // Replace with actual selector
      cy.get('[data-testid="save-button"]').click(); // Replace with actual selector for save button
      cy.get('[data-testid="user-fullName"]').should('have.value', 'Jane Doe'); // Ensure the field shows updated value
    });
  });
  