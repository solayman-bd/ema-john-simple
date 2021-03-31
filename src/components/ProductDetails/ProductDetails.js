import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Product from "../Product/Product";
const ProductDetails = () => {
  const { productKey } = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    fetch(`https://peaceful-plains-09302.herokuapp.com/product/${productKey}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [productKey]);

  console.log(product);

  return (
    <div>
      <h1>{productKey} details is coming sooooon!!</h1>
      <Product showAddToCart={false} product={product}></Product>
    </div>
  );
};

export default ProductDetails;
