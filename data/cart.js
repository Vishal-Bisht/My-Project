export let cart = JSON.parse(localStorage.getItem('cart'));
if(!cart){
  cart = [{
    id: "1c079479-8586-494f-ab53-219325432536",
    quantity: 1,
},{
    id: "4df68c27-fd59-4a6a-bbd1-e754ddb6d53c",
    quantity: 1,
}];
}

function saveToStorage() {
  localStorage.setItem('cart',JSON.stringify(cart));
};

export function addToCart(productId){
  let matchingitem = null;
  
  cart.forEach((cartitem) => {
    if (productId === cartitem.ProductId) {
      matchingitem = cartitem;
    }
  });

        if (matchingitem) {
          matchingitem.quantity+= 1;
        }
        else {
          cart.push({
            id: productId,
            quantity: 1
          });
        }
        saveToStorage();
}

export function updateCartQuantity(){
        let cartQuantity = 0;
        cart.forEach((cartitem)=>{
          cartQuantity += cartitem.quantity;
        });

        document.querySelector(".count").innerHTML = cartQuantity;
}

export function removeFromCart(productId) {
  const newcart = [];
  cart.forEach((cartItem) =>{
    if(cartItem.ProductId != productId){
      newcart.push(cartItem);
    }
  });
  cart = newcart;
  saveToStorage();
}