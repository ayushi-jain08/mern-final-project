import React, { useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProduct } from "../../Redux/Slices/Product";
import ProductCard from "./ProductCard";

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
const FeaturedProducts = () => {
  const dispatch = useDispatch();
  const productDetail = useSelector((state) => state.product);
  const { allProductInfo } = productDetail;
  const featuredProducts = allProductInfo.filter(
    (product) => product.feature === true
  );
  
  useEffect(() => {
    dispatch(fetchAllProduct({ page: "", sort: "", brand: "", category: "" }));
  }, [dispatch]);
  return (
    <div className="product-page">
      <h2>Featured Product</h2>
      <div>
        <Carousel
          responsive={responsive}
          autoPlay
          autoPlaySpeed={2000}
          className="product"
        >
          {featuredProducts?.map((item, i) => (
            <ProductCard item={item} key={i} />
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default FeaturedProducts;
