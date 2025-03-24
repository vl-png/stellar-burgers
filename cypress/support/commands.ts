/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

import { 
  INGREDIENT_BUN,
  INGREDIENT_SAUCE,
  INGREDIENT_MAIN,
  BURGER_BUN_TOP,
  BURGER_BUN_BOTTOM,
  BURGER_INGREDIENTS,
  MODAL,
  CLOSE_BUTTON,
  OVERLAY,
  ORDER_BUTTON
} from './selectors';

Cypress.Commands.add('addIngredient', (selector) => {
  cy.get(selector).should('exist').find('button').click();
});

Cypress.Commands.add('addIngredients', () => {
  cy.addIngredient(INGREDIENT_BUN);
  cy.addIngredient(INGREDIENT_SAUCE);
  cy.addIngredient(INGREDIENT_MAIN);
});

Cypress.Commands.add('checkIngredients', () => {
  cy.get(BURGER_BUN_TOP)
    .contains('Краторная булка N-200i')
    .should('exist');
  cy.get(BURGER_BUN_BOTTOM)
    .contains('Краторная булка N-200i')
    .should('exist');
  cy.get(BURGER_INGREDIENTS)
    .contains('Соус Spicy-X')
    .should('exist');
  cy.get(BURGER_INGREDIENTS)
    .contains('Филе Люминесцентного тетраодонтимформа')
    .should('exist');
});

Cypress.Commands.add('openIngredientModal', (selector) => {
  cy.get(selector).should('exist').click();
  cy.get(MODAL).should('be.visible');
});

Cypress.Commands.add('closeModalWithButton', () => {
  cy.get(CLOSE_BUTTON).should('exist').click();
  cy.get(MODAL).should('not.exist');
});

Cypress.Commands.add('closeModalWithOverlay', () => {
  cy.get(OVERLAY).should('exist').click({ force: true });
  cy.get(MODAL).should('not.exist');
});

Cypress.Commands.add('createOrder', () => {
  cy.get(ORDER_BUTTON).find('button').should('exist').click();
});

declare global {
  namespace Cypress {
    interface Chainable {
      addIngredient(selector: string): Chainable<Element>
      addIngredients(): Chainable<Element>
      checkIngredients(): Chainable<Element>
      openIngredientModal(selector: string): Chainable<Element>
      closeModalWithButton(): Chainable<Element>
      closeModalWithOverlay(): Chainable<Element>
      createOrder(): Chainable<Element>
    }
  }
}