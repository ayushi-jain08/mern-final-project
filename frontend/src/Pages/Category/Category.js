import React from "react";
import "./Category.css";
import womens from "../../Images/girl.jpg";
import purse from "../../Images/purse.jpg";
import men from "../../Images/men.jpg";
import { Link } from "react-router-dom";

const Category = () => {
  const data = [
    { imgs: womens, cat: "Women" },
    { imgs: purse, cat: "Accessories" },
    { imgs: men, cat: "Men" },
  ];
  return (
    <>
      <div className="category">
        {data?.map((item, i) => (
          <div className="category-card" key={i}>
            <img src={item.imgs} alt="" />
            <div className="category-name">
              <Link to={`cat/${item.cat}`}>
                <button>{item.cat}</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Category;
