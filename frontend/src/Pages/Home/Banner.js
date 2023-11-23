import React from "react";
import "./Home.css";
import girl from "../../Images/curly.png";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <>
      <div className="banner">
        <div className="left">
          <span>Get up to 30% Off</span>
          <p>New Arrivals</p>
          <Link>
            <button className="shop-now">Shop Now</button>
          </Link>
        </div>
        <div className="right">
          <img src={girl} alt="" />
        </div>
      </div>
    </>
  );
};

export default Banner;
