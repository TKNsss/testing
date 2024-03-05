import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart } from "../../data/cart.js";

/*
  2 things to test:
  - how the page looks
  - how the page behaves
*/

describe("test suite: renderOrderSummary", () => {
  // global variables
  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
  // run set up code (hooks)
  beforeEach(() => {
    spyOn(localStorage, "setItem");

    document.querySelector(".js-test-container").innerHTML = `
      <div class="js-checkout-header"></div>
      <div class="js-order-summary"></div>
      <div class="js-payment-summary"></div>
    `;

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 2,
          deliveryOptionId: "1",
        },
        {
          productId: productId2,
          quantity: 1,
          deliveryOptionId: "2",
        },
      ]);
    });
    loadFromStorage();
    renderOrderSummary();
  });

  it("display the cart", () => {
    // check the existence of 2 products in the cart
    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      2
    );
    // check if there is a text 'Quantity: 2'
    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain("Quantity: 2");
    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain("Quantity: 1");

    document.querySelector(".js-test-container").innerHTML = '';
  });

  it("removes a product", () => {
    document.querySelector(`.js-delete-link-${productId1}`).click();
    // check if after deleting a product
    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      1
    );
    // check if the first product container is non-existent
    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null);
    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null);
    // check if the cart updated
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);

    document.querySelector(".js-test-container").innerHTML = "";
  });
});

/*
  Hooks = lets us run some code for each test
  - beforeEach() = runs code before each test
  - afterEach() = runs code after each test
  - beforeAll() = runs code before all tests
  - afterAll() = runs code after all tests
*/