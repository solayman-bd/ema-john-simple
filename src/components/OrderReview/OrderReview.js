import React, { useEffect, useState } from "react";
import fakeData from "../../fakeData";
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

    const cartProducts = productKeys.map((key) => {
      const product = fakeData.find((pd) => pd.key === key);
      product.quantity = savedData[key];
      return product;
    });

    setCart(cartProducts);
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
