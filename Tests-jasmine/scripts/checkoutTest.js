import {renderOrderPage} from '../../scripts/checkout.js';
import { loadFromStorage } from "../../data/cart.js";

describe('test suit: rederOrderPage', ()=>{
  it('displays the cart', ()=>{
    document.querySelector('.cart-grid-item-container').innerHTML = `
    <div class = "cart-grid-item-container"></div>
    `;

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        id: "1c079479-8586-494f-ab53-219325432536",
        quantity: 1,
        deliveryOptionId: '1'
      }, {
        id: "4df68c27-fd59-4a6a-bbd1-e754ddb6d53c",
        quantity: 1,
        deliveryOptionId: '2'
      }]);
    });
    loadFromStorage();

    renderOrderPage();

    expect(document.querySelectorAll('.cart-grid-item-container').length).toEqual(3);
  });
});