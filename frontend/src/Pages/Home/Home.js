import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import "./Home.css";
import Category from "../Category/Category";
import FeatureProduct from "../FeatureProduct/FeatureProduct";
import TopCollection from "../TopCollection/TopCollection";
import Banners from "../Banners/Banners";
import OurFeatures from "../OurFeatures/OurFeatures";
import ProductType from "../../Components/ProductType/ProductType";


const Home = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
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
  const headerStyle = {
    backgroundColor: scrollPosition > 100 ? "transparent" : "transparent",
    transition: "background-color 0.3s ease",
  };

  return (
    <>
      <div className="home" style={headerStyle}>
        <Banners />
        <FeatureProduct />
        <OurFeatures />
        <Category />
        <TopCollection />
        <Banner />
        <ProductType />
      </div>
    </>
  );
};

export default Home;
