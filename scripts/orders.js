const order_head = [{
  date: 'july 2',
  total: '11.99',
  id: '26eod46-rg4ijg0df-dfgle53'
}];

const orders = [{
  image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
  name: 'Black and Grey Athletic Cotton Socks - 6 Pairs',
  delivery_date: 'July 2',
  quantity: 1
},{
  image: 'images/products/men-golf-polo-t-shirt-blue.jpg',
  name: "Men's Regular-Fit Quick Dry Golf Polo Shirt",
  delivery_date: 'july 3',
  quantity: 1
}];

let ordersHTML = `<div class="order_page_header">Your Orders</div>
      <div class="order-info">
        <div class="order_date">Order Placed: <div class="value">${order_head.date}</div>
        </div>
        <div class="total">Total: <div class="value">$${order_head.total}</div>
        </div>
        <div class="order_id">Order ID: <div class="value">${order_head.id}</div>
        </div>
      </div>`;

document.querySelector('.order-info-container').innerHTML = ordersHTML;

ordersHTML = ``;

orders.forEach((orders)=>{
    ordersHTML += `<div class="order-img-container"><img class="order_img" src="${orders.image}">
        </div>
        <div class="more_order-info">
          <div class="product_name">${orders.name}</div>
          <div class="delivery_time">Arriving on : ${orders.delivery_date}</div>
          <div class="quantity">Quantity: ${orders.quantity}</div>
          <div class="btn-buy-again-container">
            <button class="btn btn_buy_again">
              <div class="buy-again-img-container"> <img class="buy_again_img" src="images/icons/buy-again.png"></div>
              Buy it again
            </button>
          </div>
        </div>
        <div class="btn-track-order-container"><button class="btn btn_track_order">Track package</button>
        </div>`;
});

document.querySelector('.order-overview-container').innerHTML = ordersHTML;