import { cart, CartquantityCount, updateItemQuantity, removeFromCart, updateDeliveryOptions } from '../data/cart.js';
import { products, getProduct } from '../data/products.js';
import { deliveryOptions } from '../data/deliveryOptions.js';
import { renderPaymentSummary } from './orderSummary.js';
import { formatCurrency } from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';


export function renderOrderPage() {

  const today = dayjs();

  let cartHTML = ``;

  let deliveryOptionId;

  cart.forEach((cart_items) => {

    const productId = cart_items.id;
    deliveryOptionId = cart_items.deliveryOptionId;
    let matchingProduct = null;

    products.forEach((product) => {
      if (product.id === productId) {
        matchingProduct = product;
      }
    });

    let deliveryOption;
    deliveryOptions.forEach((option) => {
      if (option.id === deliveryOptionId) {
        deliveryOption = option;
      }
    });
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    cartHTML += `<div class="cart-items-container container-${matchingProduct.id}">
            <div class="delivery_date">
              Delivery date: ${(dateString)}
            </div>
            <div class="cart_items">
              <div class="product-img-and-info-container">          
              <div class="product-img-container">
                <img class="product_img" src="${matchingProduct.image}">
              </div>
              <div class="product-info">
                <div class="product_name">${matchingProduct.name}</div>
                <div class="price">${matchingProduct.getPrice()}</div>
                <div>Quantity: <span class="quantity" data-product-quantity = "${cart_items.quantity}">${cart_items.quantity}</span> <span class="btn add-item" data-product-id="${matchingProduct.id}">Update</span><span class="btn delete-item" data-product-id="${matchingProduct.id}">Delete</span> </div>
              </div>
              </div>
              <div class="delivery-option">
                <div class="delivery_header">Choose a delivery date:</div>
                <div class="option-grid">
                ${deliveryOptionsHTML(matchingProduct, cart_items)}
                </div>
              </div>
            </div>
          </div>`;
  });
  
  document.querySelector('.cart-grid-item-container').innerHTML = cartHTML;

  renderPaymentSummary();

  function deliveryOptionsHTML(matchingProduct, cart_items) {
    let html = '';
    deliveryOptions.forEach((deliveryOption) => {
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
      const dateString = deliveryDate.format('dddd, MMMM D');
      const priceString = deliveryOption.price === 0 ? 'FREE' : `$${(formatCurrency(deliveryOption.price))} - `;
      const isChecked = deliveryOption.id === cart_items.deliveryOptionId;
      html += `<input class = "btn deliveryDatebtn" data-product-id = ${matchingProduct.id}  data-delivery-option-id = ${deliveryOption.id} type="radio" ${isChecked ? 'checked' : ''} name="${matchingProduct.id}-date">
                <label>
                  <div class="option day_date">${dateString}</div>
                  <div class="option shipping_charge">${priceString} Shipping</div>
                </label>
              `
    });
    return html;
  }


  let cartQuantity = CartquantityCount();
  document.querySelector('.cartquantity').innerHTML = `${cartQuantity} items`;

  document.querySelectorAll('.add-item').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      updateItemQuantity(productId);
      renderOrderPage();
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

  document.querySelectorAll('.deliveryDatebtn')
    .forEach((element) => {
      element.addEventListener('click', () => {
        const { productId, deliveryOptionId } = element.dataset;
        updateDeliveryOptions(productId, deliveryOptionId);
        renderOrderPage();
      });
    });
}

renderOrderPage();
renderPaymentSummary();