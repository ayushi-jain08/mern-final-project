import React, { useEffect } from "react";
import "./About.css";
import { useLocation, useNavigate } from "react-router-dom";

const About = ({ path = "loginsignup" }) => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
    if (!storedUserInfo) {
      navigate(`/${path}`, {
        state: location.pathname,
      });
    }
  }, [navigate]);
  return(
     <div className="about">about</div>
     )
};

export default About;
