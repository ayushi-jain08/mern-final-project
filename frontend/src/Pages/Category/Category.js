import React from "react";
import "./Category.css";
import women from "../../Images/girl.jpg";
import purse from "../../Images/purse.jpg";
import men from "../../Images/men.jpg";

const Category = () => {
  return (
    <>
      <div className="category">
        <div className="category-card">
          <img src={women} alt="" />
          <div className="category-name">
            <button>Women</button>
          </div>
        </div>
        <div className="category-card">
          <img src={purse} alt="" />
          <div className="category-name">
            <button>Accessories</button>
          </div>
        </div>
        <div className="category-card">
          <img src={men} alt="" />
          <div className="category-name">
            <button>Men</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
