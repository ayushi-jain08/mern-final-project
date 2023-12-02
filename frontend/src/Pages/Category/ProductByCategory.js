import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchProductByCategory } from "../../Redux/Slices/Product";
import { useParams } from "react-router-dom";
import "./Category.css";
import ProductCard from "../../Components/Product/ProductCard";
import CircularProgress from "@mui/material/CircularProgress";
import { Helmet } from "react-helmet-async";

const ProductByCategory = () => {
  const dispatch = useDispatch();
  const { category } = useParams();
  console.log("o", category);
  const products = useSelector((state) => state.product);
  const { ProductByCategory, loading } = products;
  useEffect(() => {
    dispatch(FetchProductByCategory(category));
  }, [dispatch, category]);

  const productName =
    ProductByCategory?.slice(0, 1)?.[0]?.category || "Default Product Name";
  console.log("ppp", ProductByCategory);
  return (
    <>
      <div className="category-by-product">
        {ProductByCategory?.length > 0 && (
          <Helmet>
            <title>Product - {`${productName}`}</title>
            <meta
              name="keywords"
              content={`${ProductByCategory?.map((cat) => cat.name)}`}
            />
          </Helmet>
        )}
        <div className="product">
          {loading ? (
            <div className="product-loader">
              <CircularProgress />
            </div>
          ) : ProductByCategory?.length < 1 ? (
            <h4 style={{ marginTop: "10px" }}>No Product found</h4>
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
