import CategoryForm from "@/components/forms/category";
import ProductForm from "@/components/forms/product";
import TopCategoryForm from "@/components/forms/topCategory";
import { columns } from "@/components/shared/columns";
import { DataTable } from "@/components/shared/data-table";
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
        return getElements(params.details);
    }
  };

  function getElements(param) {
    console.log(param);
    const data = [
      {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
      },
      {
        id: "34567890",
        amount: 250,
        status: "completed",
        email: "user1@example.com",
      },
      {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
      },
      {
        id: "34567890",
        amount: 250,
        status: "completed",
        email: "user1@example.com",
      },
      {
        id: "abcdef12",
        amount: 75,
        status: "failed",
        email: "user2@example.com",
      },
      {
        id: "98765432",
        amount: 120,
        status: "pending",
        email: "user3@example.com",
      },
      {
        id: "fedcba09",
        amount: 300,
        status: "completed",
        email: "user4@example.com",
      },
      {
        id: "12345678",
        amount: 85,
        status: "failed",
        email: "user5@example.com",
      },
      {
        id: "90abcdef",
        amount: 150,
        status: "pending",
        email: "user6@example.com",
      },
      {
        id: "fedcba12",
        amount: 225,
        status: "completed",
        email: "user7@example.com",
      },
      {
        id: "3456789a",
        amount: 60,
        status: "failed",
        email: "user8@example.com",
      },
      {
        id: "bcdef123",
        amount: 180,
        status: "pending",
        email: "user9@example.com",
      },
    ];
    return (
      <div className="container mx-auto py-10">
        <DataTable
          columns={columns}
          data={data}
        />
      </div>
    );
  }

  return <>{renderPage()}</>;
};

export default Create;
