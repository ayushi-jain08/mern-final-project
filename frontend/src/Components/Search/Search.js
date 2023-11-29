import React, { useEffect } from "react";
import "./Search.css";
import { useDispatch, useSelector } from "react-redux";
import { FetchSearchProduct } from "../../Redux/Slices/Product";
import ProductCard from "../Product/ProductCard";
import CircularProgress from "@mui/material/CircularProgress";

const Search = () => {
  const dispatch = useDispatch();
  const productInfo = useSelector((state) => state.product);
  const { SearchProduct, loading } = productInfo;
  useEffect(() => {
    const UrlParams = new URLSearchParams(window.location.search);
    const searchTermFormUrl = UrlParams.get("searchTerm");

    if (searchTermFormUrl) {
      dispatch(FetchSearchProduct(searchTermFormUrl));
    }
    // eslint-disable-next-line
  }, [dispatch, window.location.search]);

  return (
    <>
      <div className="search-product">
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
          <>
            {" "}
            {SearchProduct?.length < 1 ? (
              <div className="no-product">
                <h2>No Product Found!!</h2>
              </div>
            ) : (
              <div className="product">
                {SearchProduct?.map((item, i) => (
                  <ProductCard item={item} key={i} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Search;
