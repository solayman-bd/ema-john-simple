import React from "react";
import "./Header.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="header">
      <img src={logo} alt="" />
      <nav>
        <Link href="/shop">Shop</Link>
        <Link To="/order-review">Order Review</Link>
        <Link To="/manage-inventory">Manage Inventory Here</Link>
      </nav>
    </div>
  );
};

export default Header;
