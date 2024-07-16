import {cart_items} from '../data/cart_items.js';
import {product} from '../data/products.js';
import { formatCurrency } from './utils/money.js';


localStorage.setItem('product',JSON.stringify(product));
console.log(localStorage.getItem('product'));

let productHTML = ``;

JSON.parse(localStorage.getItem('product')).forEach((Product) => {
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
              <button class="btn_add_to_cart"  data-product-name= "${Product.name}" data-product-image = "${Product.image}"
              data-product-id= "${Product.id}"
               data-product-price= "${Product.price}">Add to Cart</button>
            </div>
          </div>
        </div>`;
});

document.querySelector('.main-container').innerHTML = productHTML;

function addToCart(productId,productName,productImage,productPrice){
  let matchingitem;
  
  cart_items.forEach((cartitem) => {
    if (productId === cartitem.ProductId) {
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

          localStorage.setItem('cart_items', JSON.stringify(cart_items));
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
        console.log(localStorage.getItem('ProductId'));
  });
  });

