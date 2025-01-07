describe("Packages Table", () => {
    beforeEach(() => {
        cy.intercept("GET", "/packages", {
            statusCode: 200,
            body: {
                message: "OK",
                data: {
                    packages: [
                        {
                            id: 1,
                            service: "Delivery",
                            received_at: "2023-12-20 14:00:00",
                            confirmed_at: null,
                            address_id: 123,
                            status: 1,
                        },
                    ],
                },
            },
        }).as("getPackages");

    });

    it("should display the packages table", () => {
        cy.visitWithToken("/packages");

        cy.wait("@getPackages");

        cy.get("#packageTable").should("exist");

        cy.get('[data-cy="btnConfirm"]').should("exist");


        cy.get("#packageTable tr").then(($rows) => {
            const numRows = $rows.length;
            cy.get('[data-cy="btnConfirm"]').should("have.length", numRows);
        });
    });

});
