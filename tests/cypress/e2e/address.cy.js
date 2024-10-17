describe('Address Creation ', () => {

    it('Should create the address successfully', () => {

        cy.visit('http://localhost/address?disable-twig-cache=true'); 

        cy.get('#txtStreet').type('Fake Street');
        cy.get('#txtNumber').type('123');
        cy.get('button[type="submit"]').click();

        cy.on('window:alert', (txt) => {
            expect(txt).to.contains('Dirección registrada con éxito');
        });
    });

});
