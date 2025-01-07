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

    });

    it("should display the packages table", () => {
        cy.visitWithToken("/packages");

        cy.wait("@getPackages");

        cy.get("#packageTable").should("exist");


    });


});
