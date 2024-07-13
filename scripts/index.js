import {cart_items} from '../data/cart_items.js';
import {product} from '../data/products.js';
import { formatCurrency } from './utils/money.js';

let productHTML = ``;

product.forEach((product) => {
  productHTML += `
      <div class="product-container">
          <div class="product-img-container"><img class="product_img" src="${product.image}">
          </div>
          <div class="product-info">
            <div class="limit-to-2-lines product-name">${product.name}</div>
            <div class="product-rating-container">
              <div class="product-rating">
                <img class="rating-img" src="../images/ratings/rating-${product.rating.stars * 10}.png">
              </div>
              <div class="rating">${product.rating.count}</div>
            </div>
            <div class="price">$${formatCurrency(product.price)}</div>
            <div class="product-quantity">
              <select class = "Quantity-${product.productId}" id="Quantity">
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
              <button class="btn_add_to_cart"  data-product-name= "${product.name}" data-product-image = "${product.image}"
              data-product-id= "${product.id}"
               data-product-price= "${product.price}">Add to Cart</button>
            </div>
          </div>
        </div>`;
});

document.querySelector('.main-container').innerHTML = productHTML;

function addToCart(productId,productName,productImage,productPrice){
  let matchingitem;
  
  cart_items.forEach((cartitem) => {
    if (productId === cartitem.productId) {
      matchingitem = cartitem;
    }
  });

        if (matchingitem) {
          matchingitem.quantity+= 1;
        }
        else {
          cart_items.push({
            productId: productId,
            productName: productName,
            productImage: productImage,
            productPrice: productPrice,
            quantity: 1
          });
        }
}

function updateCartQuantity(){
        let cartQuantity = 0;
        cart_items.forEach((cartitem)=>{
          cartQuantity += cartitem.quantity;
        });

        document.querySelector(".count").innerHTML = cartQuantity;
}

document.querySelectorAll('.btn_add_to_cart')
.forEach((button) => {

      button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        const productName = button.dataset.productName;
        const productImage = button.dataset.productImage;
        const productPrice = button.dataset.productPrice;

        addToCart(productId,productName,productImage,productPrice);
        updateCartQuantity();
        console.log(cart_items);
  });
  });

