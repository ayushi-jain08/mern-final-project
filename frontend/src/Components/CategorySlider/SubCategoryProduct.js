import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  clearSubCategoryProduct,
  fetchSucategoryProduct,
} from "../../Redux/Slices/Product";
import ProductCard from "../Product/ProductCard";
import "./CategorySlider.css";
import Pagination from "../Function/Pagination";
import CircularProgress from "@mui/material/CircularProgress";
import { Helmet } from "react-helmet-async";

const SubCategoryProduct = () => {
  const dispatch = useDispatch();
  const { subId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const products = useSelector((state) => state.product);
  const { SubCategoryProduct, SubtotalPage, totalSubProducts, loading } =
    products;
  useEffect(() => {
    dispatch(clearSubCategoryProduct());
    dispatch(
      fetchSucategoryProduct({ page: currentPage, subcategoryID: subId })
    );
  }, [dispatch, subId, currentPage]);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    dispatch(fetchSucategoryProduct({ page: newPage, subcategoryID: subId }));
  };
  const productName =
    SubCategoryProduct?.slice(0, 1)?.[0]?.name || "Default Product Name";
  return (
    <>
      <div className="sub-category-product-category">
        {SubCategoryProduct?.length > 0 && (
          <Helmet>
            <title>Product - {`${productName}`}</title>
            <meta
              name="keywords"
              content={`${SubCategoryProduct?.map((cat) => cat.name)}`}
            />
          </Helmet>
        )}
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
            <button className="result-found">
              Products found : {totalSubProducts}
            </button>
            <div className="sub-category-product-card">
              {SubCategoryProduct.length < 1 ? (
                <div>No Product Found</div>
              ) : (
                <div className="product">
                  {SubCategoryProduct?.map((item, i) => (
                    <ProductCard item={item} key={i} />
                  ))}
                </div>
              )}
            </div>
            <div className="pagination">
              <Pagination
                totalPage={SubtotalPage}
                onClick={handlePageChange}
                currentPage={currentPage}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SubCategoryProduct;
