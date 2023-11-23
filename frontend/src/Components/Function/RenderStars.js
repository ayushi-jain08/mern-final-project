import "./RenderStars.css";
import React from "react";
import { IoStar, IoStarHalf } from "react-icons/io5";

const RenderStars = (rating) => {
  const ratings = rating || 0;
  const fullStars = Math.floor(rating);
  const decimalStar = ratings - fullStars;
  console.log("dd", decimalStar);
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      // Full star
      stars.push(
        <span key={i}>
          <IoStar className="filled-star" />
        </span>
      );
    } else if (i === fullStars + 1 && decimalStar > 0) {
      // Partial star
      stars.push(
        <span key={i}>
          <IoStarHalf className="partial-star" />
        </span>
      );
    } else {
      // Empty star
      stars.push(
        <span key={i}>
          <IoStar className="empty-star" />
        </span>
      );
    }
  }
  return stars;
};

export default RenderStars;
