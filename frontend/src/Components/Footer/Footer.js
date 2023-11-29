import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import logo from "../../Images/logo.png";
import { FaFacebook, FaYoutube, FaTwitter } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <img src={logo} alt="" className="footer-img" />
        <div className="upper-footer-head">
          <p>Brands</p>
          <p>Media</p>
          <p>Services</p>
        </div>
        <span className="divider"></span>
        <div className="footer-subhead">
          <ul>
            <li>
              <Link>Contact us</Link>
            </li>
            <li>
              <Link>Our Services</Link>
            </li>
            <li>
              <Link>Privacy Policy</Link>
            </li>
            <li>
              <Link>About</Link>
            </li>
            <li>
              <Link>Terms & Conditions</Link>
            </li>
            <li>
              <Link>Career</Link>
            </li>
          </ul>
        </div>
        <div className="footer-icons">
          <p>
            <FaFacebook />
          </p>
          <p>
            <AiFillInstagram />
          </p>
          <p>
            <FaYoutube />
          </p>
          <p>
            <FaTwitter />
          </p>
        </div>
        <p className="footer-bottom">
          INFERNO Copyright © 2021 Inferno - All rights reserved || Designed By:
          Ayushi Jain{" "}
        </p>
      </div>
    </>
  );
};

export default Footer;
