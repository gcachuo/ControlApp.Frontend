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
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });

        cy.intercept('GET', '/users', {
            statusCode: 200,
            body: [
                {
                    id: 1,
                    address: 'Calle 1',
                    firstName: 'Juan',
                    lastName: 'Pérez',
                    phoneNumber: '4771234567'
                },
                {
                    id: 2,
                    address: 'Calle 2',
                    firstName: 'María',
                    lastName: 'Fernanda',
                    phoneNumber: '4771234567'
                },
                {
                    id: 3,
                    address: 'Calle 3',
                    firstName: 'Pedro',
                    lastName: 'Moreno',
                    phoneNumber: '4771234567'
                }
            ]
        }).as('getUsers');

    });

    it('redirects to the add user page when edit buttons are clicked', () => {
        cy.visit('http://localhost/users/index/?disable-twig-cache=true');
        cy.wait('@getUsers');
    
        // Asegurarse de que los botones existen
        cy.get('[data-cy="btnEdit"]').should('exist');
    
        // Recorremos todos los botones
        cy.get('[data-cy="btnEdit"]').each((button, index) => {
            const userId = index + 1; // Ajustamos el ID del usuario
    
            // Hacemos clic en el botón de edición
            cy.wrap(button).click();
    
            // Esperamos a que la URL cambie a la página de edición
            cy.url().should('eq', `http://localhost/users/add/?id=${userId}`);
    
            // Volvemos a la tabla de usuarios después de verificar la URL
            cy.visit('http://localhost/users/index/?disable-twig-cache=true');
            cy.wait('@getUsers');
        });
    });
    
      
});
