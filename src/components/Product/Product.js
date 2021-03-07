import React from "react";
import "./Product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Product = (props) => {
  const { img, name, seller, price, stock, key } = props.product;
  return (
    <div className="single-product">
      <div>
        <img className="product-image" src={img} alt="" />
      </div>
      <div>
        <h5 className="product-name">
          {" "}
          <Link to={"/product/" + key}>{name}</Link>
        </h5>
        <br />
        <p>
          <small>by: {seller}</small>
        </p>
        <p>
          <small>${price}</small>
        </p>
        <p>
          <small>Only {stock} left in stock. Order soon</small>
        </p>
        {props.showAddToCart && (
          <button
            onClick={() => props.handleClick(props.product)}
            className="product-button"
          >
            <FontAwesomeIcon icon={faShoppingCart} />
            add to cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Product;
