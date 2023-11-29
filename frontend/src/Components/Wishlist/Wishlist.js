import React, { useEffect } from "react";
import "./Wishlist.css";
import { useDispatch, useSelector } from "react-redux";
import {
  AddToCart,
  AddToWishList,
  fetchWishListItem,
} from "../../Redux/Slices/Product";
import { Link, useLocation, useNavigate } from "react-router-dom";
import img1 from "../../Images/makeup.jpg";
import { MdDelete } from "react-icons/md";
import EmptyWishlist from "./EmptyWishlist";
import CircularProgress from "@mui/material/CircularProgress";

const Wishlist = ({ path = "loginsignup" }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlist = useSelector((state) => state.product);
  const { wishListProductInfo, loading } = wishlist;
  const storedUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));

  const handleAddToCart = async (productId, quantity) => {
    await dispatch(AddToCart({ productId, quantity }));
  };
  const handleRemove = async (productId) => {
    await dispatch(AddToWishList(productId));
    await dispatch(fetchWishListItem());
  };
  const fetchData = () => {
    if (!storedUserInfo) {
      navigate(`/${path}`, {
        state: location.pathname,
      });
    }
    dispatch(fetchWishListItem());
  };

  useEffect(() => {
    fetchData();
    dispatch(fetchWishListItem());
    // eslint-disable-next-line
  }, [dispatch]);
  return (
    <>
      <div className="wishlist-container">
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
        ) : wishListProductInfo?.length !== 0 ? (
          <>
            {" "}
            <div className="wishlist-banner">
              <div className="img">
                <img src={img1} alt="" />
              </div>
              <h1>My Wishlist</h1>
            </div>
            <div className="wishlist-main">
              <div className="wishlist-header">
                <h2 className="wishlist-product">Product</h2>
                <h2 className="price">price</h2>
                <h2 className="total">Add To Cart</h2>
                <h2 className="delete">delete</h2>
              </div>
              {wishListProductInfo.length !== 0 && (
                <div>
                  {" "}
                  {wishListProductInfo.map((item) => {
                    const { images, name, cost, _id } = item.product;
                    return (
                      <div className="content" key={_id}>
                        <div className="wishlist-product">
                          <img
                            src={images[0].url}
                            alt=""
                            width={70}
                            height={70}
                          />
                          <span className="details">
                            <Link to={`/product/${_id}`}>
                              <p>{name}</p>
                            </Link>
                          </span>
                        </div>
                        <div className="price">
                          <p style={{ fontWeight: 600, fontSize: "16px" }}>
                            ${cost}
                          </p>
                        </div>
                        <button
                          className="add-btn"
                          onClick={() => handleAddToCart(_id, 1)}
                        >
                          Add To Cart
                        </button>
                        <button
                          className="remove-btn"
                          onClick={() => handleRemove(_id)}
                        >
                          <MdDelete className="del" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        ) : (
          <EmptyWishlist />
        )}
      </div>
    </>
  );
};

export default Wishlist;
