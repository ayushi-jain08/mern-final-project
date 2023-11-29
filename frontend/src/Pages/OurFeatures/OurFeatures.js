import React from "react";
import "./OurFeature.css";
import { FaShippingFast, FaRegCreditCard } from "react-icons/fa";
import { FaGift } from "react-icons/fa6";
import { MdOutlineSupportAgent } from "react-icons/md";
import { BiSolidOffer } from "react-icons/bi";

const OurFeatures = () => {
  return (
    <>
      <div className="features">
        <div className="free-shipping flex">
          <span>
            <FaShippingFast className="icon" />
          </span>
          <div className="content">
            <p>Free shipping</p>
            <span>From all orders above $100 </span>
          </div>
        </div>
        <div className="offers flex">
          <span>
            <FaGift className="icon" />
          </span>
          <div className="content">
            <p>Daily Surprise Offers </p>
            <span>Save upto 25% off </span>
          </div>
        </div>
        <div className="support flex">
          <span>
            <MdOutlineSupportAgent className="icon" />
          </span>
          <div className="content">
            <p>Support 24/7</p>
            <span>Shop with an expert </span>
          </div>
        </div>
        <div className="prices flex">
          <span>
            <BiSolidOffer className="icon" />
          </span>
          <div className="content">
            <p>Affordable Prices</p>
            <span>Get Factory direct prices </span>
          </div>
        </div>
        <div className="secure flex">
          <span>
            <FaRegCreditCard className="icon" />
          </span>
          <div className="content">
            <p>Secure Payments</p>
            <span>100% Protected Payments</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurFeatures;
