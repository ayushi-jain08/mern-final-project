import React from "react";
import "./MiniNavbar.sass";
import { FaInstagramSquare } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Mininavbar = () => {
  return (
    <>
      <div className="mini-navbar">
        <div className="search-box">
          <form action="">
            <input type="text" />
            <button type="submit">
              <FaSearch />
            </button>
          </form>
        </div>
        <ul>
          <li>
            <FaInstagramSquare />
          </li>
          <li>
            <FaSquareFacebook />
          </li>
          <li class="nav-item dropdown">
            <Link
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Sign in
            </Link>
            <ul class="dropdown-menu">
              <li style={{ display: "flex" }}>
                <span className="dropdown-item">New Customer?</span>
                <Link class="dropdown-item" href="#">
                  Sign-up
                </Link>
              </li>
              <li>
                <hr class="dropdown-divider" />
              </li>

              <li>
                <Link class="dropdown-item" href="#">
                  Action
                </Link>
              </li>
              <li>
                <Link class="dropdown-item" href="#">
                  Another action
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Mininavbar;
