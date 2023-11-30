import React from "react";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "../Product/ProductCard";
import "./RelatedProduct.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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
      <div style={{ marginBottom: "50px" }}>
        <Carousel responsive={responsive} className="product">
          {product?.map((item, i) => (
            <ProductCard item={item} key={i} />
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default RelatedProduct;
