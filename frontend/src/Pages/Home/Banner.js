import React from "react";
import "./Home.css";
import girl from "../../Images/curly.png";
import phone from "../../Images/phone.png";
import headphone from "../../Images/headphone.png";
import { Link } from "react-router-dom";
import Carousel from "react-material-ui-carousel";

const Banner = () => {
  const data = [
    { img: girl, content: "Get 50% off" },
    {
      img: phone,
      content: "Latest Model ",
    },
    { img: headphone, content: "Trending Design" },
  ];
  return (
    <>
      <div>
        <Carousel
          className="carousel"
          autoPlay={true}
          animation="slide"
          indicators={false}
          navButtonsAlwaysVisible={true}
          cycleNavigation={true}
        >
          {data.map((item, i) => (
            <div className="slider-banner" key={i}>
              <div className="left">
                <span>{item.content}</span>
                <p>New Arrivals</p>
                <Link>
                  <button className="shop-now">Shop Now</button>
                </Link>
              </div>
              <div className="right">
                <img src={item.img} alt="" />
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default Banner;
