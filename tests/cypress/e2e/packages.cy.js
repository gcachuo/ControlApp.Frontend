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
                            receivedAt: "2023-12-20 14:00:00",
                            confirmedAt: null,
                            address: 123,
                            statusname: 1,
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


    });


});
