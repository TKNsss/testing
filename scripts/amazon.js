// .toFixed(number) : set precision of decimal number
// remeber this:   document.querySelectorAll()
/*
  data attribute syntax (just an HTML attribute):

  data-........="${}"
      name     value

  - have to start with "data-"
*/

// modules only works when using live server 
// can't use module when we open directly html file

// using module helps avoid naming conflicts
// don't have to worry about order of files

// .. means get out of the current folder
// in this situation, we use .. to get out of the amazon.js to scripts file and to outside


// import {cart as myCart} from '../data/cart.js';      
// we can use this to declare another variable name called "cart"
import {cart} from '../data/cart.js';

let productsHTML = '';

products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src=${product.image}>
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${(product.priceCents / 100).toFixed(2)}
      </div>

      <div class="product-quantity-container">
        <select class="js-quantity-selector-${product.id}">
          <option selec ted value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-to-cart-${product.id}">  
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${
        product.id   
      }">
        Add to Cart
      </button>
    </div>
  `;
});

document.querySelector('.js-product-grid').innerHTML = productsHTML;

// notice that data-product-name -> product-name convert into productName (kebab-case to camel case)

document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    // This solution uses a feature of JavaScript called a closure. Each time we run the loop, it will create a new variable called addedMessageTimeoutId and do button.addEventListener().
    // Then, because of closure, the function we give to button.addEventListener() will get a unique copy of the addedMessageTimeoutId variable and it will keep this copy of the variable forever.
    // (Reminder: closure = if a function has access to a value/variable, it will always have access to that value/variable).
    // This allows us to create many unique copies of the addedMessageTimeoutId variable (one for every time we run the loop) so it lets us keep track of many timeoutIds (one for each product).
    let addedMessageTimeoutId;

    button.addEventListener("click", () => {
      /* 
        To illustrate destructuring, we'll make a sandwich. Do you take everything out of the refrigerator to make your sandwich? No, you only take out the items you would like to use on your sandwich.

        Destructuring is exactly the same. We may have an array or object that we are working with, but we only need some of the items contained in these.

        Destructuring makes it easy to extract only what is needed.      
      */
      const { productId } = button.dataset;

      let matchingItem;

      cart.forEach((item) => {
        if (productId === item.productId) {
          matchingItem = item;
        }
      }); 

      const quantitySelector = document.querySelector(
        `.js-quantity-selector-${productId}`
      );
      const quantity = Number(quantitySelector.value);

      if (matchingItem) {
        matchingItem.quantity += quantity;
      } else {
        cart.push({
          productId,
          quantity
        });
      }

      console.log(cart);

      let cartQuantity = 0;

      cart.forEach((item) => {
        cartQuantity += item.quantity;
      });

      document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;

      const addedMessage = document.querySelector(
        `.js-added-to-cart-${productId}`
      );

      addedMessage.classList.add("added-to-cart-visible");

      // Check if a previous timeoutId exists. If it does,
      // we will stop it.
      if (addedMessageTimeoutId) {
        clearTimeout(addedMessageTimeoutId);
      }

      const timeoutId = setTimeout(() => {
        addedMessage.classList.remove("added-to-cart-visible");
      }, 2000);

      // Save the timeoutId so we can stop it later.
      addedMessageTimeoutId = timeoutId;
    });
  });

