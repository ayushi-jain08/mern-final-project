import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBoxOpen } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { IoMdHeart } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import Tooltip from "@mui/material/Tooltip";
import { useDispatch } from "react-redux";
import { fetchLogout } from "../../Redux/Slices/User";

const Options = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogOut = async () => {
    await dispatch(fetchLogout());
    navigate("/loginsignup");
  };
  return (
    <>
      <div>
        <div className="options">
          <ul>
            <Tooltip title="order" placement="left">
              <Link to="/order">
                <li>
                  <FaBoxOpen />
                </li>
              </Link>
            </Tooltip>
            <Tooltip title="cart" placement="left">
              <Link to="/cart">
                <li>
                  <FaCartShopping />
                </li>
              </Link>
            </Tooltip>
            <Tooltip title="wishlist" placement="left">
              <Link to="/wishlist">
                <li>
                  <IoMdHeart />
                </li>
              </Link>
            </Tooltip>

            <Tooltip title="Logout" placement="left">
              <li onClick={handleLogOut}>
                <FiLogOut />
              </li>
            </Tooltip>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Options;
