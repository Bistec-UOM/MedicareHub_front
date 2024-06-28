describe('Admin Component', () => {
  
  beforeEach(() => {
    // Visit the login page first
    cy.visit('http://localhost:3000');

    // Perform login
    cy.get('[data-testid="username"]').type('66');
    cy.get('[data-testid="password"]').type('123');
    cy.get('[data-testid="login-button"]').click();

    // Ensure we have navigated to the admin page
    cy.intercept('POST', '**/api/Auth/log').as('loginRequest');
    // cy.wait('@loginRequest').its('response.statusCode').should('eq', 200);

    cy.url({ timeout: 10000 }).should('include', '/admin');
  });




  it('should navigate to Patient section when the patient button is clicked', () => {
    cy.get('[data-testid="nav-item-patient"]').click();
    cy.get('[data-testid="A_Patient"]').should('be.visible');
  });

  it('should navigate to Drug section when the drug button is clicked', () => {
    cy.get('[data-testid="nav-item-drug"]').click();
    cy.get('[data-testid="A_Drugs"]').should('be.visible');
  });

  it('should navigate to Other section when the other button is clicked', () => {
    cy.get('[data-testid="nav-item-other"]').click();
    cy.get('[data-testid="A_Other"]').should('be.visible');
  });

  it('should highlight the selected navigation item', () => {
    cy.get('[data-testid="nav-item-income"]').should('have.css', 'background-color', 'rgb(9, 214, 54)');

    cy.get('[data-testid="nav-item-patient"]').click();
    });

    it('should naviagte on left navigation to staff section',()=>{
      cy.get('[data-testId="nav-Staff"]').first().click();
      cy.get('[data-testId="staff-section"]').should('be.visible');
    });


    it('should naviagte on left navigation to patient section',()=>{
      cy.get('[data-testId="nav-Patient"]').first().click();
      cy.get('[data-testId="patient-section"]').should('be.visible');
    });
    

 });
