import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  RemoveCartProduct,
  fetchCartProduct,
  fetchUpdateCartQty,
} from "../../Redux/Slices/Product";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import "./Cart.css";
import CircularProgress from "@mui/material/CircularProgress";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import EmptyCart from "./EmptyCart";

const Cart = ({ path = "loginsignup" }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.product);
  const { cartProductInfo, loading } = products;
  const StorageUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));

  //====================CHANGE QUANTITY OF PRODUCT==============//
  const handleQuantitychange = async (productId, operation) => {
    await dispatch(fetchUpdateCartQty({ productId, operation }));
    await dispatch(fetchCartProduct());
  };
  //===================DELETE FROM CART===================//
  const handleDelete = async (productId) => {
    await dispatch(RemoveCartProduct(productId));
    await dispatch(fetchCartProduct());
  };

  //======================FETCH CART PRODUCT==================//
  // const useMountEffect = (handler) => useEffect(handler, []);
  // useMountEffect(() => {
  //   if (!StorageUserInfo) {
  //     navigate(`/${path}`, {
  //       state: location.pathname,
  //     });
  //   }
  //   dispatch(fetchCartProduct());
  // });
  const fetchData = async () => {
    if (!StorageUserInfo) {
      navigate(`/${path}`, {
        state: location.pathname,
      });
    }
    dispatch(fetchCartProduct());
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [dispatch]);

  //========================SUBTOTAL====================//
  const totalSubtotal = cartProductInfo.reduce((accumulator, cartItem) => {
    const itemSubtotal = cartItem.product.cost * cartItem.quantity;
    return accumulator + itemSubtotal;
  }, 0);
  //=================CHECKOUT FUNCTION====================//
  const handleCheckOut = () => {};
  return (
    <>
      <div className="carts">
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
        ) : cartProductInfo.length !== 0 ? (
          <div className="sub-cart">
            <div className="header">
              <h2 className="product">Product</h2>
              <h2 className="price">price</h2>
              <h2 className="qty">quantity</h2>
              <h2 className="total">total</h2>
              <h2 className="delete">delete</h2>
            </div>

            {cartProductInfo.map((item) => {
              const { name, brand, cost, images, _id } = item.product;
              return (
                <div className="content" key={_id}>
                  <div className="product">
                    <img src={images[0]?.url} alt="product img" />
                    <div className="details">
                      <Link to={`/product/${_id}`}>
                        <p>{name}</p>
                      </Link>
                      <p>Size: S</p>
                      <p>Brand: {brand}</p>
                    </div>
                  </div>
                  <div className="price">
                    <p>${cost}</p>
                  </div>
                  <div className="qty">
                    <div className="item">
                      <span
                        onClick={() => handleQuantitychange(_id, "increase")}
                      >
                        <FaCirclePlus />
                      </span>
                      <p>{item.quantity}</p>
                      <span
                        onClick={() => handleQuantitychange(_id, "decrease")}
                      >
                        <FaCircleMinus />
                      </span>
                    </div>
                  </div>
                  <div className="total">
                    <p>${item.subtotal}</p>
                  </div>
                  <div className="delete">
                    <button onClick={() => handleDelete(_id)}>
                      <MdDelete className="del" />
                    </button>
                  </div>
                </div>
              );
            })}
            <div className="bottom">
              <NavLink to="/product">
                <button className="continue">Continue Shopping</button>
              </NavLink>
              <button className="clear">Clear Cart</button>
            </div>
            <div className="subtotal">
              <p style={{ float: "right", fontFamily: "Playfair Display" }}>
                Subtotal: ${totalSubtotal}
              </p>
              <br />
              <p style={{ clear: "both", fontFamily: "Playfair Display" }}>
                Taxes & Shipping calulated at Checkout
              </p>
              <NavLink to="/shipping">
                <button className="shipping-btn" onClick={handleCheckOut}>
                  Check Out
                </button>
              </NavLink>
            </div>
          </div>
        ) : (
          <EmptyCart />
        )}
      </div>
    </>
  );
};

export default Cart;
