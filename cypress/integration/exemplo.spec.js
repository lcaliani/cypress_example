describe('Teste do funcionamento do site https://the-internet.herokuapp.com', () => {

    const site = {
        urlLogin: 'https://the-internet.herokuapp.com/login',
        urlElements: 'https://the-internet.herokuapp.com/add_remove_elements/',
        username: 'tomsmith',
        password: 'SuperSecretPassword!'
    };

    const submitButton = 'button[type=\'submit\']';

    describe('Teste de Login', () => {
        it('Teste inicial de asserção', () => {
            expect(true).to.equal(true);
        });
    
        it('Deve carregar a página inicial do site', () => {
            cy.visit(site.urlLogin);
        });
    
        it('Deve realizar o login e deslogar logo em seguida', () => {
            cy.get('#username')
                .type(site.username, { delay: 50 });
    
            cy.get('#password')
                .type(site.password, { delay: 50 });
    
            cy.get(submitButton).click();
    
            cy.get('.success')
                .should('to.be.visible')
                .contains('You logged into a secure area!')
            
            cy.contains('Logout')
                .click();
        });
    
        it('Deve tentar logar com credenciais incorretas e exibir um aviso de erro', () => {
            cy.get('#username')
            .type(site.username, { delay: 50 });
    
            cy.get('#password')
                .type('uma senha incorreta', { delay: 50 });
            
            cy.get(submitButton).click();
    
            cy.get('.success')
                .should('not.to.be.visible');
            
            cy.get('.error')
                .should('to.be.visible')
                .contains('Your password is invalid!');
        })
    });

    describe('Teste de adição de elementos', () => {

        it('Deve adicionar um elemento ao clicar no botão "Add Element" e remover quando clicar no botão "Delete"', () => {
            cy.visit(site.urlElements);
    
            cy.get('.added-manually')
                .should('not.be.visible');

            cy.contains('Add Element')
                .click()
                .click()
                .click()
            cy.wait(2000);

            cy.get('.added-manually')
                .should('have.length', 3);
            
            cy.get('.added-manually:first-child')
                .click();
                
            
            cy.get('.added-manually')
                .should('have.length', 2);
        });

    })

});

