import React, { useEffect, useState } from "react";
import "./Shop.css";

import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import {
  addToDatabaseCart,
  getDatabaseCart,
} from "../../utilities/databaseManager";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
const Shop = () => {
  useEffect(() => {
    fetch(`https://peaceful-plains-09302.herokuapp.com/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  // const first10 = fakeData.slice(0, 10);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedData = getDatabaseCart();
    const productKeys = Object.keys(savedData);
    fetch(`https://peaceful-plains-09302.herokuapp.com/productsByKeys`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productKeys),
    })
      .then((res) => res.json())
      .then((data) => setCart(data));
  }, []);
  const handleClick = (product) => {
    const toBeAdded = product.key;
    const sameProduct = cart.find((pd) => pd.key === toBeAdded);
    let count = 1;
    let newCart;
    if (sameProduct) {
      count = sameProduct.quantity + 1;
      sameProduct.quantity = count;
      const other = cart.filter((pd) => pd.key !== toBeAdded);
      newCart = [...other, sameProduct];
    } else {
      product.quantity = 1;
      newCart = [...cart, product];
    }
    setCart(newCart);
    addToDatabaseCart(product.key, count);
  };

  return (
    <div className="shop-container">
      <div className="products-container">
        {products.map((pd) => (
          <Product
            showAddToCart={true}
            product={pd}
            key={pd.key}
            handleClick={handleClick}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <Link to="/order-review">
            <Button className="mt-2" variant="warning">
              Review Now
            </Button>{" "}
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
