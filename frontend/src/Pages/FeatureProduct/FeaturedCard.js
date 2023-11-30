import React from "react";
import { FaHeart } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const FeaturedCard = ({ item }) => {
  return (
    <>
      <div className="featured-card">
        <img src={item.images[0].url} alt="product img" />
        <div className="featured-content">
          <NavLink to={`/product/${item._id}`}>
            <h4>{item.name}</h4>
            <p>{item.brand}</p>
          </NavLink>
        </div>
        <button className="add-to-wishlist">
          <FaHeart />
        </button>
      </div>
    </>
  );
};

export default FeaturedCard;
