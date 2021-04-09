import React, { useContext } from "react";
import "./Header.css";
import logo from "../../images/logo.png";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../App";

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  return (
    <div className="header">
      <img src={logo} alt="" />
      <nav>
        <Link to="/shop">Shop</Link>
        <Link to="/order-review">Order Review</Link>
        <Link to="/manage-inventory">Manage Inventory Here</Link>
        <button
          onClick={() => {
            setLoggedInUser({});
          }}
        >
          Sign Out
        </button>
      </nav>
    </div>
  );
};

export default Header;
