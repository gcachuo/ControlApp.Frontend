describe('Users', () => {
    it('should create a new role successfully', () => {
        cy.visitWithToken('/roles/add');

        cy.intercept({ method: 'POST', url: 'roles/create' }, {
            statusCode: 200,
            body: {
                message: 'OK',
            },
        }).as("registerRole");

        cy.get('[name=name]')
            .should('have.id', 'txtName')
            .should('have.attr', 'type', 'text')
            .should('have.attr', 'required', 'required')
            .type("Test");

        cy.get('[type=submit]')
            .click();

        cy.wait("@registerRole");

        cy.get('[name=name]')
            .should('have.value', '');
    })
})