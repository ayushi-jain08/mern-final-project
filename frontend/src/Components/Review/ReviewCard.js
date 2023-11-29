import React from "react";
import RenderStars from "../Function/RenderStars";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { fetchDeleteReview, fetchGetReview } from "../../Redux/Slices/Product";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { FaUserCircle } from "react-icons/fa";

const ReviewCard = ({ item, ids }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);
  const { currentUser } = users;

  const storedUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
  const formattedDate = new Date(item.createdAt).toLocaleDateString();

  const handleDeleteReview = async (reviewId) => {
    await dispatch(fetchDeleteReview(reviewId));
    await dispatch(fetchGetReview(ids));
    toast.warning("Your review is deleted successfully");
  };

  return (
    <div className="review-card">
      {item?.userId?.pic ? (
        <img src={item.userId.pic.url} alt="user img" />
      ) : (
        <FaUserCircle />
      )}
      <h4>{item.userId.name}</h4>
      <span>posted on {formattedDate}</span>
      <div className="star">{RenderStars(item.rating)}</div>
      <p>{item.comment}</p>
      {storedUserInfo &&
        currentUser &&
        currentUser.otherDeatils._id === item.userId._id && (
          <div className="review-btn-group">
            <button onClick={() => handleDeleteReview(item._id)}>
              <MdDelete />
            </button>
          </div>
        )}
    </div>
  );
};

export default ReviewCard;
