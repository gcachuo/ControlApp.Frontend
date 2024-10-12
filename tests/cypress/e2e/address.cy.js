describe('Address Creation ', () => {
    beforeEach(() => {
        cy.visit('http://localhost/address?disable-twig-cache=true'); 
    });

    it('Should create the address successfully', () => {
        cy.get('#txtStreet').type('Fake Street');
        cy.get('#txtNumber').type('123');
        cy.get('button[type="submit"]').click();

        cy.on('window:alert', (txt) => {
            expect(txt).to.contains('Dirección registrada con éxito');
        });
    });

});
