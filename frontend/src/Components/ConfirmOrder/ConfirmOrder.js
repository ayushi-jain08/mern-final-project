import React, { useEffect } from "react";
import Delivery from "../Function/Delivery/Delivery";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./ConfirmOrder.css";
import { fetchUserData } from "../../Redux/Slices/User";
import CircularProgress from "@mui/material/CircularProgress";

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartProduct = JSON.parse(sessionStorage.getItem("orderProduct"));
  const products = useSelector((state) => state.product);
  const { loading } = products;
  const users = useSelector((state) => state.user);
  const { UserAllDetails } = users;
  const { address, name } = UserAllDetails;

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch, UserAllDetails._id]);
  const addresses = `${address?.street}, ${address?.city}, ${address?.state}, ${address?.pinCode}, ${address?.country}`;
  const totalSubtotal = cartProduct?.reduce((accumulator, cartItem) => {
    const itemSubtotal = cartItem.product.cost * cartItem.quantity;
    return accumulator + itemSubtotal;
  }, 0);

  const shippingCharges = totalSubtotal > 1000 ? 200 : 0;

  const tax = totalSubtotal * 0.18;

  const totalPrice = parseInt(totalSubtotal + tax + shippingCharges);
  const ProceedTopayment = () => {
    const data = { totalSubtotal, shippingCharges, tax, totalPrice };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    navigate("/checkout");
  };

  return (
    <>
      <div className="confirm-order">
        <Delivery step={1} />
        {loading ? (
          <div
            style={{
              position: "relative",
              left: "0",
              marginTop: "50px",
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <div className="confirm-order-divide">
            <div className="confirm-order-page">
              <div className="confirm-shipping-area">
                <h2>Shiping Information</h2>
                <div className="confirm-shipping-area-box">
                  <div>
                    <p>Name:</p>
                    <span>{name}</span>
                  </div>
                  <div>
                    <p>Phone:</p>
                    <span>{address?.phone}</span>
                  </div>
                  <div>
                    <p>Address:</p>
                    <span>{addresses}</span>
                  </div>
                </div>
              </div>
              <div className="confirm-cart-items">
                <h2>Your Cart Items:</h2>
                <div className="confirm-cart-items-container">
                  {cartProduct &&
                    cartProduct?.map((item) => (
                      <div key={item.product._id} className="full">
                        <div className="deatils">
                          <img
                            src={item?.product.images?.[0].url}
                            alt="Product"
                            width={100}
                            height={100}
                          />
                          <p>{item.product.name}</p>
                        </div>
                        <span>
                          {item.quantity} X ₹{item.product.cost} ={" "}
                          <b
                            style={{
                              color: "rgb(72, 69, 69)",
                              fontWeight: 600,
                            }}
                          >
                            ₹{item.product.cost * item.quantity}
                          </b>
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="order-summary">
              <h2>Order Summary</h2>
              <div className="order-summary-sum">
                <div>
                  <p>Subtotal:</p>
                  <span>₹{totalSubtotal}</span>
                </div>
                <div>
                  <p>Shipping Charges:</p>
                  <span>₹{shippingCharges}</span>
                </div>
                <div>
                  <p>GST:</p>
                  <span>₹{tax}</span>
                </div>
              </div>
              <div className="order-Summary-Total">
                <p>
                  <b>Total :</b>
                </p>
                <span>₹{totalPrice}</span>
              </div>
              <button className="proceed" onClick={ProceedTopayment}>
                Proceed To Payment
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ConfirmOrder;
