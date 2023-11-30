import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import RenderStars from "../Function/RenderStars";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../Redux/Slices/User";
import { AddToWishList } from "../../Redux/Slices/Product";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductCard = ({ item }) => {
  const users = useSelector((state) => state.user);
  const { UserAllDetails, currentUser } = users;
  const dispatch = useDispatch();
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
      <div className="product-card" key={item._id}>
        <div className="img">
          <img src={item.images[0].url} alt="product img" />
        </div>
        <div className="details">
          <span className="head">{item.name}</span>
          <NavLink to={`/product/${item._id}`}>
            <p className="desc">{item.desc.slice(0, 60)}...</p>
          </NavLink>
          <div className="stars">{RenderStars(item.ratings)}</div>
          <p className="price">
            <strong style={{ color: "red" }}>Rs.{item.cost} </strong>{" "}
            <strike style={{ color: "rgb(186, 179, 179)" }}>{item.mrp}</strike>
          </p>
        </div>
        <div className="wishlist" onClick={() => handleAddToWishList(item._id)}>
          {isAddedToWishlist ? (
            <FaHeart className="red" />
          ) : (
            <FaHeart className="white" />
          )}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
