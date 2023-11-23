import React from "react";
import { NavLink } from "react-router-dom";
import RenderStars from "../Function/RenderStars";

const ProductCard = ({ item }) => {
  const handleAddToWishList = async () => {};

  return (
    <div className="product-card" key={item._id}>
      <div className="img">
        <img src={item.images[0].url} alt="product img" />
      </div>
      <div className="details">
        <span className="head">{item.name}</span>
        <NavLink to={`/product/${item._id}`}>
          <p className="desc">{item.desc.slice(0, 65)}...</p>
        </NavLink>
        <div className="stars">{RenderStars(item.ratings)}</div>
        <p className="price">
          <strong style={{ color: "red" }}>Rs.{item.cost} </strong>{" "}
          <strike style={{ color: "rgb(186, 179, 179)" }}>{item.mrp}</strike>
        </p>
      </div>
      <div className="wishlist" onClick={() => handleAddToWishList(item._id)}>
        {/* {isAddedToWishlist ? (
            <FaHeart className="red" />
          ) : (
            <FaHeart className="white" />
          )} */}
      </div>
    </div>
  );
};

export default ProductCard;
