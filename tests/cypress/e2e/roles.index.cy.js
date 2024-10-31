describe('Test Role Table', () => {
    beforeEach(() => {
        cy.intercept('GET', 'http://localhost:5033/roles', {
            body: {
                message: 'OK',
                roles: [
                    { roles: 'Admin' },
                    { roles: 'Guard' },
                    { roles: 'User' }
                ]
            }
        }).as('fetchRoles');


    });

    it('Should load the role table with the data', () => {

        cy.visitWithToken('/roles');

        cy.wait('@fetchRoles');

        cy.get('#roleTable tr').should('have.length', 3);

        cy.get('#roleTable tr').eq(0).should('contain', 'Admin');
        cy.get('#roleTable tr').eq(1).should('contain', 'Guard');
        cy.get('#roleTable tr').eq(2).should('contain', 'User');
    });

    it('Should load the role table with the data received and show a botton to assign roles in every row', () => {

        cy.visitWithToken('/roles');

        cy.wait('@fetchRoles');

        cy.get('#roleTable tr').should('have.length', 3);

        const expectedRoles = ['Admin', 'Guard', 'User'];
        cy.get('#roleTable tr').each(($row, index) => {
            cy.wrap($row).should('contain', expectedRoles[index]);

            cy.wrap($row).find('[data-cy="btnAssign"]').should('exist');
        });
    });

    it('Must show a warning message if no roles received', () => {
        cy.intercept('GET', 'http://localhost:5033/roles', {
            body: { message: 'OK', roles: [] }
        }).as('fetchEmptyRoles');

        cy.visit('/');
        cy.wait('@fetchEmptyRoles');

        cy.on('window:console', (msg) => {
            expect(msg).to.have.property('type', 'warn');
            expect(msg).to.contain('La lista está vacía');
        });
    });
});
