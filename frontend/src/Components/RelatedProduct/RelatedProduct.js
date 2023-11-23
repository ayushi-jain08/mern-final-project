import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "../Product/ProductCard";
import "./RelatedProduct.css";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 1024 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 1024, min: 800 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 800, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
const RelatedProduct = ({ product }) => {
  return (
    <>
      <div className="heading">
        <span></span>
        <h2>Related Products</h2>
        <span></span>
      </div>
      <div className="product" style={{ marginBottom: "50px" }}>
        <div responsive={responsive}>
          {product?.map((item, i) => (
            <ProductCard item={item} key={i} />
          ))}
        </div>
      </div>
    </>
  );
};

export default RelatedProduct;
