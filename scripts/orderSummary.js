import { cart, CartquantityCount } from '../data/cart.js';
import { getProduct } from '../data/products.js';
import { getDeliveryID } from '../data/deliveryOptions.js';
import { formatCurrency } from './utils/money.js';


export function renderPaymentSummary() {
  let productPrice = 0;
  let shippingPrice = 0;
  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.id);
    productPrice += product.price * cartItem.quantity;
    const deliveryOptions = getDeliveryID(cartItem.deliveryOptionId);
    shippingPrice += deliveryOptions.price
  });

  const totalBeforTax = productPrice + shippingPrice;
  const tax = totalBeforTax * 0.1;
  const total = totalBeforTax + tax;

  const total_items = CartquantityCount();
  const cartHTML = `<div class="order-summary-container">
          <div class="summary_header">Order Summary</div>
          <div class="order-summary-grid">
          <div class="order-total-charges">
            <div class="charges items total_cart_items">
              Items (${total_items}):
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
              $${formatCurrency(productPrice)}
            </div>
            <div class="value Shipping">
              $${formatCurrency(shippingPrice)}
            </div>
            <div class="value Total">
              $${formatCurrency(totalBeforTax)}
            </div>
            <div class="value Tax">
              $${formatCurrency(tax)}
            </div>
          </div>
          </div>
          <div class="total-and-payment">
            <div class="order-total"><div>Order total:</div><div class="total-value">$${formatCurrency(total)}</div></div>
              <div class="payment-check">
                Use Paypal <input class = "btn btn payment_check" type="checkbox">
                <div class="btn-pyo-container">
                  <button class="btn pyo">Place your order</button>
                  </div>
                  </div>
                  </div>
                  </div>`;
  document.querySelector('.cart-grid-order-summary-container').innerHTML = cartHTML;
}