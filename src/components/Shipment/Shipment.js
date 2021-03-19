import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../App";
import "./Shipment.css";

const Shipment = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => console.log(data);
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
