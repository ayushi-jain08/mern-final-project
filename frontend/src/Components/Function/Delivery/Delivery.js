import React from "react";
import {
  MdLocalShipping,
  MdLibraryAddCheck,
  MdAccountBalance,
} from "react-icons/md";
import "./Delivery.css";

const Delivery = ({ step, steps }) => {
  return (
    <>
      <div className="icons-shipping">
        <div className="all-icons-flex">
          <div>
            <span style={{ color: step === 1 ? "orangered" : "black" }}>
              <MdLocalShipping />
            </span>
            <p>Shipping Details</p>
          </div>
          <span
            className="first"
            style={{ background: step === 1 ? "orangered" : "black" }}
          ></span>
          <div>
            <span style={{ color: step === 1 ? "orangered" : "black" }}>
              <MdLibraryAddCheck />
            </span>
            <p>Confirm Order</p>
          </div>
          <span
            className="second"
            style={{ background: steps === 2 ? "orangered" : "black" }}
          ></span>
          <div>
            <span style={{ color: steps === 2 ? "orangered" : "black" }}>
              <MdAccountBalance />
            </span>
            <p>Payment</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Delivery;
