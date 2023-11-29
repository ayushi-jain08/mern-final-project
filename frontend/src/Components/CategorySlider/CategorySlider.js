import React, { useEffect } from "react";
import "./CategorySlider.css";
import { BiSolidCategory } from "react-icons/bi";
import { IoMdCloseCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetCategory } from "../../Redux/Slices/Product";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const CategorySlider = ({ setShowCategory }) => {
  const products = useSelector((state) => state.product);
  const { mainCategory, loading, error } = products;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGetCategory());
  }, [dispatch]);
  if (error) {
    return <div>Error:{error}</div>;
  }
  return (
    <>
      <div className="category-slider">
        <div className="category-slider-cont">
          <div className="top">
            <div
              style={{ display: "flex", alignItems: "baseline", gap: "5px" }}
            >
              <span>
                <BiSolidCategory className="icon" />
              </span>
              <p>All Category</p>
            </div>
            <span onClick={() => setShowCategory(false)} className="close">
              <IoMdCloseCircle />
            </span>
          </div>

          {loading ? (
            <div
              style={{
                position: "relative",
                left: "40%",
                marginTop: "50px",
              }}
            >
              <CircularProgress />
            </div>
          ) : (
            <div className="main-category">
              {mainCategory?.map((item) => (
                <ul key={item._id}>
                  <Link to={`/category/${item._id}`}>
                    <li>{item.name}</li>
                  </Link>
                </ul>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CategorySlider;
