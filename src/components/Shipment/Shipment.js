import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../App";
import { getDatabaseCart, processOrder } from "../../utilities/databaseManager";
import "./Shipment.css";

const Shipment = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const savedCart = getDatabaseCart();
    const orderDetails = {
      ...loggedInUser,
      products: savedCart,
      shipment: data,
      orderTime: new Date(),
    };

    fetch(`https://peaceful-plains-09302.herokuapp.com/addOrders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          alert("Your order placed successfully");
          processOrder();
        }
      });
  };
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  return (
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
      {/* include validation with required or other standard HTML validation rules */}
      <input
        name="name"
        defaultValue={loggedInUser.displayName}
        ref={register({ required: true })}
        placeholder="Name"
      />
      <br />
      {/* errors will return when field validation fails  */}
      {errors.name && <span>This field is required</span>}
      <input
        name="email"
        defaultValue={loggedInUser.email}
        ref={register({ required: true })}
        placeholder="email"
      />
      {/* errors will return when field validation fails  */}
      {errors.email && <span className="error">This field is required</span>}
      <br />
      <input
        name="address"
        ref={register({ required: true })}
        placeholder="Address"
      />
      {/* errors will return when field validation fails  */}
      {errors.address && <span className="error">This field is required</span>}
      <br />

      <input type="submit" />
    </form>
  );
};

export default Shipment;
