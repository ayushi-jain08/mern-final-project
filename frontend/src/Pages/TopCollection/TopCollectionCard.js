import React, { useEffect } from "react";
import { FaHeart } from "react-icons/fa6";
import RenderStars from "../../Components/Function/RenderStars";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../Redux/Slices/User";
import { AddToWishList } from "../../Redux/Slices/Product";
import { toast } from "react-toastify";
import { Link, NavLink } from "react-router-dom";

const TopCollectionCard = ({ item }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);
  const { UserAllDetails, currentUser } = users;
  const storedUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));

  useEffect(() => {
    if (storedUserInfo || currentUser) {
      dispatch(fetchUserData());
    }
    // eslint-disable-next-line
  }, [dispatch, UserAllDetails._id]);
  const wishlistProductIds = UserAllDetails?.wishlist?.map(
    (wishlistItem) => wishlistItem.product
  );
  const isAddedToWishlist = wishlistProductIds?.includes(item._id);
  const handleAddToWishList = async (productId) => {
    if (!storedUserInfo || !currentUser) {
      toast.warning("please login to add product in wishlist");
      return;
    }
    await dispatch(AddToWishList(productId));
    await dispatch(fetchUserData());
  };
  return (
    <>
      <div className="collection-card">
        <img src={item?.images[0]?.url} alt="Product img" />
        <div className="featured-content">
          <NavLink to={`/product/${item._id}`}>
            <h4>{item?.desc.slice(0, 50)}...</h4>
          </NavLink>
          <div className="icons">
            <button className="price">Rs.{item?.cost}</button>
            <div className="star">{RenderStars(item.ratings)}</div>
          </div>
        </div>
        <button
          className="add-to-wishlist"
          onClick={() => handleAddToWishList(item._id)}
        >
          {isAddedToWishlist ? (
            <FaHeart className="red" />
          ) : (
            <FaHeart className="white" />
          )}
        </button>
      </div>
    </>
  );
};

export default TopCollectionCard;
