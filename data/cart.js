export let cart = JSON.parse(localStorage.getItem('cart'));
if (!cart) {
  cart = [{
    id: "1c079479-8586-494f-ab53-219325432536",
    quantity: 1,
  }, {
    id: "4df68c27-fd59-4a6a-bbd1-e754ddb6d53c",
    quantity: 1,
  }];
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
};

export function addToCart(productId) {
  let matchingitem = null;

  cart.forEach((cartitem) => {
    if (productId === cartitem.id) {
      matchingitem = cartitem;
    }
  });

  if (matchingitem) {
    matchingitem.quantity += 1;
    console.log(matchingitem.id);
  }
  else {
    cart.push({
      id: productId,
      quantity: 1
    });
  }

  let cartQuantity = CartquantityCount();
  document.querySelector('.count').innerHTML = cartQuantity;

  saveToStorage();
}

export function updateItemQuantity(productId){
  cart.forEach((cart_item)=>{
    if(productId === cart_item.id){
      cart_item.quantity++;
    };
  });
  saveToStorage();
};

export function removeFromCart(productId) {
  const newcart = [];
  cart.forEach((cartItem) => {
    if (cartItem.id != productId) {
      newcart.push(cartItem);
    }
  });
  cart = newcart;
  saveToStorage();
}

export function CartquantityCount() {
  let cartQuantity = 0;
  cart.forEach(() => {
    cartQuantity += 1;
  });
  return cartQuantity;
};