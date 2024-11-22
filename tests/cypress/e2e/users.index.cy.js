describe("User Table Tests", () => {
  beforeEach(() => {
    cy.intercept("GET", "/users", {
      statusCode: 200,
      body: {
        message: "OK",
        users: [
          {
            id: 1,
            address: "Calle 1",
            firstName: "Juan",
            secondName: "Carlos",
            lastname: "Pérez",
            secondLastname: "López",
            phoneNumber: "4771234567",
          },
          {
            id: 2,
            address: "Calle 2",
            firstName: "María",
            secondName: "Elena",
            lastname: "Fernanda",
            secondLastname: "Martínez",
            phoneNumber: "4771234567",
          },
          {
            id: 3,
            address: "Calle 3",
            firstName: "Pedro",
            secondName: "Luis",
            lastname: "Moreno",
            secondLastname: "Hernández",
            phoneNumber: "4771234567",
          },
        ],
      },
    }).as("getUsers");
  });

  it("redirects to the add user page when edit buttons are clicked", () => {
    cy.visitWithToken("/users");

    cy.wait("@getUsers");

    cy.get('[data-cy="btnEdit"]').should("exist");

    cy.get("#userTable tr").then(($rows) => {
      const numRows = $rows.length;
      cy.get('[data-cy="btnEdit"]').should("have.length", numRows);
    });

    cy.get('button[data-cy="btnDeactivate"]').each((button) => {
      cy.wrap(button).should("be.disabled");
    });
  });

  it("renders no rows when server error occurs", () => {
    cy.intercept("GET", "/users", {
      statusCode: 500,
      body: { message: "Server Error", users: [] },
    }).as("getEmptyUsers");

    cy.visitWithToken("/users");
    cy.wait("@getEmptyUsers");

    cy.get("#userTable").should("be.empty");
    cy.window().then((win) => {
      cy.stub(win.console, "error").as("consoleError");
    });
  });
});
