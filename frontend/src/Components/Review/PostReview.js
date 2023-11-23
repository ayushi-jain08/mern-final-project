import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "./Review.css";
import { fetchGetReview, fetchPostReview } from "../../Redux/Slices/Product";
import { useLocation, useNavigate } from "react-router-dom";

const PostReview = ({ productId, path = "loginsignup" }) => {
  const location = useLocation();
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!rating || !comment) {
      toast.warning("please write something");
    } else {
      const storedUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
      if (storedUserInfo) {
        await dispatch(fetchPostReview({ productId, rating, comment }));
        await dispatch(fetchGetReview(productId));
        toast.dark("your review uploaded successfully");
        setRating("");
        setComment("");
      } else {
        navigate(`/${path}`, {
          state: location.pathname,
        });
      }
    }
  };
  return (
    <>
      <div>
        <h1>Add Review Here</h1>
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <input
              type="text"
              placeholder="rating"
              max="5"
              name="rating"
              value={rating}
              required
              onChange={(e) => setRating(e.target.value)}
            />
            <textarea
              name="comment"
              id="comment"
              placeholder="your comment..."
              value={comment}
              required
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>
          <button className="btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default PostReview;
