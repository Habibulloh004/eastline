import Link from "next/link";
import React from "react";

const SideBarCategory = ({ categorys, categoryId }) => {
  console.log(categoryId);
  return (
    <div className="max-md:hidden col-span-1">
      <div className="bg-secondary mx-auto h-auto p-4 rounded-md">
        <h1 className="textNormal4 font-bold">Категории</h1>
        <div className="flex flex-col gap-1 mt-2">
          {categorys.map((item, idx) => (
            <Link href={`/${item.topCategoryId}/${item.id}`} key={idx}>
              <h1 className={categoryId[0].id == item.id ? "" : "opacity-50 hover:opacity-100 translation-all ease-linear"}>
                {item.name}
              </h1>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideBarCategory;