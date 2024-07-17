export let cart = [{
  ProductId: '8b5a2ee1-6055-422a-a666-b34ba28b76d4',
  quantity: 1,
},{
  ProductId: '1c079479-8586-494f-ab53-219325432536',
  quantity: 1,
}];

export function removeFromCart(productId) {
  const newcart = [];
  cart.forEach((cartItem) =>{
    if(cartItem.ProductId != productId){
      newcart.push(cartItem);
    }
  });
  cart = newcart;
}

export function updateCartQuantity(productId) {
  cart.forEach((cartItem) =>{
    if(cartItem.ProductId === productId){
      cart.quantity+=1;
    }
  });
}