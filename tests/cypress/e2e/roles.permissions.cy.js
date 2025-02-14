describe("Permissions Page", () => {
  beforeEach(() => {
    var id = 123;

    cy.intercept("GET", "/roles/123/nodes", {
      body: {
        message: "OK",
        permissions: {
          Usuarios: ["Crear", "Editar", "Eliminar"],
          Roles: ["Asignar", "Modificar"],
        },
      },
    }).as("getPermissions");

    cy.intercept("POST", "/roles/123/nodes").as("savePermissions");

    cy.visitWithToken(`/roles/permissions/?id=${id}`);
  });

  it("should load and display permissions", () => {
    cy.wait("@getPermissions");

    cy.get("#permissionsTable").should("be.visible");
    cy.contains("Usuarios").should("exist");
    cy.contains("Crear").should("exist");
    cy.contains("Editar").should("exist");
    cy.contains("Eliminar").should("exist");
    cy.contains("Roles").should("exist");
    cy.contains("Asignar").should("exist");
    cy.contains("Modificar").should("exist");
  });

  it("should have checkboxes for permissions", () => {
    cy.get("input[type='checkbox']").should("have.length", 5);
  });

  it("should allow selecting permissions", () => {
    cy.get("input[type='checkbox']").first().check().should("be.checked");
    cy.get("input[type='checkbox']").eq(1).uncheck().should("not.be.checked");
  });

  it("should have save button disabled initially", () => {
    cy.get("#savePermissions").should("be.disabled");
  });
});
