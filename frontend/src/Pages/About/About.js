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
  }, [navigate, location.pathname, path]);
  const headerStyle = {
    backgroundColor: scrollPosition > 100 ? "transparent" : "transparent",
    transition: "background-color 0.3s ease",
  };
  return (
    <div className="about" style={headerStyle}>
      about
    </div>
  );
};

export default About;
