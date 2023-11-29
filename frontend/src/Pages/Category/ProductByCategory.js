import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchProductByCategory } from "../../Redux/Slices/Product";
import { useParams } from "react-router-dom";
import "./Category.css";
import ProductCard from "../../Components/Product/ProductCard";
import CircularProgress from "@mui/material/CircularProgress";

const ProductByCategory = () => {
  const dispatch = useDispatch();
  const { category } = useParams();
  console.log("o", category);
  const products = useSelector((state) => state.product);
  const { ProductByCategory, loading } = products;
  useEffect(() => {
    dispatch(FetchProductByCategory(category));
  }, [dispatch, category]);
  console.log("ppp", ProductByCategory);
  return (
    <>
      <div className="category-by-product">
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
            ProductByCategory?.map((item, i) => (
              <ProductCard item={item} key={i} />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default ProductByCategory;
