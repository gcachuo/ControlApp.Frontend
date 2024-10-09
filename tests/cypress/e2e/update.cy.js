describe('Users Update', () => {
    it('should update an existing user successfully', () => {
        const id = 1;
        cy.fixture('update_user.json').then(fakeUser => {
            cy.intercept({ method: 'GET', url: `users/${id}` }, {
                statusCode: 200,
                body: {
                    message: 'OK', user: fakeUser
                },
            }).as("getUser");


            cy.intercept({ method: 'PATCH', url: `users/${id}` }, {
                statusCode: 200,
                body: {
                    message: 'Usuario actualizado correctamente',
                },
            }).as("updateUser");

            cy.visit(`http://localhost/users/add/?id=${id}&disable-twig-cache=true`);

            cy.wait("@getUser");
            cy.get('#txtEmail').should('have.value', fakeUser.email);
            cy.get('#txtFirstName').should('have.value', fakeUser.firstName);
            cy.get('#txtSecondName').should('have.value', fakeUser.secondName);
            cy.get('#txtFirstSurname').should('have.value', fakeUser.lastname);
            cy.get('#txtSecondSurname').should('have.value', fakeUser.secondLastname);
            cy.get('#txtPhone').should('have.value', fakeUser.phoneNumber);
            cy.get('#txtAddress').should('have.value', fakeUser.address);
            cy.get('#txtEmail').clear().type('ivan@example.com').should('have.value', 'ivan@example.com');
            cy.get('#txtFirstName').clear().type('John Doe').should('have.value', 'John Doe');
            cy.get('#txtPassword').should('not.exist');
        });

        cy.get('[type=submit]').click();

        cy.wait("@updateUser");

        cy.location('pathname').should('eq', '/users/');

    });
});

