import {cart_items} from '../data/cart_items.js';
import { formatCurrency } from './utils/money.js';

let cartHTML = ``;

cart_items.forEach((cart_items)=>{
    cartHTML += `<div class="cart-items-container">
        <div class="delivery_date">
          Delivery date: ${cart_items.delivery_date}
        </div>
        <div class="cart_items">
          <div class="product-img-and-info-container">          
          <div class="product-img-container">
            <img class="product_img" src="${cart_items.ProductImage}">
          </div>
          <div class="product-info">
            <div class="product_name">${cart_items.ProductName}</div>
            <div class="price">$${formatCurrency(cart_items.ProductPrice)}</div>
            <div class="quantity">Quantity: ${cart_items.quantity} <span class="btn add">+1</span><span class="btn remove">remove</span> </div>
          </div>
          </div>
          <div class="delivery-option">
            <div class="delivery_header">Choose a delivery option:</div>
            <div class="option-grid">
            <input class = "btn" type="radio" name="date">
             <label>
              <div class="option day_date">Tuesday, July 9</div>
              <div class="option shipping_charge">Free Shipping</div>
            </label>
            <input class = "btn" type="radio" name="date">
            <label>
              <div class="option day_date">Wednesday, July 3</div>
              <div class="option shipping_charge">$4.99 - Shipping</div>
            </label>
            <input class = "btn" type="radio" name="date">
            <label>
              <div class="option day_date">Monday, July 1</div>
              <div class="option shipping_charge">$9.99 - Shipping</div>
            </label>
          </div>
          </div>
        </div>
      </div>`
});
  cartHTML += `<div class="order-summary-container">
        <div class="summary_header">Order Summary</div>
        <div class="order-summary-grid">
        <div class="order-total-charges">
          <div class="charges items">
            Items (2):
          </div>
          <div class="charges shipping">
            Shipping & handling:
          </div>
          <div class="charges total">Total:</div>
          <div class="charges tax">
            Estimated tax (10%):
          </div>
        </div>
        <div class="order-total-value">
          <div class="value Item">
            $28.94
          </div>
          <div class="value Shipping">
            $9.99
          </div>
          <div class="value Total">
            $47.74
          </div>
          <div class="value Tax">
            $4.77
          </div>
        </div>
        </div>
        <div class="total-and-payment">
           <div class="order-total"><div>Order total:</div><div class="total-value">$42.82</div></div>
            <div class="payment-check">
              Use Paypal <input class = "btn btn payment_check" type="checkbox">
              <div class="btn-pyo-container">
                <button class="btn pyo">Place your order</button>
              </div>
            </div>
        </div>
      </div>`

document.querySelector('.cart-grid').innerHTML=cartHTML;

function Checkoutcartquantity(){
  let cartQuantity = 0;
  cart_items.forEach((cartitem)=>{
    cartQuantity += cartitem.quantity;
  });
  document.querySelector('.cartquantity').innerHTML = `${cartQuantity} items`;
};

Checkoutcartquantity();