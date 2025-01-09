describe("Packages Table", () => {
  beforeEach(() => {
    cy.intercept("GET", "/packages", {
      statusCode: 200,
      body: {
        message: "OK",
        packages: [
          {
            id: 1,
            service: "Delivery",
            receivedAt: "2023-12-20 14:00:00",
            confirmedAt: null,
            address: "Fake Street 123",
            statusName: "confirmar",
          },
        ],
      },
    }).as("getPackages");

    cy.visitWithToken("/packages-tracking");
  });

  it("should display the packages table with confirmation buttons", () => {
    cy.wait("@getPackages");
    cy.get("#packageTable").should("exist");
    cy.get('[data-cy="btnConfirm"]').should("exist");
    cy.get("#packageTable tr").then(($rows) => {
      const numRows = $rows.length;
      cy.get('[data-cy="btnConfirm"]').should("have.length", numRows);
    });
  });

  it("should display an empty table with an error message when the API request fails", () => {
    cy.intercept("GET", "/packages", {
      statusCode: 500,
      body: { message: "Internal Server Error" },
    }).as("getPackagesError");

    cy.visitWithToken("/packages-tracking");
    cy.wait("@getPackagesError");

    cy.get("#packageTable").should("exist");
    cy.get("#packageTable tr").should("have.length", 0);
  });

  it("should display a confirmation button for each package", () => {
    cy.wait("@getPackages");
    cy.get("#packageTable").should("exist");
    cy.get('[data-cy="btnConfirm"]').should("exist");
  });
});
