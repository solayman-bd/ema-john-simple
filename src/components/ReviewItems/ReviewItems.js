import React from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./ReviewItems.css";

const ReviewItems = (props) => {
  const { name, quantity, img, key, price } = props.product;
  const removeProduct = props.removeProduct;
  return (
    <div className="my-2 mx-4  p-3 ">
      <div className="item-div">
        <h6 className="text-info">{name}</h6>
        <img src={img} alt="" />
        <p class="lead">Quantity: {quantity}</p>
        <p class="lead">
          <p>
            <small>Price: {price}</small>
          </p>
          <button
            onClick={() => removeProduct(key)}
            className="btn btn-primary"
          >
            {" "}
            Remove
          </button>
        </p>
      </div>
    </div>
  );
};

export default ReviewItems;
