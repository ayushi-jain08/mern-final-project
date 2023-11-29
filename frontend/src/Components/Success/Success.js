import React from "react";
import { TiTick } from "react-icons/ti";
import { NavLink } from "react-router-dom";
import "./Success.css";

const Success = () => {
  return (
    <>
      <div className="success-order">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="order-placed">
            <div className="tick">
              <TiTick />
            </div>
            <h2>Your Order has been Placed successfully</h2>
          </div>
        </div>
        <NavLink to="/orders">
          <button className="order-success-btn">View Orders</button>
        </NavLink>
      </div>
    </>
  );
};

export default Success;
