import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { fetchSubCategory } from "../../Redux/Slices/Product";
import "./CategorySlider.css";
import CircularProgress from "@mui/material/CircularProgress";
import { Helmet } from "react-helmet-async";

const SubCategory = () => {
  const dispatch = useDispatch();
  const { catId } = useParams();
  const products = useSelector((state) => state.product);
  const { SubCategory, loading, error } = products;
  const { name, subcategories } = SubCategory;
  useEffect(() => {
    dispatch(fetchSubCategory(catId));
  }, [dispatch, catId]);

  if (error) {
    return <div>Error:{error}</div>;
  }
  console.log("pp", subcategories);
  return (
    <>
      <div className="sub-category-cont">
        <Helmet>
          <title>Category-{`${name}`}</title>
          <meta
            name="keywords"
            content={`${subcategories?.map((cat) => cat.name)}`}
          />
        </Helmet>

        <div className="heading">
          <span></span>
          <h2>{name}</h2>
          <span></span>
        </div>
        {loading ? (
          <div
            style={{
              position: "relative",
              left: "50%",
              marginTop: "50px",
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <div className="sub-category-sub">
            {subcategories &&
              subcategories.map((item) => {
                return (
                  <div className="sub-details" key={item._id}>
                    <img
                      src={item.image}
                      alt="subcategory"
                      width={50}
                      height={50}
                    />
                    <NavLink to={`/subcategory/${item._id}`}>
                      <h1>{item.name}</h1>
                    </NavLink>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </>
  );
};

export default SubCategory;
