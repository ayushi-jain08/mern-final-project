import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import logo from "../../Images/logo.png";
import { FaBars } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { FaBoxOpen } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../Redux/Slices/User";
import Badge from "@mui/material/Badge";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);
  const { UserAllDetails, currentUser } = users;
  const storedUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  return (
    <>
      <div className="navbar">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <div className={open ? "center-list left" : "center-list"}>
          <ul className="left-list">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
            <li>
              <NavLink to="/product">Product</NavLink>
            </li>
            <li>
              <NavLink to="/blog">Blog</NavLink>
            </li>
          </ul>
          <ul className="right-list">
            <Tooltip title="wishlist" placement="bottom">
              <Link to="/wishlist">
                <li>
                  <FaHeart />
                </li>
              </Link>
            </Tooltip>

            <Tooltip title="cart" placement="bottom">
              <Link to="/cart">
                <li>
                  {currentUser && storedUserInfo ? (
                    <Badge
                      badgeContent={UserAllDetails?.cart?.length}
                      color="error"
                    >
                      <FaShoppingCart />
                    </Badge>
                  ) : (
                    <FaShoppingCart />
                  )}
                </li>
              </Link>
            </Tooltip>
            <Tooltip title="order" placement="bottom">
              <Link to="/order">
                <li>
                  <FaBoxOpen />
                </li>
              </Link>
            </Tooltip>
          </ul>
        </div>
        <div className="menu" onClick={() => setOpen(!open)}>
          {open ? <IoClose /> : <FaBars />}
        </div>
      </div>
    </>
  );
};

export default Navbar;
