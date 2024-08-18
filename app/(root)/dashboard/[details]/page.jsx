import CategoryForm from "@/components/forms/category";
import ProductForm from "@/components/forms/product";
import TopCategoryForm from "@/components/forms/topCategory";
import GetElements from "@/components/pages/dashboard/getElements";
import React from "react";


const Create = ({ params }) => {
  const renderPage = () => {
    switch (params.details) {
      case "createTopCategory":
        return <TopCategoryForm />;
      case "createCategory":
        return <CategoryForm />;
      case "createProduct":
        return <ProductForm />;

      default:
        return <GetElements param={params.details} />;
    }
  };


  return <>{renderPage()}</>;
};

export default Create;
