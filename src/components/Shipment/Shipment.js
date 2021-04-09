import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../App";
import { getDatabaseCart, processOrder } from "../../utilities/databaseManager";
import ProccessPayment from "../ProcessPayment/ProccessPayment";
import "./Shipment.css";

const Shipment = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => {
    setShippingData(data);
  };
  const [shippingData, setShippingData] = useState(null);

  const handlePaymentSuccess = (paymentId) => {
    console.log(shippingData);
    const savedCart = getDatabaseCart();
    const orderDetails = {
      ...loggedInUser,
      products: savedCart,
      shipment: shippingData,
      paymentId,
      orderTime: new Date(),
    };

    fetch(`http://localhost:4000/addOrders`, {
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
    <div className="row">
      <div
        style={{ display: shippingData ? "none" : "block" }}
        className="col-md-6 col-sm-12"
      >
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
          {errors.email && (
            <span className="error">This field is required</span>
          )}
          <br />
          <input
            name="address"
            ref={register({ required: true })}
            placeholder="Address"
          />
          {/* errors will return when field validation fails  */}
          {errors.address && (
            <span className="error">This field is required</span>
          )}
          <br />

          <input type="submit" />
        </form>
      </div>
      <div
        style={{ display: shippingData ? "block" : "none" }}
        className="col-md-6 col-sm-12"
      >
        <h1>Process Your Payment</h1>
        <ProccessPayment handlePayment={handlePaymentSuccess}></ProccessPayment>
      </div>
    </div>
  );
};

export default Shipment;
