describe('Teste do funcionamento do site https://the-internet.herokuapp.com', () => {

    const site = {
        url: 'https://the-internet.herokuapp.com/login',
        username: 'tomsmith',
        password: 'SuperSecretPassword!'
    };

    const submitButton = 'button[type=\'submit\']';

    it('Teste inicial de asserção', () => {
        expect(true).to.equal(true);
    });

    it('Deve carregar a página inicial do site', () => {
        cy.visit(site.url);
    });

    it('Deve realizar o login e deslogar logo em seguida', () => {
        cy.get('#username')
            .type(site.username, { delay: 100 });

        cy.get('#password')
            .type(site.password, { delay: 100 });

        cy.get(submitButton).click();

        cy.get('.success')
            .should('to.be.visible')
            .contains('You logged into a secure area!')
        
        cy.contains('Logout')
            .click();
    });

    it('Deve tentar logar com credenciais incorretas e exibir um aviso de erro', () => {
        cy.get('#username')
        .type(site.username, { delay: 100 });

        cy.get('#password')
            .type('uma senha incorreta', { delay: 100 });
        
        cy.get(submitButton).click();

        cy.get('.success')
            .should('not.to.be.visible');
        
        cy.get('.error')
            .should('to.be.visible')
            .contains('Your password is invalid!');
    })
});

