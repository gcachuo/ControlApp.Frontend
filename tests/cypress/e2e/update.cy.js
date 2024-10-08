describe('Users Update', () => {
    it('should update an existing user successfully', () => {

        const id = 1;

        cy.intercept({ method: 'PATCH', url: `users/${id}` }, {
            statusCode: 200,
            body: {
                message: 'Usuario actualizado correctamente',
            },
        }).as("updateUser");


        cy.visit('http://localhost/users/add?disable-twig-cache=true');


        cy.fixture('update_user.json').then(user => {

            cy.get('#txtEmail').clear().type(user.email);
            cy.get('#txtFirstName').clear().type(user.firstName);
            cy.get('#txtSecondName').clear().type(user.secondName);
            cy.get('#txtFirstSurname').clear().type(user.firstSurname);
            cy.get('#txtSecondSurname').clear().type(user.secondSurname);
            cy.get('#txtPhone').clear().type(user.phone);
            cy.get('#txtAddress').clear().type(user.address);
            cy.get('#txtId').invoke('val', user.id);
        });


        cy.get('[type=submit]').click();

        cy.wait("@updateUser");


    });
});
