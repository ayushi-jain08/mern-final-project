import React from "react";
import Carousel from "react-material-ui-carousel";

const ImageSlider = ({ images = [] }) => {
  return (
    <>
      <Carousel
        className="carousel"
        autoPlay={true}
        animation="slide"
        indicators={true}
        navButtonsAlwaysVisible={true}
        cycleNavigation={true}
      >
        {images.map((image, i) => {
          return <img src={image.url} alt="" className="full-slider" key={i} />;
        })}
      </Carousel>
    </>
  );
};

export default ImageSlider;
