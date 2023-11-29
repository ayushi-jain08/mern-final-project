import React from "react";
import { MdHeartBroken } from "react-icons/md";
import { Link } from "react-router-dom";

const EmptyWishlist = () => {
  return (
    <>
      <div className="empty-wishlist">
        <span>
          <MdHeartBroken />
        </span>
        <p>No Product in Your Wishlist </p>
        <Link to="/product">
          <button>View products</button>
        </Link>
      </div>
    </>
  );
};

export default EmptyWishlist;
