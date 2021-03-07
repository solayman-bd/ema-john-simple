import React from "react";

import "./Cart.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

const Cart = (props) => {
  const cart = props.cart;

  let totalPrice = 0;
  let totalTax = 0;
  let totalShipping = 0;
  for (let i = 0; i < cart.length; i++) {
    const product = cart[i];
    totalPrice = totalPrice + product.price * product.quantity;
    totalShipping = totalShipping + product.shipping;
  }
  totalTax = (totalTax + totalPrice * 0.1).toFixed(2);

  return (
    <div>
      <div className="main">
        <h3>Order Summery</h3>
        <h4>Items Ordered : {cart.length}</h4>
        <h4>Tax 10% : {totalTax}</h4>
        <h4>Shipping Charge: ${Math.round(totalShipping)}</h4>
        <h4>Total Price : ${totalPrice.toFixed(2)}</h4>
        {props.children}
      </div>
    </div>
  );
};

export default Cart;
