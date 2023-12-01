import React, { useEffect, useState } from "react";
import "./MiniNavbar.css";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { MdPerson } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { FiLogOut } from "react-icons/fi";
import { fetchLogout } from "../../Redux/Slices/User";
import { MdCategory } from "react-icons/md";
import CategorySlider from "../CategorySlider/CategorySlider";
import { FetchSearchProduct } from "../../Redux/Slices/Product";

const Mininavbar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showCategory, setShowCategory] = useState(false);
  const dispatch = useDispatch();
  const storedUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
  const users = useSelector((state) => state.user);
  const { currentUser } = users;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);

    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();

    navigate(`/search?${searchQuery}`);
  };
  useEffect(() => {
    const UrlParams = new URLSearchParams(window.location.search);
    const searchTermFormUrl = UrlParams.get("searchTerm");

    if (searchTermFormUrl) {
      setSearchTerm(searchTermFormUrl);
      dispatch(FetchSearchProduct(searchTerm));
    }
    // eslint-disable-next-line
  }, [dispatch, window.location.search]);
  const handleLogOut = async () => {
    await dispatch(fetchLogout());
    localStorage.removeItem("userDataInfo");
  };

  return (
    <>
      <div className="mini-navbar">
        <div className="search-box">
          <form action="" className="form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="search here..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="search-submit">
              <FaSearch />
            </button>
          </form>
        </div>
        <div className="ul-list">
          <ul className="left-icons">
            <li
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <span onClick={() => setShowCategory(!showCategory)}>
                {" "}
                <MdCategory className="category-icon" />
              </span>
              <span className="para"> Show Category</span>
            </li>
            {showCategory && (
              <CategorySlider setShowCategory={setShowCategory} />
            )}
            {currentUser && storedUserInfo ? (
              <li className="nav-item dropdown ">
                <Link
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <MdPerson className="category-icon" />{" "}
                  <span className="para">
                    {" "}
                    {currentUser?.otherDeatils?.name}
                  </span>
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
                    <Link className="dropdown-item current-user" to="/profile">
                      <img
                        src={currentUser?.otherDeatils?.pic?.url}
                        alt="user pic"
                      />
                      {currentUser?.otherDeatils?.name}
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/order">
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
                  <MdPerson className="category-icon" />{" "}
                  <span className="para">Sign in</span>
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
                    <Link className="dropdown-item" to="/profile">
                      <MdPerson /> My Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/order">
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
