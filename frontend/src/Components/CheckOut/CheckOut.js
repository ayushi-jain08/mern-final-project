import React, { useEffect, useRef } from "react";
import { MdVpnKey, MdEvent, MdCreditCard } from "react-icons/md";
import Delivery from "../Function/Delivery/Delivery";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CreateOrder } from "../../Redux/Slices/Product";
import "./CheckOut.css";
import { fetchUserData } from "../../Redux/Slices/User";

const CheckOut = () => {
  const dispatch = useDispatch();
  const paybtn = useRef(null);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const users = useSelector((state) => state.user);
  const { UserAllDetails } = users;
  const { address } = UserAllDetails;
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch, UserAllDetails._id]);
  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    paybtn.current.disabled = true;

    const StoredUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
    try {
      const response = await fetch(
        "http://localhost:8080/api/payment/process",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${StoredUserInfo.token}`,
          },
          body: JSON.stringify({ amounts: paymentData.amount }),
        }
      );
      const data = await response.json();
      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: UserAllDetails.name,
            email: UserAllDetails.email,
            address: {
              line1: address.street,
              city: address.city,
              state: address.state,
              postal_code: address.pinCode,
              country: address.country,
            },
          },
        },
      });

      if (result.error) {
        paybtn.current.disabled = false;
        alert(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          const paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          const cartProducts = JSON.parse(
            sessionStorage.getItem("orderProduct")
          );
          const orderItems = cartProducts.map((cartProduct) => {
            return {
              name: cartProduct.product.name,
              quantity: cartProduct.quantity,
              cost: cartProduct.product.cost,
              image: cartProduct.product.images[0].url,
              product: cartProduct.product._id,
            };
          });

          dispatch(
            CreateOrder({
              shippingInfo: address,
              orderItems: orderItems,
              paymentInfo,
              itemsPrice: orderInfo.totalSubtotal,
              taxPrice: orderInfo.tax,
              shippingPrice: orderInfo.shippingCharges,
              totalPrice: orderInfo.totalPrice,
            })
          );
          navigate("/success");
        } else {
          alert("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      paybtn.current.disabled = false;
      console.log(error);
    }
  };

  return (
    <>
      <div className="payment">
        <Delivery step={1} steps={2} />
        <div className="payment-container">
          <form onSubmit={(e) => submitHandler(e)} className="payment-form">
            <p>Card Info</p>
            <div>
              <MdCreditCard />
              <CardNumberElement className="payment-input" />
            </div>
            <div>
              <MdEvent />
              <CardExpiryElement className="payment-input" />
            </div>
            <div>
              <MdVpnKey />
              <CardCvcElement className="payment-input" />
            </div>
            <input
              type="submit"
              value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
              ref={paybtn}
              className="payment-btn"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
