import AllCategories from "@/components/shared/allCategories";
import AllProducts from "@/components/shared/allProducts";
import Banner from "@/components/shared/banner";
import { getLastProducts } from "@/lib/utils";

export default async function Home() {
  const products = await db.product.findMany();
  const categories = await db.category.findMany({
    include: {
      products: true,
    },
  });
  const topCategories = await db.topCategory.findMany();

  function getRandomProducts(products, count = 4) {
    const shuffled = products.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  const randomProducts = getRandomProducts(products);

  const lastProducts = getLastProducts(products);

  return (
    <div className="min-h-[50%] py-10 flex flex-col items-center justify-center">
      {/* <Banner products={randomProducts} categories={categories} />
      <AllCategories categories={categories} topCategories={topCategories} /> */}
      <AllProducts products={lastProducts} categories={categories} />
    </div>
  );
}
