import { addToCart, cart, loadFromStorage } from "../../data/cart.js";

// best practice: test each condition of an if-statement -> test coverage = how much of the code is being tested (try to maximize test coverage)
// Flaky test = test that sometimes passes and sometimes fails
// mocks = lets us replace a method with a fake version
// tests only pass if all the expectations pass (expect())
// a mock only lasts for 1 test
describe("test suite: addToCart", () => {
  it("adds an existing product to the cart", () => {
    spyOn(localStorage, "setItem");
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });
    loadFromStorage();

    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(2);
  });

  it("adds a new product to the cart", () => {
    // spyOn() records every time a method is used
    spyOn(localStorage, "setItem");
    // replace localStorage.getItem with a fake version
    // mock localStorage.getItem to return an empty array
    // spyOn(object that we want to mock, string-method)
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });
    // console.log(localStorage.getItem("cart"));
    loadFromStorage();

    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.length).toEqual(1);
    // check how many times localStorage set items
    // expect only works if we mock spyOn()
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    // check first cart product id
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(1);
  });
});
