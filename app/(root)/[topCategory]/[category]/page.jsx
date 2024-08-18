import db from "@/db/db";
import { decoded } from "@/lib/utils";
import React from "react";

const Category = async ({ params }) => {
  const { topCategory, category } = params;
  console.log(params);
  async function getProducts() {
    const res = await db.product.findMany({
      where: {
        categoryId: Number(category)
      }
    });
    return res
  }

  const products = await getProducts()
  console.log(products);

  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="lg:text-4xl text-center">
        Soon <br />
        {decoded(topCategory)} / {decoded(category)}
      </div>
    </div>
  );
};

export default Category;
