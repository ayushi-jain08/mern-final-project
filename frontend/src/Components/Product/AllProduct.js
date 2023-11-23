import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProduct } from "../../Redux/Slices/Product";
import ProductCard from "./ProductCard";
import "./Product.css";
import { GiShop } from "react-icons/gi";
import { MdCategory } from "react-icons/md";
import CircularProgress from "@mui/material/CircularProgress";

const AllProduct = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [sortOrder, setSortOrder] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [categorys, setCategorys] = useState("");
  // const [tPages, setTPages] = useState(1);
  const { allProductInfo, totalPage, loading, error } = products;
  const brands = [
    "Nature’s Bounty",
    "Maharaja",
    "Mom's Magic",
    "Zara",
    "Tokyo Talkies",
  ];
  const categories = ["electronic", "spices", "grains", "women"];
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(
        fetchAllProduct({
          page: currentPage,
          sort: sortOrder,
          brand: brandFilter,
          category: categorys,
        })
      );
    };
    fetchData();
  }, [dispatch, currentPage, brandFilter, categorys, sortOrder]);

  const handleSortChange = (order) => {
    setSortOrder(order);
    dispatch(
      fetchAllProduct({
        page: currentPage,
        sort: order,
        brand: brandFilter,
        category: categorys,
      })
    );
  };
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    dispatch(
      fetchAllProduct({
        page: newPage, // Use newPage instead of currentPage
        sort: sortOrder,
        brand: brandFilter,
        category: categorys,
      })
    );
  };
  const handleBrandClick = (brands) => {
    setBrandFilter(brands);
    dispatch(
      fetchAllProduct({
        page: currentPage,
        sort: sortOrder,
        brand: brands,
        category: categorys,
      })
    );
  };
  const handleCategoryClick = (cat) => {
    setCategorys(cat);
    dispatch(
      fetchAllProduct({
        page: currentPage,
        sort: sortOrder,
        brand: brandFilter,
        category: cat,
      })
    );
  };

  // ====================SCROLL POSITION====================
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="all-product-page">
      <div className="all-product">
        <div className="sub-products">
          <div className="left">
            <div className="shop">
              <div className="main">
                <h3>
                  <GiShop /> Shop by Brand
                </h3>
                <ul>
                  {brands.map((brand, i) => (
                    <li
                      key={i}
                      className={brandFilter === brand ? "selected" : ""}
                      onClick={() => handleBrandClick(brand)}
                    >
                      {brand}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="filter">
              <div className="main">
                <h3>
                  <MdCategory /> Category
                </h3>
                <ul>
                  {categories.map((cat, i) => (
                    <li
                      key={i}
                      onClick={() => handleCategoryClick(cat)}
                      className={categorys === cat ? "selected" : ""}
                    >
                      {cat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="sort">
              <p> Sort :</p>
              <select
                name=""
                className="select"
                onChange={(e) => handleSortChange(e.target.value)}
                value={sortOrder}
              >
                <option className="opt" value="asc">
                  lowest to highest
                </option>
                <option className="opt" value="desc">
                  highest to lowest
                </option>
              </select>
            </div>
            <div className="product">
              {loading ? (
                <div
                  style={{
                    position: "relative",
                    left: "50%",
                    marginTop: "50px",
                  }}
                >
                  <CircularProgress />
                </div>
              ) : (
                allProductInfo?.map((item, i) => (
                  <ProductCard item={item} key={i} />
                ))
              )}
            </div>
          </div>
        </div>
        <div className="pagination">
          {Array.from({ length: totalPage }).map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProduct;
