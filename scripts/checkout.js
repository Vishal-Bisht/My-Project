import { cart, CartquantityCount, updateItemQuantity, removeFromCart } from '../data/cart.js';
import { products } from '../data/products.js';
import { deliveryOptions } from '../data/deliveryOptions.js';
import { formatCurrency } from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';


const today = dayjs();
const date = today.add(7,'days');

let cartHTML = ``;

cart.forEach((cart_items) => {

  const productId = cart_items.id;

  let matchingProduct = null;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
      return;
    }
  });

  cartHTML += `<div class="cart-items-container container-${matchingProduct.id}">
        <div class="delivery_date">
          Delivery date: ${date.format('dddd, MMMM D')}
        </div>
        <div class="cart_items">
          <div class="product-img-and-info-container">          
          <div class="product-img-container">
            <img class="product_img" src="${matchingProduct.image}">
          </div>
          <div class="product-info">
            <div class="product_name">${matchingProduct.name}</div>
            <div class="price">$${formatCurrency(matchingProduct.price)}</div>
            <div>Quantity: <span class="quantity" data-product-quantity = "${cart_items.quantity}">${cart_items.quantity}</span> <span class="btn add-item" data-product-id="${matchingProduct.id}">Update</span><span class="btn delete-item" data-product-id="${matchingProduct.id}">Delete</span> </div>
          </div>
          </div>
          <div class="delivery-option">
            <div class="delivery_header">Choose a delivery date:</div>
            <div class="option-grid">
            ${deliveryOptionsHTML(matchingProduct,cart_items)}
            </div>
          </div>
        </div>
      </div>`;
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
      </div>`;

function deliveryOptionsHTML(matchingProduct,cart_items) {
  let html = '';
  deliveryOptions.forEach((deliveryOption) => {
    const deliveryDate = today.add(deliveryOption.deliveryDays,'days');
    const dateString = deliveryDate.format('dddd, MMMM D');
    const priceString = deliveryOption.price===0?'FREE':`$${(formatCurrency(deliveryOption.price))} - `;
    const isChecked = deliveryOption.id ==='1';
   html += `<input class = "btn" type="radio" ${isChecked?'checked':''} name="${matchingProduct.id}-date">
             <label>
              <div class="option day_date">${dateString}</div>
              <div class="option shipping_charge">${priceString} Shipping</div>
            </label>
          `
  });
  return html;
}

document.querySelector('.cart-grid').innerHTML = cartHTML;

let cartQuantity = CartquantityCount();
document.querySelector('.cartquantity').innerHTML = `${cartQuantity} items`;

document.querySelectorAll('.add-item').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    updateItemQuantity(productId);
  });
});

document.querySelectorAll('.delete-item').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);
    const cart_item_container = document.querySelector(`.container-${productId}`);
    cart_item_container.remove();
    cartQuantity--;
    document.querySelector('.cartquantity').innerHTML = `${cartQuantity} items`;
  });
});