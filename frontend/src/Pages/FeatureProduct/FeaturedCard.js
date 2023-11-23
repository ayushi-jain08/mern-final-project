import React from "react";
import purse from "../../Images/purse.jpg";
import { FaHeart } from "react-icons/fa6";

const FeaturedCard = ({ item }) => {
  return (
    <>
      <div className="featured-card">
        <img src={item.images[0].url} alt="product img" />
        <div className="featured-content">
          <h4>{item.name}</h4>
          <p>{item.brand}</p>
        </div>
        <button className="add-to-wishlist">
          <FaHeart />
        </button>
      </div>
    </>
  );
};

export default FeaturedCard;
