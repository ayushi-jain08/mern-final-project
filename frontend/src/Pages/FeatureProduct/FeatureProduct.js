import React, { useEffect } from "react";
import "./FeatureProduct.css";
import FeaturedCard from "./FeaturedCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProduct } from "../../Redux/Slices/Product";
import CircularProgress from "@mui/material/CircularProgress";

const FeatureProduct = () => {
  const dispatch = useDispatch();
  const productDetail = useSelector((state) => state.product);
  const { allProductInfo, loading , error} = productDetail;
  const featuredProducts = allProductInfo.filter(
    (product) => product.feature === true
  );
  console.log("gg", featuredProducts);
  useEffect(() => {
    dispatch(fetchAllProduct({ page: "", sort: "", brand: "", category: "" }));
  }, [dispatch]);
  return (
    <>
      <div className="featured-product">
      {error && (
          <p className="error" style={{ color: "red" }}>
            {error}
          </p>
        )}
        <div className="heading">
          <span></span>
          <h2>Featured Products</h2>
          <span></span>
        </div>
        <div className="featured-block">
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
            featuredProducts?.map((item, i) => (
              <FeaturedCard item={item} key={i} />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default FeatureProduct;
