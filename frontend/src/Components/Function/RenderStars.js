import "./RenderStars.css";
import React from "react";
import { FaStar, FaStarHalfStroke } from "react-icons/fa6";

const RenderStars = (rating) => {
  const ratings = rating || 0;
  const fullStars = Math.floor(rating);
  const decimalStar = ratings - fullStars;

  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      // Full star
      stars.push(
        <span key={i}>
          <FaStar className="filled-star" />
        </span>
      );
    } else if (i === fullStars + 1 && decimalStar > 0) {
      // Partial star
      stars.push(
        <span key={i}>
          <FaStarHalfStroke
            className="partial-star"
            style={{ fontSize: "18px" }}
          />
        </span>
      );
    } else {
      // Empty star
      stars.push(
        <span key={i}>
          <FaStar className="empty-star" />
        </span>
      );
    }
  }
  return stars;
};

export default RenderStars;
