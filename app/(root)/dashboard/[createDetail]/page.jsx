import CategoryForm from "@/components/forms/category";
import ProductForm from "@/components/forms/product";
import TopCategoryForm from "@/components/forms/topCategory";
import React from "react";

const Create = ({ params }) => {
  const param = params.createDetail;

  const renderPage = () => {
    switch (param) {
      case "createTopCategory":
        return <TopCategoryForm />;
      case "createCategory":
        return <CategoryForm />;
      case "createProduct":
        return <ProductForm />;

      default:
        break;
    }
  };

  return <>{renderPage()}</>;
};

export default Create;
