// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('visitWithToken', (uri) => {
    const url = new URL(`http://localhost${uri}`); //?disable-twig-cache=true
    const params = new URLSearchParams(url.search);
    params.set('disable-twig-cache', 'true');
    url.search = params.toString();
    const newUrl = url.toString();

    cy.visit(newUrl, {
        onBeforeLoad(win) {
            win.addEventListener('load', (event) => {
                // Sobrescribe la función o previene la validación del token
                if (win.validateToken) {
                    cy.stub(win, 'validateToken').callsFake(() => {
                        console.log('Token bypassed for Cypress test');
                    });
                }
            });
        }
    });
});
