import React, { useEffect, useState } from "react";
import "./SingleProduct.css";
import { useNavigate, useParams } from "react-router-dom";
import ImageSlider from "./ImageSlider";
import { useDispatch, useSelector } from "react-redux";
import Accordions from "./Accordions";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import RenderStars from "../Function/RenderStars";
import {
  AddToCart,
  AddToWishList,
  fetchCartProduct,
  fetchGetReview,
  fetchRelatedProduct,
  fetchSingleProduct,
} from "../../Redux/Slices/Product";
import CircularProgress from "@mui/material/CircularProgress";
import PostReview from "../Review/PostReview";
import Review from "../Review/Review";
import RelatedProduct from "../RelatedProduct/RelatedProduct";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaHeart } from "react-icons/fa";
import { fetchUserData } from "../../Redux/Slices/User";

const SingleProduct = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();
  const { ids } = useParams();

  const productInfo = useSelector((state) => state.product);
  const { singleProduct, loading, allReview, relatedProduct } = productInfo;
  const {
    _id,
    name,
    desc,
    images,
    mrp,
    cost,
    category,
    brand,
    ratings,
    discount,
    stock,
  } = singleProduct;
  const [scrollPosition, setScrollPosition] = useState(0);
  const users = useSelector((state) => state.user);
  const { currentUser, UserAllDetails } = users;
  const storedUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
  // ====================SCROLL POSITION====================

  useEffect(() => {
    const fetchData = async () => {
      if (ids && ids !== "") {
        await dispatch(fetchSingleProduct(ids));
        await dispatch(fetchGetReview(ids));
        await dispatch(fetchRelatedProduct(ids));
      }
    };
    fetchData();
  }, [ids, dispatch]);

  useEffect(() => {
    if (storedUserInfo || currentUser) {
      dispatch(fetchUserData());
    }
    // eslint-disable-next-line
  }, [dispatch]);

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };
  const decrement = () => {
    if (count > 1) {
      setCount((prevCount) => prevCount - 1);
    }
  };

  const handleAddToCart = async () => {
    if (!currentUser || !storedUserInfo) {
      toast.warning("Please log in to add items to your cart.");
      return;
    }
    await dispatch(AddToCart({ productId: _id, quantity: count }));
    await dispatch(fetchCartProduct());
    await dispatch(fetchUserData());
    toast.success("Item successfully added to cart");
  };

  const handleWishList = async (productId) => {
    if (!storedUserInfo) {
      toast.warning("Please log in to add items to your wishlist.");
      return;
    }
    await dispatch(AddToWishList(productId));
    await dispatch(fetchUserData());
  };

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const wishlistProductIds = UserAllDetails?.wishlist?.map(
    (wishlistItem) => wishlistItem.product
  );
  const isAddedToWishlist = wishlistProductIds?.includes(_id);
  const headerStyle = {
    backgroundColor:
      scrollPosition > 100 ? "rgb(241, 240, 240)" : "rgb(241, 240, 240)",
    transition: "background-color 0.3s ease",
  };
  const handleCheckOut = () => {
    const productData = {
      product: singleProduct,
      quantity: count,
      subtotal: count * singleProduct.cost,
    };
    const productArray = [productData];
    sessionStorage.setItem("orderProduct", JSON.stringify(productArray));
    navigate("/shipping");
  };
  return (
    <>
      <div className="single-product" style={headerStyle}>
        <div className="sub-single">
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
            <>
              {" "}
              <div className="left">
                <ImageSlider images={images} />
              </div>
              <div className="right">
                <div>
                  <div className="content">
                    <h2>{name}</h2>
                    <div className="price">
                      <span>
                        Rs.{cost} <strike>{mrp}</strike>
                      </span>
                      <p>{discount} Off</p>
                    </div>

                    <div className="icons">
                      <div className="star">{RenderStars(ratings)}</div>
                      <div className="rating"> 5 Review</div>
                    </div>
                    <div className="four-content">
                      <p className="brand">
                        <b
                          style={{
                            color: "black",
                            fontFamily: "Neuton",
                            fontWeight: 700,
                          }}
                        >
                          Brand
                        </b>{" "}
                        : {brand}
                      </p>
                      <p className="cat">
                        {" "}
                        <b
                          style={{
                            color: "black",
                            fontFamily: "Neuton",
                            fontWeight: 700,
                          }}
                        >
                          Category
                        </b>{" "}
                        : {category}
                      </p>
                      <p className="desc">
                        {" "}
                        <b
                          style={{
                            color: "black",
                            fontFamily: "Neuton",
                            fontWeight: 700,
                          }}
                        >
                          Description
                        </b>{" "}
                        : {desc}
                      </p>
                      <p className="stock">
                        <b
                          style={{
                            color: "black",
                            fontFamily: "Neuton",
                            fontWeight: 700,
                          }}
                        >
                          Availibility
                        </b>{" "}
                        : {stock}
                        in Stock
                      </p>
                    </div>
                    <div className="qty">
                      <span>
                        <strong>Qunatity : </strong>
                      </span>
                      <span onClick={increment}>
                        <FaCirclePlus />
                      </span>
                      <p>{count}</p>
                      <span onClick={decrement}>
                        <FaCircleMinus />
                      </span>
                    </div>
                  </div>
                  <div className="lower-content">
                    <span className="heart" onClick={() => handleWishList(_id)}>
                      {isAddedToWishlist ? (
                        <>
                          <FaHeart className="red" />
                          <p>Remove from wishlist</p>
                        </>
                      ) : (
                        <>
                          <FaHeart className="white" />
                          <p>Add to wishlist</p>
                        </>
                      )}
                    </span>
                    <div className="two-btn">
                      <button className="add" onClick={handleAddToCart}>
                        Add To Cart
                      </button>
                      <button className="buy" onClick={handleCheckOut}>
                        Buy It Now
                      </button>
                    </div>
                  </div>
                  <div className="accor">
                    <Accordions />
                  </div>
                  <div className="post-review">
                    <PostReview productId={_id} />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="review">
          {allReview && allReview.length > 0 ? (
            <Review allReview={allReview} ids={ids} ratings={ratings} />
          ) : (
            <p>No Review Yet</p>
          )}
        </div>
      </div>
      {relatedProduct.length > 0 && (
        <div className="related-product">
          <RelatedProduct product={relatedProduct} />
        </div>
      )}
    </>
  );
};

export default SingleProduct;
