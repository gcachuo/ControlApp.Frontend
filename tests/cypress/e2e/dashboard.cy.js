describe('Role-based button functionality', () => {

    it('should display and interact with admin buttons', () => {
        cy.visit('http://localhost/dashbord/index?disable-twig-cache=true');

        cy.window().then((window) => {
            const adminToken = 'admin_access_token';
            window.localStorage.setItem('access_token', adminToken);
        });

        cy.intercept('POST', '/jwt-decode', { role: 'admin' });

        cy.get('#admin').should('be.visible');
        cy.get('#guard').should('not.be.visible');
        cy.get('#forbidden').should('not.be.visible');

        cy.get('button').contains('Usuarios').click();
        cy.url().should('include', '/users');

        cy.visit('http://localhost/dashboard/index?disable-twig-cache=true');
        cy.get('button').contains('Roles y permisos').click();
        cy.url().should('include', '/roles');
    });

    it('should display and interact with guard buttons', () => {
        cy.visit('http://localhost/dashboard/index?disable-twig-cache=true');

        cy.window().then((window) => {
            const guardToken = 'guard_access_token';
            window.localStorage.setItem('access_token', guardToken);
        });

        cy.intercept('POST', '/jwt-decode', { role: 'guard' });

        cy.get('#guard').should('be.visible');
        cy.get('#admin').should('not.be.visible');
        cy.get('#forbidden').should('not.be.visible');

        cy.get('button').contains('Control de visitas').click();
        cy.url().should('include', '/visits');
        
        cy.visit('http://localhost/dashboard/index?disable-twig-cache=true');
        cy.get('button').contains('Control de paquetería').click();
        cy.url().should('include', '/parcelControl');
    });

    it('should display forbidden error for unauthorized role', () => {
        cy.visit('http://localhost/dshboard/index?disable-twig-cache=true');

        cy.window().then((window) => {
            const userToken = 'user_access_token';
            window.localStorage.setItem('access_token', userToken);
        });

        cy.intercept('POST', '/jwt-decode', { role: 'user' });

        cy.get('#forbidden').should('be.visible');
        cy.get('#admin').should('not.be.visible');
        cy.get('#guard').should('not.be.visible');
    });
});
