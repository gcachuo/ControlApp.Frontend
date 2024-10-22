describe('Login', () => {
    it('should Log in successfully', () => {
        cy.intercept({method: 'POST', url: '/users/login'}, {
            statusCode: 200,
            body: {
                accessToken: "accessToken",
                message: 'OK',
            },
        }).as("login");

        cy.intercept({method: 'POST', url: '/actions/jwt-decode.php'}, {
            statusCode: 200,
            body: {
                message: 'OK',
            },
        }).as("jwtDecode");

        cy.visitWithToken('/login/');

        cy.fixture('login.json').then(login => {
            cy.get('[name=username]')
                .should('have.id', 'txtUsername')
                .should('have.attr', 'type', 'text')
                .should('have.attr', 'required', 'required')
                .type(login.username);

            cy.get('[name=password]')
                .should('have.id', 'txtPassword')
                .should('have.attr', 'type', 'password')
                .should('have.attr', 'required', 'required')
                .type(login.password);
        });

        cy.get('[type=submit]')
            .click();

        cy.wait("@login");
    })
})