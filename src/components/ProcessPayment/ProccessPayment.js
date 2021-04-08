import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement } from "@stripe/react-stripe-js";
import SimpleCardForm from "./SimpleCardFrom";
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");
const ProccessPayment = ({ handlePayment }) => {
  return (
    <Elements stripe={stripePromise}>
      <SimpleCardForm handlePayment={handlePayment}></SimpleCardForm>
    </Elements>
  );
};

export default ProccessPayment;
