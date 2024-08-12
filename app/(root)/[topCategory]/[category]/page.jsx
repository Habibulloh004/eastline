"use client";
import React from "react";

const Category = ({ params }) => {
  console.log(params);
  return (
    <div className="h-[50vh] flex items-center justify-center">
      <div className="lg:text-4xl text-center">
        Soon {" "} <br />
        {params.topCategory} / {params.category}{" "}
      </div>
    </div>
  );
};

export default Category;
