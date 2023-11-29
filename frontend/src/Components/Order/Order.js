import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FetchAllOrders } from "../../Redux/Slices/Product";
import "./Order.css";
import { MdOutlineLaunch } from "react-icons/md";
import CircularProgress from "@mui/material/CircularProgress";

const Order = ({ path = "loginsignup" }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product);
  const { allOrders, loading } = products;
  const StorageUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
  useEffect(() => {
    if (!StorageUserInfo) {
      navigate(`/${path}`, {
        state: location.pathname,
      });
    }
    dispatch(FetchAllOrders());
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div className="orders-container">
        {loading ? (
          <div
            style={{
              position: "relative",
              left: "50%",
              marginTop: "0px",
              paddingTop: "20px",
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <div className="orders-main">
            <div className="orders-header">
              <h2 className="order-id">OrderId</h2>
              <h2 className="status">Status</h2>
              <h2 className="qty">Quantity</h2>
              <h2 className="amt">Amount</h2>
              <h2>Actions</h2>
            </div>
            {allOrders.length !== 0 && (
              <div>
                {allOrders.map((item) => (
                  <div className="content" key={item._id}>
                    <p>{item._id}</p>
                    <p>{item.orderStatus}</p>
                    <p>{item.orderItems.length}</p>
                    <p>{item.totalPrice}</p>
                    <Link to={`/order/${item._id}`}>
                      <p>
                        <MdOutlineLaunch />
                      </p>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Order;
