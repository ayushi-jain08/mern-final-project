import React, { useState } from "react";
import "./Navbar.css";
import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import logo from "../../Images/logo.png";
import { FaBars } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="navbar">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <ul className={open ? "center-list left" : "center-list"}>
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
          <Link to="/wishlist">
            <li>
              <FaHeart />
            </li>
          </Link>

          <Link to="/cart">
            <li>
              <FaShoppingCart />
            </li>
          </Link>
        </ul>
        <div className="menu" onClick={() => setOpen(!open)}>
          {open ? <IoClose /> : <FaBars />}
        </div>
      </div>
    </>
  );
};

export default Navbar;
