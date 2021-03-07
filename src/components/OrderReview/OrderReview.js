import React, { useEffect, useState } from "react";
import fakeData from "../../fakeData";
import {
  getDatabaseCart,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import ReviewItems from "../ReviewItems/ReviewItems";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./OrderReview.css";

const OrderReview = () => {
  const [cart, setCart] = useState([]);
  const handleRemoveProduct = (pdKey) => {
    const newCart = cart.filter((pd) => pd.key !== pdKey);
    setCart(newCart);
    removeFromDatabaseCart(pdKey);
  };
  useEffect(() => {
    const savedData = getDatabaseCart();
    const productKeys = Object.keys(savedData);

    const cartProducts = productKeys.map((key) => {
      const product = fakeData.find((pd) => pd.key === key);
      product.quantity = savedData[key];
      return product;
    });

    setCart(cartProducts);
  }, []);
  return (
    <div className="d-flex">
      <div className="review-div">
        <div>
          {" "}
          {cart.map((pd) => (
            <ReviewItems
              removeProduct={handleRemoveProduct}
              key={pd.key}
              product={pd}
            ></ReviewItems>
          ))}
        </div>
      </div>
      <div className="ml-2">
        <Cart cart={cart}>
          <button className="btn btn-warning">Place Order</button>
        </Cart>
      </div>
    </div>
  );
};

export default OrderReview;
