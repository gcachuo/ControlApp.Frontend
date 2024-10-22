describe('User Table Tests', () => {
    beforeEach(() => {
        cy.intercept('GET', '/users', {
            statusCode: 200,
            body: {
                message: 'OK',
                addresses: [
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
            },
        }).as('getUsers');

    });

    it('redirects to the add user page when edit buttons are clicked', () => {
        cy.visitWithToken('/users');

        cy.wait('@getUsers');


        cy.get('[data-cy="btnEdit"]').should('exist');

        cy.get('#userTable tr').then(($rows) => {
            const numRows = $rows.length;
            cy.get('[data-cy="btnEdit"]').should('have.length', numRows);
        });

        cy.get('button[data-cy="btnDeactivate"]').each((button) => {
            cy.wrap(button).should('be.disabled');
        });

    });

});