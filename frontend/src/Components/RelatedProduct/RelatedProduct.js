import React from "react";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "../Product/ProductCard";
import "./RelatedProduct.css";

const RelatedProduct = ({ product }) => {
  return (
    <>
      <div className="heading">
        <span></span>
        <h2>Related Products</h2>
        <span></span>
      </div>
      <div className="product" style={{ marginBottom: "50px" }}>
        {product?.map((item, i) => (
          <ProductCard item={item} key={i} />
        ))}
      </div>
    </>
  );
};

export default RelatedProduct;
