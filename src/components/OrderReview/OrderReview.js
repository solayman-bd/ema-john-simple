import React, { useEffect, useState } from "react";

import {
  getDatabaseCart,
  processOrder,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import ReviewItems from "../ReviewItems/ReviewItems";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./OrderReview.css";
import greeting from "../../images/giphy.gif";
import { useHistory } from "react-router";

const OrderReview = () => {
  const [cart, setCart] = useState([]);
  const handleRemoveProduct = (pdKey) => {
    const newCart = cart.filter((pd) => pd.key !== pdKey);
    setCart(newCart);
    removeFromDatabaseCart(pdKey);
  };
  const [greetingMessage, setGretingMessage] = useState(false);
  useEffect(() => {
    const savedData = getDatabaseCart();
    const productKeys = Object.keys(savedData);
    fetch(`http://localhost:4000/productsByKeys`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productKeys),
    })
      .then((res) => res.json())
      .then((data) => setCart(data));
  }, []);
  const history = useHistory();

  const proceedCheckOut = () => {
    history.push("/shipment");
  };
  let thankYou;
  if (greetingMessage) {
    thankYou = <img src={greeting} alt="" />;
  }
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
        {thankYou}
      </div>
      <div className="ml-2">
        <Cart cart={cart}>
          <button onClick={proceedCheckOut} className="btn btn-warning">
            Proceed to Checkout
          </button>
        </Cart>
      </div>
    </div>
  );
};

export default OrderReview;
