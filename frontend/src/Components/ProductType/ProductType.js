import React, { useEffect } from "react";
import "./ProductType.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSubCategory } from "../../Redux/Slices/Product";
import { NavLink } from "react-router-dom";

const ProductType = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product);
  const { allSubcategory } = products;
  useEffect(() => {
    dispatch(fetchAllSubCategory());
  }, [dispatch]);

  return (
    <>
      <div className="product-types">
        <div className="heading">
          <span></span>
          <h2>Categories</h2>
          <span></span>
        </div>
        <div className="product-type-container">
          {allSubcategory.map((item) => {
            return (
              <div className="flex" key={item._id}>
                <div className="content">
                  <NavLink to={`/subcategory/${item._id}`}>
                    <p>{item.name}</p>
                  </NavLink>
                </div>
                <div className="img">
                  <img src={item.image} alt="" width={100} height={100} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProductType;
