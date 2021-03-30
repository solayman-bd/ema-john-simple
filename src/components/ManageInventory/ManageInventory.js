import React from "react";
import fakeData from "../../fakeData";

const ManageInventory = () => {
  const handleAddProducts = () => {
    fetch(`http://localhost:4000/addProducts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fakeData),
    })
      .then((res) => res.json())
      .then((result) => console.log(result));
  };
  return (
    <div>
      <h1>I am from ManageInventory</h1>
      <h1>Add products:</h1>

      <button onClick={handleAddProducts}>Add Products</button>
    </div>
  );
};

export default ManageInventory;
