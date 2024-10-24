describe('Users', () => {

    beforeEach(() => {
        cy.intercept({ method: 'GET', url: '/roles/' }, {
            statusCode: 200,
            body: {
                message: "OK",
                role: [
                    { id: 1, name: 'Administrador' },
                    { id: 2, name: 'Usuario' }
                ]
            }
        }).as("getRoles");

        cy.intercept('GET', 'addresses', {
            statusCode: 200,
            body: [
                { id: 1, street: 'Calle Principal', number: '101' },
                { id: 2, street: 'Calle Secundaria', number: '202' },
                { id: 3, street: 'Calle Tercera', number: '303' },
            ],
        }).as('getAddresses');

        cy.intercept({ method: 'POST', url: 'users/register' }, {
            statusCode: 200,
            body: {
                message: 'OK',
            },
        }).as("registerUser");
    });

    it('should create a new user successfully', () => {
        cy.visitWithToken('/users/add');

        cy.wait('@getAddresses');

        cy.fixture('user.json').then(user => {
            cy.get('[name=email]')
                .should('have.id', 'txtEmail')
                .should('have.attr', 'type', 'email')
                .should('have.attr', 'required', 'required')
                .type(user.email);
            cy.get('[name=firstName]')
                .should('have.id', 'txtFirstName')
                .should('have.attr', 'type', 'text')
                .should('have.attr', 'required', 'required')
                .type(user.firstName);
            cy.get('[name=secondName]')
                .should('have.id', 'txtSecondName')
                .should('have.attr', 'type', 'text')
                .should('not.have.attr', 'required', 'required')
                .type(user.secondName);
            cy.get('[name=firstSurname]')
                .should('have.id', 'txtFirstSurname')
                .should('have.attr', 'type', 'text')
                .should('have.attr', 'required', 'required')
                .type(user.firstSurname);
            cy.get('[name=secondSurname]')
                .should('have.id', 'txtSecondSurname')
                .should('have.attr', 'type', 'text')
                .should('not.have.attr', 'required', 'required')
                .type(user.secondSurname);
            cy.get('[name=password]')
                .should('have.id', 'txtPassword')
                .should('have.attr', 'type', 'password')
                .should('have.attr', 'required', 'required')
                .type(user.password);

            cy.get('[name=phone]')
                .should('have.id', 'txtPhone')
                .should('have.attr', 'type', 'tel')
                .should('have.attr', 'required', 'required')
                .should('have.attr', 'maxlength', '10')
                .type(user.phone);
            cy.get('#txtAddress').select('Calle Tercera 303');

            cy.wait('@getRoles');

            cy.get('#txtRole')
                .find('option')
                .should('have.length', 3)
                .then((options) => {
                    expect(options[1].text).to.equal('Administrador');
                    expect(options[2].text).to.equal('Usuario');
                });

            cy.get('#txtRole').select('Administrador');

            cy.get('[type=submit]').click();

            cy.wait("@registerUser");
        });
    });

    it('should update an existing user successfully', () => {
        const id = 1;
        cy.fixture('update_user.json').then(fakeUser => {
            cy.intercept({ method: 'GET', url: `users/${id}` }, {
                statusCode: 200,
                body: {
                    message: 'OK',
                    user: fakeUser
                },
            }).as("getUser");

            cy.intercept({ method: 'PATCH', url: `users/${id}` }, {
                statusCode: 200,
                body: {
                    message: 'Usuario actualizado correctamente',
                },
            }).as("updateUser");

            cy.visitWithToken(`/users/add/?id=${id}`);

            cy.wait('@getRoles');
            cy.wait('@getAddresses');
            cy.wait("@getUser");

            cy.get('#txtRole')
                .find('option')
                .should('have.length', 3)
                .then((options) => {
                    expect(options[1].text).to.equal('Administrador');
                    expect(options[2].text).to.equal('Usuario');
                });

            cy.get('#txtEmail').should('have.value', fakeUser.email);
            cy.get('#txtFirstName').should('have.value', fakeUser.firstName);
            cy.get('#txtSecondName').should('have.value', fakeUser.secondName);
            cy.get('#txtFirstSurname').should('have.value', fakeUser.lastname);
            cy.get('#txtSecondSurname').should('have.value', fakeUser.secondLastname);
            cy.get('#txtPhone').should('have.value', fakeUser.phoneNumber);
            cy.get('#txtAddress').should('have.value', fakeUser.address);
            cy.get('#txtRole').should('have.value', fakeUser.idRole);

            cy.get('#txtEmail').clear().type('ivan@example.com').should('have.value', 'ivan@example.com');
            cy.get('#txtFirstName').clear().type('John Doe').should('have.value', 'John Doe');

            cy.get('#txtPassword').should('not.exist');


            cy.get('[type=submit]').click();

            cy.wait("@updateUser");

            cy.location('pathname').should('eq', '/users/');
        });
    });

    it('should load the addresses into the dropdown', () => {
        cy.visitWithToken('/users/add');

        cy.wait('@getAddresses');

        cy.get('#txtAddress')
            .find('option')
            .should('have.length', 4)
            .then(options => {
                expect(options[0].textContent).to.eq('Selecciona una dirección');
                expect(options[1].textContent).to.eq('Calle Principal 101');
                expect(options[2].textContent).to.eq('Calle Secundaria 202');
                expect(options[3].textContent).to.eq('Calle Tercera 303');
            });
    });

    it('should have the correct values in the dropdown', () => {
        cy.visitWithToken('/users/add');

        cy.wait('@getAddresses');

        cy.get('#txtAddress')
            .find('option')
            .should('have.length', 4)
            .then(options => {
                expect(options[0].textContent).to.eq('Selecciona una dirección');
                expect(options[1].textContent).to.eq('Calle Principal 101');
                expect(options[2].textContent).to.eq('Calle Secundaria 202');
                expect(options[3].textContent).to.eq('Calle Tercera 303');
            });
    })
})