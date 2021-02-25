import React, { useState } from "react";
import "./Shop.css";
import fakeData from "../../fakeData";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";

const Shop = () => {
  const first10 = fakeData.slice(0, 10);
  const [products, setProducts] = useState(first10);
  const [cart, setCart] = useState([]);
  const handleClick = (product) => {
    const newCart = [...cart, product];
    setCart(newCart);
  };
  return (
    <div className="shop-container">
      <div className="products-container">
        {products.map((pd) => (
          <Product product={pd} handleClick={handleClick}></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}></Cart>
      </div>
    </div>
  );
};

export default Shop;
