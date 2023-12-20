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
import {cart, addToCart} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';

let productsHTML = '';
let addedMessageTimeoutId;

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
        $${formatCurrency(product.priceCents)}
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

function updateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
}

function showAddedToCartMessage(productId) {
  const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);
  addedMessage.classList.add("added-to-cart-visible");

  // Check if a previous timeoutId exists. If it does,
  // we will stop it.
  if (addedMessageTimeoutId) {
    clearTimeout(addedMessageTimeoutId);
  }

  addedMessageTimeoutId = setTimeout(() => {
    addedMessage.classList.remove("added-to-cart-visible");
  }, 2000);
}

document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener("click", () => {
      /* 
        To illustrate destructuring, we'll make a sandwich. Do you take everything out of the refrigerator to make your sandwich? No, you only take out the items you would like to use on your sandwich.

        Destructuring is exactly the same. We may have an array or object that we are working with, but we only need some of the items contained in these.

        Destructuring makes it easy to extract only what is needed.      
      */
      const { productId } = button.dataset;

      addToCart(productId);

      updateCartQuantity();
      
      showAddedToCartMessage(productId);
    });
  });

