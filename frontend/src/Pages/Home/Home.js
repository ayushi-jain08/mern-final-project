import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import "./Home.css";
import Category from "../Category/Category";
import FeatureProduct from "../FeatureProduct/FeatureProduct";
import TopCollection from "../TopCollection/TopCollection";

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

  return (
    <>
      <div className="home">
        <Banner />
        <Category />
        <FeatureProduct />
        <TopCollection />
      </div>
    </>
  );
};

export default Home;
