import React from "react";

const Cart = (props) => {
  const cart = props.cart;

  let totalPrice = 0;
  let totalTax = 0;
  let totalShipping = 0;
  for (let i = 0; i < cart.length; i++) {
    const product = cart[i];
    totalPrice = totalPrice + product.price;
    totalShipping = totalShipping + product.shipping;
  }
  totalTax = (totalTax + totalPrice * 0.1).toFixed(2);
  return (
    <div>
      <h3>Order Summery</h3>
      <h4>Items Ordered : {cart.length}</h4>
      <h4>Tax 10% : {totalTax}</h4>
      <h4>Shipping Charge: {Math.round(totalShipping)}</h4>
      <h4>Total Price : {totalPrice.toFixed(2)}</h4>
    </div>
  );
};

export default Cart;
