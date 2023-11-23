import React from "react";
import { FaHeart } from "react-icons/fa6";
import RenderStars from "../../Components/Function/RenderStars";

const TopCollectionCard = ({ item }) => {
  return (
    <>
      <div className="collection-card">
        <img src={item?.images[0]?.url} alt="Product img" />
        <div className="featured-content">
          <h4>{item?.desc.slice(0, 50)}...</h4>
          <div className="icons">
            <button className="price">Rs.{item?.cost}</button>
            <div className="star">{RenderStars(item.ratings)}</div>
          </div>
        </div>
        <button className="add-to-wishlist">
          <FaHeart />
        </button>
      </div>
    </>
  );
};

export default TopCollectionCard;
