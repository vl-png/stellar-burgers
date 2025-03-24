import {
  INGREDIENT_MAIN,
  BURGER_BUN_TOP,
  BURGER_BUN_BOTTOM,
  BURGER_INGREDIENTS,
  MODAL,
  ORDER_BUTTON
} from '../support/selectors';

describe('Проверка работы страницы конструктора', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('Проверка добавления ингредиентов в конструктор', () => {
    cy.addIngredients();
    cy.checkIngredients();
  });

  it('Проверка открытия модального окна ингредиента', () => {
    cy.openIngredientModal(INGREDIENT_MAIN);

    cy.get(MODAL)
      .contains('Филе Люминесцентного тетраодонтимформа')
      .should('exist');
  });

  it('Проверка закрытия модального окна ингредиента по нажатию на кнопку "Закрыть" ', () => {
    cy.openIngredientModal(INGREDIENT_MAIN);
    cy.closeModalWithButton();
  });

  it('Проверка закрытия модального окна ингредиента по нажатию на оверлей', () => {
    cy.openIngredientModal(INGREDIENT_MAIN);
    cy.closeModalWithOverlay();
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
    cy.addIngredients();
    cy.checkIngredients();

    cy.createOrder();
    cy.wait('@postOrder');

    cy.get(MODAL).should('be.visible').contains('71074');
    cy.get(MODAL)
      .find('button')
      .should('exist')
      .click()
      .should('not.exist');

    cy.get(BURGER_BUN_TOP).should('not.exist');
    cy.get(BURGER_BUN_BOTTOM).should('not.exist');

    cy.get(BURGER_INGREDIENTS)
      .contains('Выберите начинку')
      .should('exist');

    cy.get(ORDER_BUTTON)
      .find('p')
      .should('exist')
      .contains('0')
      .should('exist');
  });
});
