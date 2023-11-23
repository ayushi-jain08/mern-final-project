import React from "react";
import "./Review.css";
import ReviewCard from "./ReviewCard";
import RenderStars from "../Function/RenderStars";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";

const Review = ({ allReview, ratings, ids }) => {
  const products = useSelector((state) => state.product);
  const { loading } = products;
  return (
    <>
      <div className="review-container">
        <div className="heading">
          <span></span>
          <h2>Customer Reviews</h2>
          <span></span>
        </div>
        <div className="overall-ratings">
          <div className="stars">{RenderStars(ratings)}</div>
          <p>Based on {allReview?.length} reviews</p>
        </div>
        <div className="all-review">
          {loading ? (
            <div
              style={{
                position: "relative",
                left: "50%",
                marginTop: "50px",
              }}
            >
              <CircularProgress />
            </div>
          ) : (
            allReview?.map((item, i) => (
              <ReviewCard item={item} key={i} ids={ids} />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Review;
