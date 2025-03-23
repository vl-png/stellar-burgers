describe('Проверка работы страницы конструктора', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('Проверка добавления ингредиентов в конструктор', () => {
    cy.get('[data-cy="data-bun"]').should('exist').find('button').click();
    cy.get('[data-cy="data-sauce"]').should('exist').find('button').click();
    cy.get('[data-cy="data-main"]').should('exist').find('button').click();

    cy.get('[data-cy="burger-bun-up"]')
      .contains('Краторная булка N-200i')
      .should('exist');
    cy.get('[data-cy="burger-bun-down"]')
      .contains('Краторная булка N-200i')
      .should('exist');
    cy.get('[data-cy="burger-ingredients"]')
      .contains('Соус Spicy-X')
      .should('exist');
    cy.get('[data-cy="burger-ingredients"]')
      .contains('Филе Люминесцентного тетраодонтимформа')
      .should('exist');
  });

  it('Проверка открытия модального окна ингредиента', () => {
    cy.get('[data-cy="data-main"]').should('exist').click();

    cy.get('[data-cy="modal"]').should('be.visible');

    cy.get('[data-cy="modal"]')
      .contains('Филе Люминесцентного тетраодонтимформа')
      .should('exist');

    cy.get('[data-cy="close-btn"]').should('exist');
  });

  it('Проверка закрытия модального окна ингредиента по нажатию на кнопку "Закрыть" ', () => {
    cy.get('[data-cy="data-main"]').should('exist').click();

    cy.get('[data-cy="close-btn"]').should('exist').click();
    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('Проверка закрытия модального окна ингредиента по нажатию на оверлей', () => {
    cy.get('[data-cy="data-main"]').should('exist').click();

    cy.get('[data-cy="overlay"]').should('exist').click({ force: true });
    cy.get('[data-cy="modal"]').should('not.exist');
  });
});

describe('Проверка создания заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );

    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );

    cy.intercept('POST', '/api/orders', { fixture: 'order.json' }).as(
      'postOrder'
    );

    cy.setCookie('accessToken', 'test-access');
    localStorage.setItem('refreshToken', 'test-refresh');

    cy.visit('/');
    cy.wait('@getIngredients');
    cy.wait('@getUser');
  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('Проверка создания заказа, закрытия модального окна и очистки конструктора', () => {
    cy.get('[data-cy="data-bun"]').should('exist').find('button').click();
    cy.get('[data-cy="data-sauce"]').should('exist').find('button').click();
    cy.get('[data-cy="data-main"]').should('exist').find('button').click();

    cy.get('[data-cy="burger-bun-up"]')
      .contains('Краторная булка N-200i')
      .should('exist');
    cy.get('[data-cy="burger-bun-down"]')
      .contains('Краторная булка N-200i')
      .should('exist');
    cy.get('[data-cy="burger-ingredients"]')
      .contains('Соус Spicy-X')
      .should('exist');
    cy.get('[data-cy="burger-ingredients"]')
      .contains('Филе Люминесцентного тетраодонтимформа')
      .should('exist');

    cy.get('[data-cy="order-burger"]').find('button').should('exist').click();
    cy.wait('@postOrder');

    cy.get('[data-cy="modal"]').should('be.visible').contains('71074');
    cy.get('[data-cy="modal"]')
      .find('button')
      .should('exist')
      .click()
      .should('not.exist');

    cy.get('[data-cy="burger-bun-up"]').should('not.exist');

    cy.get('[data-cy="burger-bun-down"]').should('not.exist');

    cy.get('[data-cy="burger-ingredients"]')
      .contains('Выберите начинку')
      .should('exist');

    cy.get('[data-cy="order-burger"]')
      .find('p')
      .should('exist')
      .contains('0')
      .should('exist');
  });
});
