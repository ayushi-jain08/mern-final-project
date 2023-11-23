import React, { useEffect, useState } from "react";
import "./TopCollection.css";
import TopCollectionCard from "./TopCollectionCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../../Redux/Slices/Product";
import CircularProgress from "@mui/material/CircularProgress";

const TopCollection = () => {
  const category = ["women", "electronics", "Footwear", "Spices"];
  const [selectedCategory, setSelectedCategory] = useState(category[0]);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product);
  const { categoryProduct, error, loading } = products;

  //   try {
  //     const res = await fetch(
  //       `http://localhost:8080/api/product/gets/?category=${selectedCategory}`,
  //       {
  //         method: "GET",
  //         mode: "cors",
  //         headers: {
  //           "Content-Type": "application/json", // Fix the header syntax
  //         },
  //       }
  //     );
  //     const data = await res.json();
  //     if (res.ok) {
  //       setProduct(data);
  //     } else {
  //       throw new Error(data.message);
  //     }
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };
  useEffect(() => {
    dispatch(fetchCategory(selectedCategory));
  }, [selectedCategory, dispatch]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <>
      <div className="top-collection">
        {error && (
          <p className="error" style={{ color: "red" }}>
            {error}
          </p>
        )}
        <div className="head">
          <span className="heading">Collection</span>
          <h2 className="sub-head">Our Top Collection</h2>
        </div>
        <div className="category-collection">
          {category?.map((item, i) => (
            <button
              key={i}
              className={
                selectedCategory === item
                  ? "category-btn selected"
                  : "category-btn"
              }
              onClick={() => handleCategoryClick(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="selected-category-product">
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
            categoryProduct &&
            categoryProduct?.map((item) => (
              <TopCollectionCard item={item} key={item._id} />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default TopCollection;
