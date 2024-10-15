describe('Users', () => {
    it('should create a new user successfully', () => {
        cy.visit('http://localhost/users/add?disable-twig-cache=true');

        cy.intercept({ method: 'POST', url: 'users/register' }, {
            statusCode: 200,
            body: {
                message: 'OK',
            },
        }).as("registerUser");

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
            cy.get('[name=address]')
                .should('have.id', 'txtAddress')
                .should('have.attr', 'type', 'text')
                .should('have.attr', 'required', 'required')
                .type(user.address);
        });

        cy.get('[type=submit]')
            .click();

        cy.wait("@registerUser");

        cy.get('[name=email]')
            .should('have.value', '');
    })
})

describe('User Table Tests', () => {
    beforeEach(() => {
        // Ignorar errores no controlados
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false; // Ignorar el error
        });

        // Interceptar la solicitud para la carga de usuarios
        cy.intercept('GET', 'http://localhost:5033/users', {
            statusCode: 200,
            body: [
                {
                    address: 'Calle 1',
                    firstName: 'Juan',
                    lastName: 'Pérez',
                    phoneNumber: '4771234567'
                },
                {
                    address: 'Calle 2',
                    firstName: 'María',
                    lastName: 'Fernanda',
                    phoneNumber: '4771234567'
                },
                {
                    address: 'Calle 3',
                    firstName: 'Pedro',
                    lastName: 'Moreno',
                    phoneNumber: '4771234567'
                }
            ]
        }).as('getUsers');

        cy.visit('http://localhost/users/index?disable-twig-cache=true');
        cy.wait('@getUsers');
    });

    it('displays the user table correctly', () => {
        cy.get('#userTable tr').should('have.length', 3);
        cy.get('#userTable tr').first().within(() => {
            cy.get('td').eq(0).should('have.text', 'Calle 1');
            cy.get('td').eq(1).should('have.text', 'Juan Pérez');
            cy.get('td').eq(2).should('have.text', '4771234567');
        });
    });

    it('redirects to the add user page when edit button is clicked', () => {
        cy.get('button:contains("Editar")').first().click();
        cy.url().should('include', '/users/add');
    });
});
