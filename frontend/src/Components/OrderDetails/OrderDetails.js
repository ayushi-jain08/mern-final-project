import React, { useEffect } from "react";
import "./OrderDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GetSingleOrder } from "../../Redux/Slices/Product";
import CircularProgress from "@mui/material/CircularProgress";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.product);
  const { SingleOrder, loading } = products;
  const { id } = useParams();
  const StorageUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
  useEffect(() => {
    if (!StorageUserInfo) {
      navigate("/login");
    }
    dispatch(GetSingleOrder(id));
    // eslint-disable-next-line
  }, [dispatch, id]);
  return (
    <>
      <div className="single-order">
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
            <div className="single-sub-order">
              <h2>Order #{SingleOrder._id}</h2>
              <div className="shipping-info">
                <h5>Shipping Info</h5>
                <div className="confirm-shipping-info">
                  <div>
                    <p>Name:</p>
                    <span>{SingleOrder.user && SingleOrder.user.name}</span>
                  </div>
                  <div>
                    <p>Phone:</p>
                    <span>
                      {SingleOrder.shippingInfo &&
                        SingleOrder.shippingInfo.phone}
                    </span>
                  </div>
                  <div>
                    <p>Address:</p>
                    <span>
                      {SingleOrder.shippingInfo &&
                        `${SingleOrder.shippingInfo.street}, ${SingleOrder.shippingInfo.city}, ${SingleOrder.shippingInfo.state}, ${SingleOrder.shippingInfo.pinCode}, ${SingleOrder.shippingInfo.country}`}
                    </span>
                  </div>
                </div>
              </div>
              <h5>Payment</h5>
              <div className="payment-order-info">
                <div>
                  <p
                    className={
                      SingleOrder.paymentInfo &&
                      SingleOrder.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {SingleOrder.paymentInfo &&
                    SingleOrder.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>
                <div>
                  <p>Amount : </p>
                  <span>
                    {SingleOrder.totalPrice && SingleOrder.totalPrice}
                  </span>
                </div>
              </div>
              <h5>Order Status</h5>
              <div className="order-status">
                <div>
                  <p
                    className={
                      SingleOrder.orderStatus &&
                      SingleOrder.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {SingleOrder.orderStatus && SingleOrder.orderStatus}
                  </p>
                </div>
              </div>
            </div>
            <hr />
            <div className="order-item">
              <h3>Order Items:</h3>
              <div className="order-confirmitems-container">
                {SingleOrder?.orderItems &&
                  SingleOrder?.orderItems.map((item) => {
                    return (
                      <div key={item?._id} className="full-order-details">
                        <div className="details-order">
                          <img
                            src={item?.image}
                            alt="Product"
                            width={100}
                            height={100}
                          />
                          <Link to={`/product/${item.product}`}>
                            <p style={{ color: "gray", fontWeight: 500 }}>
                              {item.name}
                            </p>
                          </Link>
                        </div>
                        <span className="price">
                          {item?.quantity} X ₹{item?.cost} ={" "}
                          <b
                            style={{
                              color: "rgb(72, 69, 69)",
                              fontWeight: 600,
                            }}
                          >
                            ₹{item.cost * item.quantity}
                          </b>
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default OrderDetails;
