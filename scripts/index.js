import {addToCart, CartquantityCount} from '../data/cart.js';
import {products} from '../data/products.js';
import { formatCurrency } from './utils/money.js';

let productHTML = ``;

products.forEach((Product) => {
  productHTML += `
      <div class="product-container">
          <div class="product-img-container"><img class="product_img" src="${Product.image}">
          </div>
          <div class="product-info">
            <div class="limit-to-2-lines product-name">${Product.name}</div>
            <div class="product-rating-container">
              <div class="product-rating">
                <img class="rating-img" src="images/ratings/rating-${Product.rating.stars * 10}.png">
              </div>
              <div class="rating">${Product.rating.count}</div>
            </div>
            <div class="price">$${formatCurrency(Product.price)}</div>
            <div class="product-quantity">
              <select class = "Quantity-${Product.productId}" id="Quantity">
                <option selected="1">1</option>
                <option >2</option>
                <option >3</option>
                <option >4</option>
                <option >5</option>
                <option >6</option>
                <option >7</option>
                <option >8</option>
                <option >9</option>
                <option >10</option>
              </select>
            </div>
            <div class="add-to-cart">
              <button class="btn_add_to_cart"
              data-product-id= "${Product.id}">Add to Cart</button>
            </div>
          </div>
        </div>`;
});

document.querySelector('.main-container').innerHTML = productHTML;

document.querySelectorAll('.btn_add_to_cart')
.forEach((button) => {

      button.addEventListener('click', () => {
        const productId = button.dataset.productId;
       
        addToCart(productId);
  });
  });

