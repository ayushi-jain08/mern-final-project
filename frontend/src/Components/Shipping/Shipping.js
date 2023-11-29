import React, { useEffect, useState } from "react";
import "./Shipping.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiFillHome } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import { FaMapPin, FaPhoneAlt } from "react-icons/fa";
import { FaEarthAsia } from "react-icons/fa6";
import { Country, State } from "country-state-city";
import { AddUserShippingAddress, fetchUserData } from "../../Redux/Slices/User";
import Delivery from "../Function/Delivery/Delivery";

const Shipping = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  const users = useSelector((state) => state.user);
  const { UserAllDetails } = users;
  const { address } = UserAllDetails;

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);
  useEffect(() => {
    if (address) {
      setStreet(address.street);
      setCity(address.city);
      setState(address.state);
      setCountry(address.country);
      setPinCode(address.pinCode);
      setPhoneNo(address.phone);
    }
  }, [address]);
  const shippingSubmit = (e) => {
    e.preventDefault();
    if (!address) {
      // Dispatch the AddUserShippingAddress action directly
      dispatch(
        AddUserShippingAddress({
          street,
          city,
          state,
          country,
          pinCode,
          phone: phoneNo,
        })
      );
      navigate("/confirm-order");
    } else {
      const isAddressChanged =
        street !== address.street ||
        city !== address.city ||
        state !== address.state ||
        country !== address.country ||
        pinCode !== address.pinCode ||
        phoneNo !== address.phone;

      if (isAddressChanged) {
        dispatch(
          AddUserShippingAddress({
            street,
            city,
            state,
            country,
            pinCode,
            phone: phoneNo,
          })
        );
      }
      navigate("/confirm-order");
    }
  };

  return (
    <>
      <div className="shipping-cont">
        <Delivery step={0} />
        <div className="shipping-box">
          <h2 className="shippingHeading">Shipping Details</h2>
          <form className="form" onSubmit={shippingSubmit}>
            <div className="form-control">
              <AiFillHome />
              <input
                type="text"
                placeholder="Address"
                required
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </div>
            <div className="form-control">
              <FaLocationDot />
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="form-control">
              <FaMapPin />
              <input
                type="number"
                placeholder="Pin Code"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>
            <div className="form-control">
              <FaPhoneAlt />
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"
              />
            </div>
            <div className="form-control">
              <FaEarthAsia />
              <select
                value={country}
                required
                onChange={(e) => setCountry(e.target.value)}
              >
                <option>Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option value={item.isoCode} key={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
            {country && (
              <div className="form-control">
                <FaEarthAsia />
                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option value={item.isoCode} key={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}
            <input
              type="submit"
              value="Continue"
              className="shipping-btn"
              disabled={state ? false : true}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Shipping;
