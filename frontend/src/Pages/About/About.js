import React from "react";
import "./About.css";
import Carousel from "react-material-ui-carousel";

const About = () => {
  const data = [
    {
      img: "https://img.freepik.com/free-photo/back-position-smartphone-device-tech-generative-ai_188544-12116.jpg?w=1060&t=st=1698403603~exp=1698404203~hmac=790d09b4513306873ea3e4a13d0b065d8121a72d149dfe074f155f576d802399",
      content: "Android Phones",
      title:
        "Unleash the power of innovation with our cutting-edge Android phones,",
    },
    {
      img: "https://as2.ftcdn.net/v2/jpg/06/29/48/65/1000_F_629486592_aNXs0UCAnVDjXGAs6bxYBQvp1ed5PIFe.jpg",
      content: "WorldWide Network",
      title:
        "Explore a world of curated items, and let us be your trusted destination for all your shopping needs",
    },
    {
      img: "https://as2.ftcdn.net/v2/jpg/04/59/46/59/1000_F_459465972_kdD2K6lw2IO5o66MVNrtKle6qW3INFcf.jpg",
      content: "Secured Transaction",
      title:
        "Experience worry-free transactions with our secure payment gateway, ensuring your financial information is safeguarded at every step",
    },
    {
      img: "https://img.freepik.com/free-photo/new-smartphone-balancing-with-podium_23-2150296471.jpg?w=996&t=st=1698403633~exp=1698404233~hmac=34b905a58bcf0804f4aeed8bfeea08027f97af4afd9a72af7a54f60936b46995",
      content: "Mobile Technology",
      title:
        "Stay ahead with the latest in mobile technology, where style meets functionality for a smarter, more connected lifestyle",
    },
  ];
  return (
    <>
      <div className="about-co">
        <Carousel
          className="carousel"
          autoPlay={true}
          animation="slide"
          indicators={false}
          navButtonsAlwaysVisible={true}
          cycleNavigation={true}
        >
          {data.map((item, i) => {
            return (
              <div className="about-co-details" key={i}>
                <img src={item.img} alt="" className="full-slider" />
                <div className="content">
                  <h3>{item.content}</h3>
                  <p>{item.title}</p>
                </div>
              </div>
            );
          })}
        </Carousel>
      </div>
    </>
  );
};

export default About;
