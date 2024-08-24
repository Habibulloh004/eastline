import CategoryForm from "@/components/forms/category";
import LicenseForm from "@/components/forms/license";
import NewsForm from "@/components/forms/news";
import PartnerForm from "@/components/forms/partner";
import ProductForm from "@/components/forms/product";
import SertificateForm from "@/components/forms/sertificate";
import TopCategoryForm from "@/components/forms/topCategory";
import Getelements from "@/components/pages/dashboard/getElements";
import React from "react";

async function Create({ params }) {
  const renderPage = () => {
    switch (params.details) {
      case "createTopCategory":
        return <TopCategoryForm />;
      case "createCategory":
        return <CategoryForm />;
      case "createProduct":
        return <ProductForm />;
      case "createSertificate":
        return <SertificateForm />;
      case "createPartner":
        return <PartnerForm />;
      case "createLicense":
        return <LicenseForm />;
      case "createNews":
        return <NewsForm />;

      default:
        return <Getelements param={params.details} />;
    }
  };
  return <>{renderPage()}</>;
}
export default Create