describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')

    cy.get('input[id="1"]').type('1');   
    cy.get('input[id="2"]').type('Andrew123');
    cy.get('button[id="logbutton"]').should('be.visible').click();
    cy.wait(5000); 
  })
})