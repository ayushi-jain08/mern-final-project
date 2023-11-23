import React from "react";
import "./MiniNavbar.css";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdPerson } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { FiLogOut } from "react-icons/fi";
import { fetchLogout } from "../../Redux/Slices/User";

const Mininavbar = () => {
  const dispatch = useDispatch();
  const storedUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
  const users = useSelector((state) => state.user);
  const { currentUser } = users;

  const handleLogOut = async () => {
    dispatch(fetchLogout());
  };
  return (
    <>
      <div className="mini-navbar">
        <div className="search-box">
          <form action="" className="form">
            <input type="text" placeholder="search here..." />
            <button type="submit" className="search-submit">
              <FaSearch />
            </button>
          </form>
        </div>
        <div className="ul-list">
          <ul className="left-icons">
            <li>
              <FaInstagram />
            </li>
            <li>
              <FaFacebookF />
            </li>
            {currentUser && storedUserInfo ? (
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <MdPerson /> {currentUser?.otherDeatils?.name}
                </Link>
                <ul className="dropdown-menu">
                  <li
                    style={{
                      fontFamily: "Libre Baskerville",
                      cursor: "pointer",
                    }}
                    onClick={handleLogOut}
                  >
                    {" "}
                    Logout <FiLogOut />
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item current-user">
                      <img
                        src={currentUser?.otherDeatils?.pic?.url}
                        alt="user pic"
                      />
                      {currentUser?.otherDeatils?.name}
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item">
                      <FaBoxOpen /> Orders
                    </Link>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <MdPerson /> Sign in
                </Link>
                <ul className="dropdown-menu">
                  <li style={{ display: "flex" }}>
                    <span className="dropdown-item">New Customer?</span>
                    <Link className="dropdown-item" to="/loginsignup">
                      Sign-up
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>

                  <li>
                    <Link className="dropdown-item">
                      <MdPerson /> My Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item">
                      <FaBoxOpen /> Orders
                    </Link>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Mininavbar;
