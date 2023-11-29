import React from "react";
import { MdRemoveShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div className="empty">
      <span>
        <MdRemoveShoppingCart />
      </span>
      <p>No Product in Your Cart</p>
      <Link to="/product">
        <button>View products</button>
      </Link>
    </div>
  );
};

export default EmptyCart;
