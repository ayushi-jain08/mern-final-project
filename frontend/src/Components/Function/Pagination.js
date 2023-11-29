import React from "react";

const Pagination = ({ totalPage, onClick, currentPage }) => {
  return (
    <>
      {Array.from({ length: totalPage }).map((_, index) => (
        <button
          key={index}
          onClick={() => onClick(index + 1)}
          className={currentPage === index + 1 ? "active" : ""}
        >
          {index + 1}
        </button>
      ))}
    </>
  );
};

export default Pagination;
