import { addToCart, cart, loadFromStorage } from "../../data/cart.js";
import { loadProducts } from "../../data/products.js";

describe('test suit: addToCart', () => {

  beforAll((done)=>{
    loadProducts(()=>{
      done();
    });
  });

  it('adds an existing product to the cart', ()=>{
    spyOn(localStorage,'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionsId: '1'
      }]);
    });
    loadFromStorage();
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
    expect(cart[0].quantity).toEqual(2);
  });

  it('adds a new product to the cart', () => {
    spyOn(localStorage,'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });

    loadFromStorage();
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
    expect(cart[0].quantity).toEqual(1);
  });
});