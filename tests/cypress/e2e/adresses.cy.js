describe('Addresses Dropdown', () => {
    beforeEach(() => {
        cy.intercept('GET', 'http://localhost:5033/addresses', {
            statusCode: 200,
            body: [
                { id: 1, street: 'Calle Principal', number: '101' },
                { id: 2, street: 'Calle Secundaria', number: '202' },
                { id: 3, street: 'Calle Tercera', number: '303' },
            ],
        }).as('getAddresses');

        cy.visit('http://localhost/users/add?disable-twig-cache=true');
    });

    it('should load the addresses into the dropdown', () => {
        cy.wait('@getAddresses', { timeout: 10000 }); 

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

        cy.wait('@getAddresses', { timeout: 10000 }); 

        cy.get('#txtAddress')
            .find('option')
            .then(options => {

                expect(options).to.have.length(4); 
    
                expect(options[1].value).to.eq('1'); 
                expect(options[2].value).to.eq('2'); 
                expect(options[3].value).to.eq('3'); 
            });
    });    
    
});
