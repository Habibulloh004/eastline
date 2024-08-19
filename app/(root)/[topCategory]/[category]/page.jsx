import db from "@/db/db";
import { decoded } from "@/lib/utils";
import React from "react";

async function Category({ params }) {
  const { topCategory, category } = params;
  const products = await db.product.findMany({
    where: {
      categoryId: Number(category),
    },
  });

  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="lg:text-4xl text-center">
        Soon <br />
        {decoded(topCategory)} / {decoded(category)}
      </div>
    </div>
  );
}

export default Category

// export async function getStaticProps(context) {
//   // Call an external API endpoint to get posts
//   console.log("stassssssssssssssss", context);
//   const { topCategory, category } = params;

//   // const res = await db.product.findMany({
//   //   where: {
//   //     categoryId: Number(category),
//   //   },
//   // });

//   // return {
//   //   props: {
//   //     products: res,
//   //     topCategory,
//   //   },
//   // };
// }
