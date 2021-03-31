import React from "react";
import fakeData from "../../fakeData";

const ManageInventory = () => {
  const handleAddProducts = () => {
    const product = {};
    fetch(`https://peaceful-plains-09302.herokuapp.com/addProducts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((result) => console.log(result));
  };
  return (
    <div>
      <h1>I am from ManageInventory</h1>
      <h1>Add products:</h1>

      <form action="">
        <p>
          <span>Name:</span>
          <input type="text" />
        </p>
        <p>
          <span>Price</span>
          <input type="text" />
        </p>
        <p>
          <span>Quantity</span>
          <input type="text" />
        </p>
        <p>
          <span>Upload Image:</span>
          <input type="file" />
        </p>
        <button onClick={handleAddProducts}>Add Products</button>
      </form>
    </div>
  );
};

export default ManageInventory;
