describe("Update Appointment", () => {
  it("should handle the PUT request and verify the behavior", () => {
    cy.fixture("UpdatedAppointment").then((appointmentData) => {
      // Mock the PUT request using cy.intercept
      cy.intercept("PUT", "https://localhost:7205/api/Appointment/722", {
        statusCode: 200,
        data: 0,
      }).as("putAppointment");

      cy.visit("http://localhost:3000");

      cy.get('input[id="1"]').type("6"); // Login successfully
      cy.get('input[id="2"]').type("Daniel123");
      cy.get('button[id="logbutton"]').should("be.visible").click();
      cy.wait(5000);

      //click the date
      cy.get('a[aria-label="June 29, 2024"]').click();

      cy.get('button[data-testid="editbutton"]').first().click({ force: true });
      cy.get('button[data-testid="editconfirm"]').click();

      cy.wait("@putAppointment").then((interception) => {
        // Verify the response status code
        expect(interception.response.statusCode).to.equal(200);
      });
    });
  });
});
