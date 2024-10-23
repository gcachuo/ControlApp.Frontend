describe('Role-based button functionality', () => {

    it('should display and interact with admin buttons', () => {

        cy.intercept({ method: 'POST', url: '/actions/jwt-decode.php' }, {
            statusCode: 200,
            body: {
                role: 'admin',
            },
        }).as("jwtDecode");

        cy.visitWithToken('/dashboard');

        cy.wait("@jwtDecode");

        cy.get('#admin').should('be.visible');
        cy.get('#guard').should('not.be.visible');
        cy.get('#forbidden').should('not.be.visible');

        cy.get('#admin')
            .within(() => {

                cy.get('#btnUsers').contains('Usuarios').click();
                cy.url().should('include', '/users');
                cy.visitWithToken('/dashboard');

                cy.get('#btnRoles').contains('Roles y permisos').click();
                cy.url().should('include', '/roles');
                cy.visitWithToken('/dashboard');

                cy.get('#btnVisits').contains('Control de visitas').click();
                cy.url().should('include', '/visits');
                cy.visitWithToken('/dashboard');

                cy.get('#btnParcelControl').contains('Control de paquetería').click();
                cy.url().should('include', '/parcelControl');
                cy.visitWithToken('/dashboard');

            });

    });

    it('should display and interact with guard buttons', () => {

        cy.intercept({ method: 'POST', url: '/actions/jwt-decode.php' }, {
            statusCode: 200,
            body: {
                role: 'guard',
            },
        }).as("jwtDecode");

        cy.visitWithToken('/dashboard');

        cy.wait("@jwtDecode");

        cy.get('#guard').should('be.visible');
        cy.get('#admin').should('not.be.visible');
        cy.get('#forbidden').should('not.be.visible');

        cy.get('#guard')
            .within(() => {

                cy.get('#btnVisits').contains('Control de visitas').click();
                cy.url().should('include', '/visits');
                cy.visitWithToken('/dashboard');

                cy.get('#btnParcelControl').contains('Control de paquetería').click();
                cy.url().should('include', '/parcelControl');

            });
    });

    it('should display forbidden error for unauthorized role', () => {

        cy.intercept({ method: 'POST', url: '/actions/jwt-decode.php' }, {
            statusCode: 200,
            body: {
                role: 'user',
            },
        }).as("jwtDecode");

        cy.visitWithToken('/dashboard');

        cy.wait("@jwtDecode");

        cy.get('#forbidden').should('be.visible');
        cy.get('#admin').should('not.be.visible');
        cy.get('#guard').should('not.be.visible');
    });
});
