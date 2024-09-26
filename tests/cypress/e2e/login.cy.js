describe('Login', () => {
    it('should Log in successfully', () => {
        cy.visit('http://localhost/login/index?disable-twig-cache=true');

        cy.intercept({ method: 'POST', url: 'users/login' }, {
            statusCode: 200,
            body: {
                message: 'OK',
            },
        }).as("Login");

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

        //todo: reenable after the endpoint is finished
        /*cy.wait("@registerUser");

        cy.get('[name=email]')
            .should('have.value', '');*/
    })
})